FROM python:3.10-alpine AS builder

RUN apk update && \
    apk upgrade && \
    apk add --no-cache gcc make musl-dev && \
    python -m venv /opt/venv

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app
RUN pip install --no-cache-dir -U setuptools pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.10-alpine AS development
COPY --from=builder /opt/venv /opt/venv

RUN wget -P --progress=dot:giga /usr/bin https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for
RUN chmod +x /usr/bin/wait-for

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app
CMD ["strawberry", "export-schema", "schema:schema"]
