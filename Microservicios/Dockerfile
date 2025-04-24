FROM python:3.9-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y libpq-dev gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY productos/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./productos ./productos

CMD ["uvicorn", "productos.app.main:app", "--host", "0.0.0.0", "--port", "8000"]