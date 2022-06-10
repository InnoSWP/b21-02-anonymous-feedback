from starlette.applications import Starlette
from strawberry.asgi import GraphQL
from tortoise.contrib.starlette import register_tortoise

from backend.schema import schema

graphql_app = GraphQL(schema)

app = Starlette()
app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)
register_tortoise(app, db_url="postgres://postgres:password@db:5432/",
                  modules={"models": ["db.models"]},
                  generate_schemas=True)
