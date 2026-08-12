# Project Report: QUERYTALK (Natural Language to SQL Database Studio)

> **Document Classification:** Comprehensive System & Architecture Technical Specification  
> **Target Audience:** Software Engineers, Database Administrators, Data Scientists, Security Auditors, and Autonomous AI Agents  
> **Status:** Fully Functional / Production Ready  

---

## 1. Executive Summary & Core Concept

**QUERYTALK** is an enterprise-grade, conversational database studio that bridges natural language queries with relational database analytics. Built with FastAPI on the backend and React (Vite) on the frontend, QueryTalk translates plain English user prompts (e.g., *"Show top 5 customers in New York by total spend in 2024"*) into safe, optimized, dialect-specific SQL queries.

It features multi-provider LLM support (OpenAI, Anthropic Claude, Google Gemini, Ollama local models), automatic database schema extraction, visual ER schema graphs, safe read-only SQL validation AST parsers, interactive result charts, and streaming conversational timelines.

```
+-----------------------------------------------------------------------------------+
|                                  QUERYTALK FRONTEND                               |
|   [ React + Vite | Interactive Schema Graph | SQL Editor | Results Charting ]     |
+-----------------------------------------+-----------------------------------------+
                                          | REST / SSE API
                                          v
+-----------------------------------------------------------------------------------+
|                                  QUERYTALK BACKEND                                |
|   [ FastAPI Router | DB Manager | Schema Mapper | AST SQL Security Validator ]    |
+-------------------+-------------------------------------+-------------------------+
                    |                                     |
                    v                                     v
+-----------------------+                             +-----------------------+
|  Pluggable LLM Engine |                             | Target Databases      |
|  - Anthropic          |                             | - SQLite              |
|  - Google Gemini      |                             | - PostgreSQL          |
|  - OpenAI             |                             | - MySQL               |
|  - Ollama (Local)     |                             +-----------------------+
+-----------------------+
```

---

## 2. Problems Solved

1. **Non-Technical Data Accessibility Barrier**: Business analysts and product managers often lack deep SQL knowledge. QueryTalk converts natural language into validated SQL instantly.
2. **LLM Hallucinations & Destructive Queries**: Generating SQL directly via LLMs poses risk of data loss (`DROP TABLE`, `DELETE`, `UPDATE` without `WHERE`). QueryTalk incorporates an AST (Abstract Syntax Tree) SQL Validator (`sql_validator.py`) that strictly enforces read-only `SELECT` queries and blocks dangerous operations.
3. **Database Schema Ignorance**: Generative LLMs require database schema awareness. QueryTalk's `schema_mapper.py` dynamically extracts table relationships, foreign keys, column data types, and sample data to inject structured schemas into LLM prompts.
4. **Vendor Lock-In**: QueryTalk provides a pluggable LLM provider factory (`services/llm/factory.py`), enabling seamless switching between cloud APIs (OpenAI, Anthropic, Gemini) and privacy-focused local models (Ollama).

---

## 3. Technology Stack & Technical Architecture

### Backend Stack
- **Framework**: Python 3.11+, FastAPI, Pydantic v2
- **ORM & DB Connectivity**: SQLAlchemy, sqlite3, psycopg2, mysql-connector-python
- **LLM Integrations**: `anthropic`, `google-generativeai`, `openai`, `ollama`
- **SQL Analysis & Parsing**: `sqlglot` for AST verification and dialet translation
- **Testing & Tooling**: pytest, Docker, docker-compose

### Frontend Stack
- **Framework**: React 18, Vite build system
- **UI Components**: Custom dark glassmorphic design, `Monaco Editor` / `SQLEditor`, `Recharts` / `Chart.js` for data visualization
- **State & Transport**: Custom HTTP API client (`client.js`), ThemeContext

---

## 4. Subsystem & Component Deep Dive

### 4.1 Schema Extraction & Mapping Engine (`schema_mapper.py` & `db_manager.py`)
- Analyzes connected SQL databases via SQLAlchemy inspect tools.
- Generates `SchemaMap` models containing tables, primary keys, foreign keys, nullability, and row count estimations.
- Formats schema information into compact Markdown representation for prompt engineering.

### 4.2 AST SQL Validation Guardrails (`sql_validator.py`)
- Parses LLM-generated SQL string into abstract syntax trees using `sqlglot`.
- Verifies query structure:
  - Rejects `DROP`, `ALTER`, `TRUNCATE`, `UPDATE`, `DELETE`, `INSERT`, `EXEC`.
  - Ensures queries are strictly deterministic `SELECT` statements.
  - Applies automated query limits (e.g., forcing `LIMIT 100`) to prevent database memory exhaustion.

### 4.3 Pluggable LLM Engine (`backend/app/services/llm/`)
- Unified `BaseLLMService` abstract class.
- Concrete providers:
  - `anthropic.py` (Claude 3.5 Sonnet)
  - `gemini.py` (Gemini Flash/Pro)
  - `openai.py` (GPT-4o)
  - `ollama.py` (Llama3, DeepSeek-Coder local runtimes)

---

## 5. Directory & File Structure

```
querytalk/
├── backend/
│   ├── app/
│   │   ├── data/
│   │   │   └── seed_demo.py       # Seeds e-commerce SQLite DB (customers, products, orders)
│   │   ├── models/
│   │   │   └── schemas.py         # Pydantic schemas (DatabaseType, SchemaMap, QueryResult)
│   │   ├── routers/
│   │   │   ├── database.py        # Connect & schema inspection endpoints
│   │   │   ├── health.py          # System status
│   │   │   ├── query.py           # SQL generation & execution endpoints
│   │   │   └── settings.py       # LLM provider config API
│   │   ├── services/
│   │   │   ├── llm/               # Pluggable LLM factory (OpenAI, Anthropic, Gemini, Ollama)
│   │   │   ├── db_manager.py      # Connection pool manager
│   │   │   ├── query_engine.py    # Query execution workflow
│   │   │   ├── schema_mapper.py   # Schema introspector
│   │   │   └── sql_validator.py   # AST security validator
│   │   └── main.py                # FastAPI entry point
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/client.js          # REST client wrapper
│   │   ├── components/
│   │   │   ├── Sidebar/           # SchemaGraph, WorkspaceTree, Sidebar items
│   │   │   ├── SQLEditor.jsx      # Interactive SQL editor & formatter
│   │   │   ├── ResultsTable.jsx   # Data grid renderer
│   │   │   ├── ResultsChart.jsx   # Dynamic charting widget
│   │   │   └── CommandPalette.jsx # Shortcut command panel
│   │   └── App.jsx                # Main layout composition
│   └── package.json
└── docker-compose.yml              # Single command orchestrator
```

---

## 6. AI Agent & Developer Instructions

### 6.1 Quick Start with Docker
```bash
# Start backend and frontend simultaneously
docker-compose up --build
```

### 6.2 Manual Development Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Seed demo e-commerce database
python -m app.data.seed_demo

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 6.3 Modifying Security Rules in AST Validator
To inspect or update blocked SQL expressions, navigate to `backend/app/services/sql_validator.py` and inspect `ALLOWED_STATEMENT_TYPES` or `FORBIDDEN_EXPRESSIONS`.
