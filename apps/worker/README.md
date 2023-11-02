# Worker for jobs

## Running

```bash
cd apps/worker
docker build -t worker -f docker/Dockerfile .
docker run -p 3001:80 -t worker
```
