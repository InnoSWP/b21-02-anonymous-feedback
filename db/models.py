from tortoise.models import Model
from tortoise import fields
from tortoise.validators import MinLengthValidator, ValidationError


class Session(Model):
    name = fields.CharField(max_length=32, validators=[MinLengthValidator(1)])
    created_at = fields.DatetimeField(auto_now_add=True)
    messages: fields.ReverseRelation["Message"]


class Message(Model):
    rating = fields.IntField(null=True)
    message = fields.CharField(max_length=4000, null=True)
    timestamp = fields.DatetimeField(auto_now_add=True)
    session: fields.ForeignKeyRelation[Session] = fields.ForeignKeyField(
        model_name="models.Session", related_name="messages", on_delete=fields.CASCADE
    )

    async def save(self, *args, **kwargs) -> None:
        if (self.rating is None) == (self.message is None):
            raise ValidationError(
                "Only one of fields 'rating' and 'message' must be filled."
            )
        await super(Message, self).save(*args, **kwargs)
