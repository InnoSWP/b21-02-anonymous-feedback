import logging

from aiogram import Bot, Dispatcher, types
from aiogram.utils.executor import Executor
from aiogram.dispatcher import FSMContext
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from redis import Redis
from tortoise import Tortoise
import asyncpg

import config
from db.models import Session, Message

RATE_SESSION_CALLBACK_DATA = "rate_session_button"

rate_session_button = InlineKeyboardButton(
    text="Rate the session", callback_data=RATE_SESSION_CALLBACK_DATA
)
rate_session_keyboard = InlineKeyboardMarkup().add(rate_session_button)

star_callbacks = {
    f"rate_star:{nth_star}": nth_star for nth_star in reversed(range(1, 5 + 1))
}

star_keyboard = InlineKeyboardMarkup()
for (
    callback_data,
    nth_star,
) in star_callbacks.items():
    star_keyboard.add(
        InlineKeyboardButton(text="⭐" * nth_star, callback_data=callback_data)
    )


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
    if args[0].isdigit():
        session_id = int(args[0])
    else:
        await message.reply("Use numbers for session id!")
        return

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
                "Send me a message and I will "
                "deliver it to the TA anonymously. "
                "Consider scheduling messages to stay unnoticed."
            ),
            parse_mode=types.ParseMode.MARKDOWN,
            reply_markup=rate_session_keyboard,
        )
        redis_state.set(name=message.from_user.id, value=session_id)


@dp.callback_query_handler(text=[RATE_SESSION_CALLBACK_DATA])
async def get_star_keyboard(call: types.CallbackQuery):
    logging.info(f"get callback: {call.data}.")
    await bot.edit_message_reply_markup(
        chat_id=call.message.chat.id,
        message_id=call.message.message_id,
        reply_markup=star_keyboard,
    )
    await call.answer()


async def notify_about_new_message(session_id, message):
    conn = Tortoise.get_connection("default")
    await conn.execute_script(
        f"""
        NOTIFY "{session_id}", '{message.pk}';
    """
    )
    await conn.close()


@dp.callback_query_handler(text=star_callbacks.keys())
async def send_star_rating(call: types.CallbackQuery):
    logging.info(f"get callback: {call.data}.")
    rating = star_callbacks.get(call.data)
    if rating:
        session_id = redis_state.get(call.from_user.id)
        session_id = int(session_id)
        logging.info(f"get callback: {session_id}.")
        session = await Session.get_or_none(pk=session_id)
        # TODO: Replace with rating
        saved_message = await Message.create(
            message="⭐" * rating, session_id=session_id
        )  # noqa
        # saved_message = await Message.create(
        #     rating=rating, session_id=session_id
        # )  # noqa
        await notify_about_new_message(session_id, saved_message)
        text = (
            f'You rated "{session.name}" with {rating} '
            f"{'star' if rating == 1 else 'stars'}!"
        )
        await bot.answer_callback_query(callback_query_id=call.id, text=text)
        await bot.edit_message_reply_markup(
            chat_id=call.message.chat.id, message_id=call.message.message_id
        )

        logging.info(f"got rating: {rating}.")
    else:
        logging.info(f"invalid callback: {call.data}.")
    await call.answer()


@dp.message_handler()
async def handle_message(message: types.Message):
    session_id = redis_state.get(message.from_user.id)
    if session_id:
        session_id = int(session_id)
        saved_message = await Message.create(
            message=message.text, session_id=session_id
        )
        await notify_about_new_message(session_id, saved_message)
        await message.answer(
            "Feedback sent!\n\n"
            "You can send more messages to the TA by simply texting it to me. "
            "Consider scheduling messages to stay unnoticed."
        )
    else:
        await message.answer(
            "You have not joined any session yet!\n\n"
            "Use `/start <session-id>`.",  # noqa
            parse_mode=types.ParseMode.MARKDOWN,
        )


if __name__ == "__main__":
    runner.start_polling(dp)
