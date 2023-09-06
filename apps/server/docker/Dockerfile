FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY ./apps/server/Pipfile ./apps/server/Pipfile.lock /code/
RUN pip install pipenv && pipenv install --system

# Copy project
COPY ./ /code/

# Expose the application's port
EXPOSE 4002

# Run the application
COPY ./apps/server/entrypoint.sh /app_entry/
RUN chmod +x /app_entry/entrypoint.sh
ENTRYPOINT ["/app_entry/entrypoint.sh"]
