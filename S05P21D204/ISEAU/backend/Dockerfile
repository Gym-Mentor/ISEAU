FROM python:3.8.7

RUN echo 'deb http://deb.debian.org/debian bullseye main' > /etc/apt/sources.list.d/bullseye.list \
    && apt-get update -y \
    && apt-get purge default-libmysqlclient-dev -y \
    && apt autoremove -y \
    && apt-get install default-libmysqlclient-dev/bullseye -y


ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /backend
WORKDIR /backend
COPY . /backend

# CMD ["python", "manage.py", "migrate"]
CMD ["python3", "manage.py", "runserver", "0:8000"]
# CMD ["python3", "manage.py", "runsslserver", "0:8000"]

EXPOSE 8000