import os

POSTGRES_HOST = os.getenv("POSTGRES_HOST", default="localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", default="5432")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", default="")
POSTGRES_USER = os.getenv("POSTGRES_USER", default="postgres")
POSTGRES_DB = os.getenv("POSTGRES_DB", default="")
POSTGRES_URI = f"postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

# Secret key for sessions
SECRET_KEY = os.getenv("SECRET_KEY", default="")

GRAPHQL_ENDPOINT = '/graphql'
