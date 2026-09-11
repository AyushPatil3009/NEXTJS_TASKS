# 📋 TaskFlow — Industry-Grade Task Management Application

A production-grade, full-stack Task Management application built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Designed following **Clean 3-Layer Architecture** to demonstrate **Phase 4 (Route Handlers, REST APIs, Validation, Caching & Revalidation)** and architected for seamless evolution into **Phase 5 (Prisma ORM)**, **Phase 6 (Auth.js & RBAC)**, and **Phase 7 (Advanced Next.js)**.

---

## 🚀 Key Features

- ⚡ **RESTful Route Handlers:** Modular API endpoints (`GET`, `POST`, `PATCH`, `DELETE`) with standard HTTP status codes (`200`, `201`, `400`, `404`, `500`).
- 🛡️ **API Input Validation:** Request payload validation for field lengths, date formats, and strict enums (`priority`, `status`, `category`).
- 🔍 **URL-Driven Search & Filters:** Filter tasks by status, priority, and category, with multi-criteria sorting and full pagination stored directly in URL `searchParams`.
- 🔄 **Cache Revalidation:** Instant UI updates via Next.js `revalidatePath` on task mutations.
- 🎨 **Modern Dark/Light Theme:** Built on Tailwind CSS v4 using a sleek Slate + Indigo color palette with glassmorphism navigation.
- 📱 **Interactive Modals:** Create & Edit Task modals with error banners, plus safe Delete confirmation dialogs.
- 💀 **Streaming & Skeleton UI:** Loading skeleton state (`loading.tsx`) during data fetching.

---

## 🏛️ Project Architecture

```text
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts              # GET (list/filter/paginate) & POST (create)
│   │       └── [id]/
│   │           └── route.ts          # GET (one), PATCH (update), DELETE (remove)
│   ├── todos/
│   │   ├── page.tsx                  # Server Component fetching via service layer
│   │   └── loading.tsx               # Skeleton loading UI during streaming
│   ├── layout.tsx                    # Root Layout with ThemeProvider & Navbar
│   └── globals.css                   # Tailwind CSS v4 configuration
├── lib/
│   ├── types/
│   │   └── todo.ts                   # Domain models, Enums, DTOs & API response contracts
│   ├── validations/
│   │   └── todoSchema.ts             # Input validation rules
│   └── services/
│       └── todoService.ts            # Encapsulated data service layer (Prisma-ready)
└── app/src/
    ├── components/
    │   ├── todos/                    # TodoToolbar, TodoCard, TodoList, Modals, Pagination
    │   ├── navbar.tsx                # Responsive glassmorphism navigation
    │   └── footer.tsx                # Responsive dual-theme footer
    └── context/
        └── ThemeContext.tsx          # Global Dark/Light mode context
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/todos` | Query tasks (`search`, `status`, `priority`, `category`, `sortBy`, `page`, `limit`) | `200 OK` |
| `POST` | `/api/todos` | Create a new task (Validates payload) | `201 Created` / `400 Bad Request` |
| `GET` | `/api/todos/:id` | Fetch single task by ID | `200 OK` / `404 Not Found` |
| `PATCH` | `/api/todos/:id` | Update task fields / quick status toggle | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE`| `/api/todos/:id` | Delete a task by ID | `200 OK` / `404 Not Found` |

---

## 🗺️ Long-Term Evolution Roadmap

```text
[x] Phase 4 (Current): REST Route Handlers, Caching, Validation, Filtering & Clean Service Layer
[ ] Phase 5: Prisma ORM Integration + PostgreSQL / SQLite Database & Migrations
[ ] Phase 6: Authentication & Authorization (NextAuth.js / Auth.js) + User Workspaces
[ ] Phase 7: Optimistic UI (useOptimistic), Middleware Rate-Limiting & Production Deployment
```

---

## 🛠️ Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd next_task1
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000/todos](http://localhost:3000/todos) in your browser.
