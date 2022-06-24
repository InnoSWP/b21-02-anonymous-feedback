from helpers import create_session, get_session


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


async def test_watch_session():
    pass
