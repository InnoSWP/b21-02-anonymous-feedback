from tortoise.models import Model
from tortoise import fields

class Student(Model):
    # Defining `id` field is optional, it will be defined automatically
    # if you haven't done it yourself
    telegram_id = fields.IntField(pk=True)

    # Defining ``__str__`` is also optional, but gives you pretty
    # represent of model in debugger and interpreter
    def __str__(self):
        return f"f{self.telegram_id}"

class Session(Model):
    name = fields.CharField(max_length=32)
    created_at = fields.DatetimeField(auto_now_add=True)


class Message(Model):
    # TODO: is it too big/small ?
    message = fields.CharField(max_length=4000)
    timestamp = fields.DatetimeField()
    session: fields.ForeignKeyRelation[Session] = fields.ForeignKeyField(
        model_name='models.Session',
        related_name='messages',
        on_delete=fields.CASCADE
    )
