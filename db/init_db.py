from tortoise import Tortoise, run_async
from tortoise.utils import get_schema_sql

async def main():
    await Tortoise.init(
        db_url="postgres://postgres:password@127.0.0.1:5432/maindb",
        modules={"models": ["models"]},
    )
    await Tortoise.generate_schemas()
    sql = get_schema_sql(Tortoise.get_connection("default"), safe=False)
    print(sql)



if __name__ == "__main__":
    run_async(main())
