from starlette.applications import Starlette
from strawberry.asgi import GraphQL
from tortoise.contrib.starlette import register_tortoise

from backend.schema import schema
from backend.config import DB_URL

graphql_app = GraphQL(schema)

app = Starlette()
app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)
register_tortoise(app, db_url=DB_URL,
                  modules={"models": ["db.models"]},
                  generate_schemas=True)
