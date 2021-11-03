FROM python:3.8-alpine3.13

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev

RUN pip install mysqlclient

RUN apk del build-deps

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . ./

EXPOSE 8000