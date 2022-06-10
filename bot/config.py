import os

API_TOKEN = os.getenv("BOT_API_TOKEN")

POSTGRES_HOST = os.getenv("POSTGRES_HOST", default="localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", default="5432")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", default="")
POSTGRES_USER = os.getenv("POSTGRES_USER", default="aiogram")
POSTGRES_DB = os.getenv("POSTGRES_DB", default="aiogram")
# TODO
POSTGRES_URI = f"postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"  # noqa
print(POSTGRES_URI)

# REDIS_HOST = os.getenv("REDIS_HOST", default="localhost")
# REDIS_PORT = os.getenv("REDIS_PORT", default="6379")
# REDIS_FSM_DB = os.getenv("REDIS_DB_FSM", default="0")
# REDIS_FSM_PREFIX = os.getenv("REDIS_PREFIX", default="fsm")

TORTOISE_ORM = {
    "connections": {"default": POSTGRES_URI},
    "apps": {
        "models": {
            "models": ["models"],
            "default_connection": "default",
        },
    },
}
