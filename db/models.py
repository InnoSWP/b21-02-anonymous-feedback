import random
import string

from tortoise.models import Model
from tortoise import fields


def generate_short_id(length: int = 5) -> str:
    return ''.join(random.choices(string.ascii_lowercase, k=length))


class Student(Model):
    # Defining `id` field is optional, it will be defined automatically
    # if you haven't done it yourself
    telegram_id = fields.IntField(pk=True)

    # Defining ``__str__`` is also optional, but gives you pretty
    # represent of model in debugger and interpreter
    def __str__(self):
        return f"f{self.telegram_id}"


class Session(Model):
    short_id = fields.CharField(max_length=5, unique=True, default=generate_short_id)
    name = fields.CharField(max_length=32)
    created_at = fields.DatetimeField(auto_now_add=True)
    messages: fields.ReverseRelation['Message']


class Message(Model):
    # TODO: is it too big/small ?
    message = fields.CharField(max_length=4000)
    timestamp = fields.DatetimeField(auto_now_add=True)
    session: fields.ForeignKeyRelation[Session] = fields.ForeignKeyField(
        model_name='models.Session',
        related_name='messages',
        on_delete=fields.CASCADE
    )
