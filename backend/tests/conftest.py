import pytest
from starlette.testclient import TestClient
from tortoise.contrib.starlette import register_tortoise

from backend.main import init_app


@pytest.fixture(scope="function")
def client():
    app = init_app()
    register_tortoise(app, db_url="sqlite://:memory:",
                      modules={"models": ["db.models"]},
                      generate_schemas=True)
    with TestClient(app) as test_client:
        yield test_client