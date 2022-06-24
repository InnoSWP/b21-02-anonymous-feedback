import pytest
from starlette.testclient import TestClient
from tortoise.contrib.starlette import register_tortoise

from backend.main import init_app
from backend.config import POSTGRES_URI


@pytest.fixture(scope="function")
def client() -> TestClient:
    app = init_app()
    register_tortoise(
        app,
        db_url=POSTGRES_URI,
        modules={"models": ["db.models"]},
        generate_schemas=True,
    )
    with TestClient(app) as test_client:
        yield test_client
