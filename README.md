# AI Pharma Research Lab

A full-stack, AI-powered pharmaceutical research platform mimicking virtual drug testing and research acceleration.

## Overview
This platform reduces traditional research cycles by virtually simulating drug (SMILES) toxicity and organ interactions using lightweight mock biochemical heuristics.

## Tech Stack
- **Frontend:** React.js + Vite + Tailwind CSS + Recharts
- **Backend:** Python + FastAPI + SQLAlchemy + scikit-learn
- **Database:** PostgreSQL (with SQLite fail-safe connection logic)

## Setup Instructions

### 1. Backend Setup
Make sure you have Python 3.9+ installed and a PostgreSQL server running locally.

```bash
cd AI-Pharma-Research-Lab
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend Setup
Make sure you have Node.js installed.

```bash
cd AI-Pharma-Research-Lab
cd frontend
npm install
npm run dev
```