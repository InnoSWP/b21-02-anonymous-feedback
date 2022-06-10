"""
This is a echo bot.
It echoes any incoming text messages.
"""

import logging
from aiogram import Bot, Dispatcher, types
from aiogram.utils.executor import Executor
from tortoise import run_async
from models import setup
import config

logging.basicConfig(level=logging.INFO)

bot = Bot(token=config.API_TOKEN)
dp = Dispatcher(bot)
runner = Executor(dp)
setup(runner)


@dp.message_handler(commands=['start', 'help'])
async def send_welcome(message: types.Message):
    """
    This handler will be called when user sends `/start` or `/help` command
    """

    # TODO: refactor
    args = message.get_args().split()
    print(len(args))
    if not args or len(args) > 1:
        await message.reply(
            "Join a feedback session by sending me `/start <session ID>`.",
            parse_mode=types.ParseMode.MARKDOWN
        )
        return

    session_id = args[0]

    # TODO: get from DB

    if False:
        await message.reply(
            f"Cannot find session with id {session_id}!",
            parse_mode=types.ParseMode.MARKDOWN
        )

    session_name = "TCS Lecture"
    await message.reply(
        (f"You joined \"*{session_name}*\" feedback session!\n\n"
         "Send me a message and I will deliver it to the TA anonymously. "
         "Consider sсheduling messages to stay unnoticed."),
        parse_mode=types.ParseMode.MARKDOWN
    )


@dp.message_handler()
async def echo(message: types.Message):
    await message.answer(message.text)


async def create_data():
    # await Session.create(id="TCS123", name="TCS Lab")
    pass


if __name__ == '__main__':
    # run_async(create_data())
    runner.start_polling()
