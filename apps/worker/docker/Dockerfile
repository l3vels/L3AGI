# Use the Python 3.11 base image
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Change permissions of the work directory
RUN chmod 777 /app

# Install dependencies
COPY pyproject.toml poetry.lock /app/

RUN pip install poetry \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

RUN pip install flower

# Install supervisord
RUN apt-get update && apt-get install -y supervisor

# Copy project
COPY ./ /app/

# Copy supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Run supervisord
CMD ["/usr/bin/supervisord"]