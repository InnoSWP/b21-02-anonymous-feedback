"""
This is a echo bot.
It echoes any incoming text messages.
"""

import logging
import os
from aiogram import Bot, Dispatcher, executor, types

API_TOKEN = os.getenv("BOT_API_TOKEN")

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start', 'help'])
async def send_welcome(message: types.Message):
    """
    This handler will be called when user sends `/start` or `/help` command
    """

    args = message.get_args()
    if not args or len(args) > 1:
        await message.reply("Wrong command format!/nUse `/start <session_id>`.")
        return
    
    session_id = args[0]
    

    await message.reply(message.get_args())


@dp.message_handler()
async def echo(message: types.Message):
    await message.answer(message.text)


if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
