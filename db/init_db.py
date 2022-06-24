from tortoise import Tortoise, run_async
from tortoise.utils import get_schema_sql

from models import Session


async def main():
    await Tortoise.init(
        db_url="postgres://postgres:password@db:5432/",
        modules={"models": ["models"]},
    )
    await Tortoise.generate_schemas()
    sql = get_schema_sql(Tortoise.get_connection("default"), safe=False)
    await Session.create(id="TCS123", name="TCS Lab")
    print(sql)


if __name__ == "__main__":
    run_async(main())
