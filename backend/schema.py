import asyncio
import typing
import datetime

import strawberry


@strawberry.type
class Query:
    @strawberry.field
    def session(self, id: strawberry.ID) -> "Session":
        pass


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_session(self, name: str) -> "Session":
        pass


@strawberry.type
class Subscription:
    @strawberry.subscription
    async def watch_session(self, id: strawberry.ID) -> "Message":
        pass


@strawberry.type
class Session:
    id: strawberry.ID
    name: str
    created: "Timestamp"
    messages: typing.List["Message"]


@strawberry.type
class Message:
    id: strawberry.ID
    text: str
    timestamp: "Timestamp"


# Utility types


@strawberry.type
class Timestamp:
    # Timestamp in ISO format
    timestamp: datetime.time


schema = strawberry.Schema(Query, Mutation, Subscription)
