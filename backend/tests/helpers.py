import typing
from dataclasses import dataclass

import asyncpg
from starlette.testclient import WebSocketTestSession, TestClient

import queries
from backend.config import GRAPHQL_ENDPOINT, POSTGRES_URI


@dataclass
class GraphQLResponse:
    data: typing.Dict[str, typing.Any]
    errors: typing.Optional[typing.List[typing.Dict[str, typing.Any]]] = None


def make_json(
    query: str, variable_values: typing.Dict[str, typing.Any]
) -> typing.Dict[str, typing.Any]:
    return {"query": query, "variables": variable_values}


def execute(
    client: TestClient,
    query: str,
    variable_values: typing.Dict[str, typing.Any],
    endpoint: str = GRAPHQL_ENDPOINT,
) -> GraphQLResponse:
    return GraphQLResponse(
        **client.post(endpoint, json=make_json(query, variable_values)).json()
    )


def create_session(client: TestClient, session_name: str) -> GraphQLResponse:
    return execute(
        client, queries.CREATE_SESSION, variable_values={"name": session_name}
    )


def get_session(client: TestClient, session_id: str) -> GraphQLResponse:
    return execute(client, queries.GET_SESSION, variable_values={"id": session_id})


async def create_message(message_text: str, session_id: int) -> int:
    conn = await asyncpg.connect(POSTGRES_URI)
    result: typing.List[asyncpg.Record]
    # Tortoise does not want to insert a new message for some reason, so I did this:
    result = await conn.fetch(
        """
        INSERT INTO "message" ("message","timestamp","session_id") VALUES
        ($1,CURRENT_TIMESTAMP,$2) RETURNING "id"
    """,
        message_text,
        session_id,
    )
    message_id = result[0].get("id")
    await conn.execute(
        f"""
                NOTIFY "{session_id}", '{message_id}';
            """
    )
    await conn.close()
    return message_id


def watch_session(websocket: WebSocketTestSession, session_id: str) -> None:
    websocket.send_json(
        dict(
            payload=make_json(queries.WATCH_SESSION, {"id": session_id}),
            type="start",
            id="1",
        )
    )


def get_subscription_message(websocket: WebSocketTestSession) -> GraphQLResponse:
    response = websocket.receive_json()
    return GraphQLResponse(**response["payload"])
