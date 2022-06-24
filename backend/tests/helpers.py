import typing
from dataclasses import dataclass

import starlette.testclient

import queries


@dataclass
class GraphQLResponse:
    data: typing.Dict[str, typing.Any]
    errors: typing.List[typing.Dict[str, typing.Any]]


def execute(client: starlette.testclient.TestClient, query: str,
            variable_values: typing.Dict[str, typing.Any],
            endpoint: str = '/graphql') -> GraphQLResponse:
    return GraphQLResponse(
        **client.post(endpoint, json={"query": query, "variables": variable_values}).json()
    )


def create_session(client: starlette.testclient.TestClient, session_name: str) -> GraphQLResponse:
    return execute(client, queries.CREATE_SESSION,
                   variable_values={"name": session_name})


def get_session(client: starlette.testclient.TestClient, session_id: str) -> GraphQLResponse:
    return execute(client, queries.GET_SESSION,
                   variable_values={"id": session_id})

# TODO: session subscription
