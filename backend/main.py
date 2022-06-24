from starlette.applications import Starlette
from strawberry.asgi import GraphQL
from tortoise.contrib.starlette import register_tortoise
from starlette_session import SessionMiddleware

from backend.schema import schema
from backend.config import POSTGRES_URI, SECRET_KEY, GRAPHQL_ENDPOINT


def init_app():
    new_app = Starlette()
    new_app.add_route(GRAPHQL_ENDPOINT, graphql_app)
    new_app.add_websocket_route(GRAPHQL_ENDPOINT, graphql_app)
    new_app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY,
                           cookie_name="sessionId")
    return new_app


graphql_app = GraphQL(schema)

app = init_app()
register_tortoise(
    app, db_url=POSTGRES_URI, modules={"models": ["db.models"]}, generate_schemas=True
)
