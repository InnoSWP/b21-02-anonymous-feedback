# [Anonymous Feedback](https://anonymous-feedback.snejugal.ru)

[![GitHub Super-Linter](https://github.com/InnoSWP/b21-02-anonymous-feedback/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)

Collect anonymous feedback from students during classes in real time. Go to <https://anonymous-feedback.snejugal.ru> to get started!

## Screenshots

### Landing page

![A screenshot of the landing page](./screenshots/landingPage.png)

### Feedback session page

![A screenshot of the feedback session page](./screenshots/sessionPage.png)

## How to use

1. Go to <https://anonymous-feedback.snejugal.ru>
2. Create a guest session
3. Share the join link with students
4. Collect feedback from students

## Run locally

Before following the steps, ensure that you have Docker installed.

1. Create `.env` according to [`example.env`](./example.env);

2. Create `data/pgdata/` in project root directory:

    ```sh
    mkdir -p data/pgdata
    ```

3. To run the project, run the following command:

    ```bash
    docker compose up
    ```

    Add the `--build` flag to rebuild the project before running.

## Stack

- **Backend:**
  - Docker
  - PostgreSQL
  - Python
  - Strawberry
  - Tortoise ORM
  - Starlette

- **Telegram bot:**
  - aiogram
  - PostgreSQL
  - RedisDB
  
- **Frontend:**
  - TypeScript
  - React
  - SCSS
  - Apollo Client
  - React Router

## License

This project uses the [MIT License](./LICENSE).
