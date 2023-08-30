# L3AGI

## Directory Structure

```
.
├── apps/
│ ├── ui/ # React UI Application
│ └── server/ # Python FastAPI Server
└── docker-compose.yml # Main Docker Compose File
```

## Pre-requisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/l3vels/L3AGI.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd L3AGI
   ```

3. **Run Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   This will build and start both the React UI and FastAPI services.

## Access the Services

- **React UI**: Open `http://localhost:3000` in your browser.
- **FastAPI Server**: Open `http://localhost:4002` in your browser or API client.

## Troubleshooting

- If you encounter issues when starting the services, ensure Docker and Docker Compose are installed and up to date.
- Check the logs for any service-specific errors.
