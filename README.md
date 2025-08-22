# Fullstack To-Do App

A simple **To-Do list application** built with **Django REST Framework (backend)** and **React (frontend)**. Users can create, update, view, and delete tasks.

## Tech Stack

**Backend**
- Django 5.x
- Django REST Framework
- SQLite (default database)

**Frontend**
- React 18+ with TypeScript
- Vite (build tool)
- Axios for API calls

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- TypeScript knowledge (helpful)

## Installation & Setup

### Backend Setup

1. Clone the repository and navigate to the backend directory:
```bash
git clone <repository-url>
cd ToDo-App-Fullstack/backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Start the Django development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ToDo-App-Fullstack/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default port)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/` | Get all tasks |
| POST | `/api/tasks/` | Create a new task |
| GET | `/api/tasks/{id}/` | Get a specific task |
| PUT | `/api/tasks/{id}/` | Update a task |
| DELETE | `/api/tasks/{id}/` | Delete a task |

## Configure for local development:

1. Update settings.py and API in App.tsx to use local database and debug settings
2. Current configuration is set for Render deployment

## Usage

1. Start both backend and frontend servers
2. Open your browser and go to `http://localhost:5173`
3. Add, edit, complete, or delete tasks as needed
