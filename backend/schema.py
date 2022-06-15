import asyncio
import datetime
from typing import Any, Union, Awaitable, AsyncGenerator, List

import strawberry
import asyncpg_listen
from strawberry.permission import BasePermission
from strawberry.types import Info
from starlette.requests import Request
from starlette.websockets import WebSocket

from db import models
from backend.config import POSTGRES_URI


class CanViewSession(BasePermission):
    message = "User has no permission to see this session"

    async def has_permission(self, source: Any, info: Info, **kwargs) -> \
            Union[bool, Awaitable[bool]]:
        request: Union[Request, WebSocket] = info.context["request"]
        selected_field = next(
            filter(lambda f: f.name in ("session", "watchSession"), info.selected_fields), None)
        if selected_field is not None:
            session_id = selected_field.arguments["id"]
            return str(session_id) == str(request.session.get("session_id"))
        return False


@strawberry.type
class Query:
    @strawberry.field(permission_classes=[CanViewSession])
    async def session(self, id: strawberry.ID) -> "Session":
        return Session.from_model(
            await models.Session.get(short_id=id).prefetch_related("messages"),
            True
        )


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_session(self, info: Info, name: str) -> "Session":
        saved_session = await models.Session.create(name=name)
        request: Union[Request, WebSocket] = info.context["request"]
        request.session.update({"session_id": saved_session.short_id})
        return Session.from_model(saved_session)


@strawberry.type
class Subscription:
    @strawberry.subscription(permission_classes=[CanViewSession])
    async def watch_session(self, id: strawberry.ID) -> AsyncGenerator["Message", None]:
        queue = asyncio.Queue()

        async def get_message_id(
                notification: asyncpg_listen.Notification
        ) -> None:
            queue.put_nowait(int(notification.payload))

        listener = asyncpg_listen.NotificationListener(asyncpg_listen.connect_func(POSTGRES_URI))
        asyncio.create_task(
            listener.run({id: get_message_id}, policy=asyncpg_listen.ListenPolicy.LAST,
                         notification_timeout=asyncpg_listen.NO_TIMEOUT))
        while True:
            message_id = await queue.get()
            if message_id is not None:
                message = await models.Message.get_or_none(pk=message_id)
                if message is not None:
                    yield Message.from_model(message)


@strawberry.type
class Session:
    id: strawberry.ID
    name: str
    created: "Timestamp"
    messages: List["Message"]

    @classmethod
    def from_model(cls, session: models.Session, are_messages_fetched=False):
        return Session(
            id=strawberry.ID(session.short_id),
            name=session.name,
            created=Timestamp(session.created_at),
            messages=(
                [Message.from_model(message) for message in session.messages]
                if are_messages_fetched else []
            )
        )


@strawberry.type
class Message:
    id: strawberry.ID
    text: str
    timestamp: "Timestamp"

    @classmethod
    def from_model(cls, message: models.Message):
        return Message(id=strawberry.ID(message.pk), text=message.message,
                       timestamp=Timestamp(message.timestamp))


# Utility types


@strawberry.type
class Timestamp:
    # Timestamp in ISO format
    timestamp: datetime.time


schema = strawberry.Schema(Query, Mutation, Subscription)
