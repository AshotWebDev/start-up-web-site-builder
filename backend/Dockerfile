# Базовый образ с Python
FROM python:3.11

# Рабочая директория внутри контейнера
WORKDIR /backend

# Копируем и устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Устанавливаем celery и redis-клиент (если их нет в requirements.txt)
RUN pip install celery redis

# Копируем весь проект
COPY . .

# Открываем порт Django
EXPOSE 8000

# Команда по умолчанию (можно переопределить в docker-compose)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]