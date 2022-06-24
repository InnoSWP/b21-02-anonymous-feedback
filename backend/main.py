from starlette.applications import Starlette
from strawberry.asgi import GraphQL
from tortoise.contrib.starlette import register_tortoise
from starlette_session import SessionMiddleware

from backend.schema import schema
from backend.config import POSTGRES_URI, SECRET_KEY

graphql_app = GraphQL(schema)

app = Starlette()
app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY, cookie_name="sessionId")
register_tortoise(
    app, db_url=POSTGRES_URI, modules={"models": ["db.models"]}, generate_schemas=True
)
