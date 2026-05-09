# Presec Project

This project consists of a Django backend and a React frontend.

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm 9+

## Getting Started

### 1. Backend Setup

The backend is located in the `presec_backend` directory.

```bash
cd presec_backend
# Virtual environment (already created during setup)
.\venv\Scripts\activate
# Install dependencies (already done during setup)
pip install -r requirements.txt
# Run migrations (already done during setup)
python manage.py migrate
# Start the server
python manage.py runserver
```

### 2. Frontend Setup

The frontend is located in the `presec_frontend` directory.

```bash
cd presec_frontend
# Install dependencies (already done during setup)
npm install
# Start the development server
npm start
```

## Running Both Simultaneously

You can use two terminal windows to run both the backend and frontend.

- **Backend**: `http://127.0.0.1:8000`
- **Frontend**: `http://localhost:3000`

## Admin Access

To access the Django admin panel:
1. Create a superuser: `python manage.py createsuperuser`
2. Visit `http://127.0.0.1:8000/admin`
