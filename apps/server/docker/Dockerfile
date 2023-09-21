FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY Pipfile Pipfile.lock /code/
RUN pip install pipenv && pipenv sync --system

# Copy project
COPY ./ /code/

# Expose the application's port
EXPOSE 4000

# Run the application
COPY entrypoint.sh /app_entry/
RUN chmod +x /app_entry/entrypoint.sh
ENTRYPOINT ["/app_entry/entrypoint.sh"]
