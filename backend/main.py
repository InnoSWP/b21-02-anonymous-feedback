from starlette.applications import Starlette
from strawberry.asgi import GraphQL

from schema import schema


graphql_app = GraphQL(schema)

app = Starlette()
app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)
