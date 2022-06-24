from starlette.testclient import WebSocketTestSession

from helpers import (
    create_session,
    get_session,
    watch_session,
    create_message,
    get_subscription_message,
)
from backend.config import GRAPHQL_ENDPOINT


async def test_create_session(client):
    session_name = "Test session"
    response = create_session(client, session_name)
    assert response.errors is None
    assert response.data["session"]["name"] == session_name


async def test_get_session(client):
    session_name = "Test session"
    session_id = create_session(client, session_name).data["session"]["id"]
    response = get_session(client, session_id)
    assert response.errors is None
    assert response.data["session"]["name"] == session_name


async def test_watch_session(client):
    websocket: WebSocketTestSession
    session_id = int(create_session(client, "Test").data["session"]["id"])
    with client.websocket_connect(
        GRAPHQL_ENDPOINT, subprotocols=["graphql-ws"]
    ) as websocket:
        watch_session(websocket, str(session_id))
        message_text = "Hi"
        message_id = await create_message(message_text, session_id)
        response = get_subscription_message(websocket)
        assert response.errors is None
        assert int(response.data["message"]["id"]) == message_id
        assert response.data["message"]["text"] == message_text
        websocket.close()


async def test_session_visibility(client):
    session_name = "Test session"
    session_id = create_session(client, session_name).data["session"]["id"]
    response = get_session(client, session_id)
    assert response.errors is None
    assert response.data["session"]["name"] == session_name
    client.cookies.clear()
    response = get_session(client, session_id)
    assert response.data is None
    assert response.errors[0]["message"] == "User has no permission to see this session"
