from starlette.testclient import WebSocketTestSession

from helpers import (
    create_session,
    get_session,
    watch_session,
    create_message,
    get_subscription_message,
    close_session,
)
from backend.config import GRAPHQL_ENDPOINT

SESSION_NAME = "Test session"


async def test_create_session(client):
    response = create_session(client, SESSION_NAME)
    assert response.errors is None
    assert response.data["session"]["name"] == SESSION_NAME


async def test_get_session(client):
    session_id = create_session(client, SESSION_NAME).data["session"]["id"]
    response = get_session(client, session_id)
    assert response.errors is None
    assert response.data["session"]["name"] == SESSION_NAME


async def test_close_session(client):
    session_id = create_session(client, SESSION_NAME).data["session"]["id"]
    response = close_session(client, session_id)
    assert response.errors is None
    assert response.data["session"]["name"] == SESSION_NAME
    assert response.data["session"]["closed"] is not None

    second_response = get_session(client, session_id)
    assert second_response.data is None
    assert second_response.errors[0]["message"] == "Object does not exist"


async def test_watch_session(client):
    websocket: WebSocketTestSession
    session_id = int(create_session(client, SESSION_NAME).data["session"]["id"])
    with client.websocket_connect(
        GRAPHQL_ENDPOINT, subprotocols=["graphql-ws"]
    ) as websocket:
        watch_session(websocket, str(session_id))
        message_text = "Hi"
        message_id = await create_message(session_id, message_text)
        response = get_subscription_message(websocket)
        assert response.errors is None
        assert int(response.data["message"]["id"]) == message_id
        assert response.data["message"]["content"]["text"] == message_text

        message_rating = 5
        message_id = await create_message(session_id, rating=message_rating)
        response = get_subscription_message(websocket)
        assert response.errors is None
        assert int(response.data["message"]["id"]) == message_id
        assert int(response.data["message"]["content"]["rating"]) == message_rating
        websocket.close()


async def test_session_visibility(client):
    session_id = create_session(client, SESSION_NAME).data["session"]["id"]
    response = get_session(client, session_id)
    assert response.errors is None
    assert response.data["session"]["name"] == SESSION_NAME
    client.cookies.clear()
    second_response = get_session(client, session_id)
    assert second_response.data is None
    assert (
        second_response.errors[0]["message"]
        == "User has no permission to see this session"
    )
