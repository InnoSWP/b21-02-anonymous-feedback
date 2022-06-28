import logging

from aiogram import Bot, Dispatcher, types
from aiogram.utils.executor import Executor
from aiogram.dispatcher import FSMContext
from redis import Redis
from tortoise import Tortoise
import asyncpg

import config
from db.models import Session, Message


async def on_startup(dispatcher: Dispatcher):
    await Tortoise.init(config=config.TORTOISE_ORM)
    await Tortoise.generate_schemas()


async def on_shutdown(dispatcher: Dispatcher):
    await Tortoise.close_connections()


def setup(runner: Executor):
    runner.on_startup(on_startup)
    runner.on_shutdown(on_shutdown)


logging.basicConfig(level=logging.INFO)

bot = Bot(token=config.API_TOKEN)
dp = Dispatcher(bot)
runner = Executor(dp)
setup(runner)

redis_state = Redis(host=config.REDIS_HOST, port=config.REDIS_PORT)


@dp.message_handler(commands=["start", "help"])
async def send_welcome(message: types.Message, state: FSMContext):
    """
    This handler will be called when user sends `/start` or `/help` command
    """

    # TODO: refactor
    args = message.get_args().split()
    print(len(args))
    if not args or len(args) > 1:
        await message.reply(
            "Join a feedback session by sending me `/start <session ID>`.",
            parse_mode=types.ParseMode.MARKDOWN,
        )
        return

    session_id = int(args[0])

    session = await Session.get_or_none(pk=session_id)

    if session is None:
        await message.reply(
            f"Cannot find session with id {session_id}!",
            parse_mode=types.ParseMode.MARKDOWN,
        )
    else:
        await message.reply(
            (
                f'You joined "*{session.name}*" feedback session!\n\n'
                "Send me a message and I will"
                "deliver it to the TA anonymously. "
                "Consider scheduling messages to stay unnoticed."
            ),
            parse_mode=types.ParseMode.MARKDOWN,
        )
        redis_state.set(name=message.from_user.id, value=session_id)


@dp.message_handler()
async def handle_message(message: types.Message):
    session_id = int(redis_state.get(message.from_user.id))
    if session_id:
        saved_message = await Message.create(
            message=message.text, session_id=session_id
        )
        conn = await asyncpg.connect("postgres://postgres:password@db:5432/")
        await conn.execute(
            f"""
            NOTIFY "{session_id}", '{saved_message.pk}';
        """
        )
        await conn.close()
        await message.answer(
            "Feedback sent!\n\n"
            "You can send more messages to the TA by simply texting it to me. "
            "Consider scheduling messages to stay unnoticed."
        )


if __name__ == "__main__":
    runner.start_polling(dp)
