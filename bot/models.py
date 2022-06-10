from aiogram import Dispatcher
from aiogram.utils.executor import Executor
from tortoise.models import Model
from tortoise import Tortoise, fields
import config

db = Tortoise()


class Student(Model):
    # Defining `id` field is optional, it will be defined automatically
    # if you haven't done it yourself
    telegram_id = fields.IntField(pk=True)

    # Defining ``__str__`` is also optional, but gives you pretty
    # represent of model in debugger and interpreter
    def __str__(self):
        return f"f{self.telegram_id}"


class Session(Model):
    id = fields.CharField(pk=True, max_length=6)
    name = fields.CharField(max_length=32)
    created_at = fields.DatetimeField(auto_now_add=True)
    messages: fields.ReverseRelation['Message']


class Message(Model):
    # TODO: is it too big/small ?
    message = fields.CharField(max_length=4000)
    timestamp = fields.DatetimeField()
    session: fields.ForeignKeyRelation[Session] = fields.ForeignKeyField(
        model_name='models.Session',
        related_name='messages',
        on_delete=fields.CASCADE
    )


async def on_startup(dispatcher: Dispatcher):
    await Tortoise.init(config=config.TORTOISE_ORM)
    await Tortoise.generate_schemas()


async def on_shutdown(dispatcher: Dispatcher):
    await Tortoise.close_connections()


def setup(runner: Executor):
    runner.on_startup(on_startup)
    runner.on_shutdown(on_shutdown)
