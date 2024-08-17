# TODO Application

This project is a simple TODO list application. The frontend is built with React and TypeScript, and styled with Tailwind CSS. The backend is built with FastAPI and SQLAlchemy, using a PostgreSQL database. Docker Compose is used to easily set up the development environment.

## Features

- Create, display, complete, and delete TODOs
- Set due dates and highlight TODOs that are nearing their deadlines
- Toggle completion status
- Delete tasks

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Python, FastAPI, SQLAlchemy
- **Database**: PostgreSQL
- **Container Management**: Docker, Docker Compose

## Setup

### 1. Prerequisites

Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

### 2. Set Up and Start the Environment

```bash
git clone https://github.com/k-satosi/todo-app-fastapi.git
cd todo-app-fastapi
docker compose up --build
```

### 3. Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000