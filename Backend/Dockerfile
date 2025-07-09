FROM python:3.12

WORKDIR /app

RUN apt-get update && \
    apt-get install -y libpq-dev netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/Forum/static

COPY Forum/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY Forum/ ./Forum/

EXPOSE 8000