FROM python:3.10-alpine AS builder

RUN apk update && apk upgrade
RUN apk add --no-cache gcc make musl-dev

RUN python -m venv /opt/venv
# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install -U setuptools pip
COPY requirements.txt .
RUN pip install -r requirements.txt

FROM python:3.10-alpine AS development
COPY --from=builder /opt/venv /opt/venv

RUN wget -P /usr/bin https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for
RUN chmod +x /usr/bin/wait-for

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app
CMD strawberry export-schema schema:schema
