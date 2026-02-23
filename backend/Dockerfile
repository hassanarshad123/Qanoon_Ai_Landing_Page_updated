FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and gunicorn config
COPY app/ app/
COPY gunicorn.conf.py .

# Expose port
EXPOSE 8000

# Run with gunicorn (uvicorn workers) for production
# Override bind to 0.0.0.0 since Docker handles network isolation
CMD ["gunicorn", "app.main:app", "-c", "gunicorn.conf.py", "--bind", "0.0.0.0:8000"]
