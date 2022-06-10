import typing
import datetime

import strawberry

from db import models


@strawberry.type
class Query:
    @strawberry.field
    async def session(self, id: strawberry.ID) -> "Session":
        return Session.from_model(
            await models.Session.get(id=id).prefetch_related("messages"),
            True
        )


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def create_session(self, name: str) -> "Session":
        return Session.from_model(await models.Session.create(name=name))


@strawberry.type
class Subscription:
    @strawberry.subscription
    async def watch_session(self, id: strawberry.ID) -> "Message":
        # TODO: wait for notify from bot
        pass


@strawberry.type
class Session:
    id: strawberry.ID
    name: str
    created: "Timestamp"
    messages: typing.List["Message"]

    @classmethod
    def from_model(cls, session: models.Session, are_messages_fetched=False):
        return Session(
            id=strawberry.ID(session.pk),
            name=session.name,
            created=Timestamp(session.created_at),
            messages=(
                [Message.from_model(message) for message in session.messages]
                if are_messages_fetched else []
            )
        )


@strawberry.type
class Message:
    message: str
    timestamp: "Timestamp"

    @classmethod
    def from_model(cls, message: models.Message):
        return Message(message=message.message,
                       timestamp=Timestamp(message.timestamp))


# Utility types


@strawberry.type
class Timestamp:
    # Timestamp in ISO format
    Timestamp: datetime.time


schema = strawberry.Schema(Query, Mutation, Subscription)
