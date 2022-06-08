FROM python:3.10-alpine AS builder

RUN apk update && \
    apk add --no-cache build-essential gcc musl-dev

ENV VENV_PATH="/opt/venv"

RUN python -m venv $VENV_PATH
# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt

FROM python:3.10-alpine AS development
COPY --from=builder $VENV_PATH $VENV_PATH

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"
CMD python main.py
