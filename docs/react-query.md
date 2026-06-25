# ⚡ React Query Architecture

This project uses **TanStack React Query** to manage all frontend data fetching.

---

# 🧠 Goal

React Query is used for:

- API fetching (GET)
- Mutations (POST / PUT / DELETE)
- Automatic caching
- UI ↔ backend synchronization
- Reducing global state usage

---

# 🧱 Global Architecture

UI (React Components)
↓
React Query Hooks
↓
API Layer (axios services)
↓
Backend (Django API)

---

# 🌐 API LAYER (services)

Location: api/

Contains only HTTP requests.

Rules:

- no React Query
- no state logic
- only axios calls

---

Example (Twins API)

export const TwinsAPI = {
getAll: () => axios.get('/twins'),
getOne: (id) => axios.get(`/twins/${id}`),
create: (data) => axios.post('/twins', data),
update: (id, data) => axios.put(`/twins/${id}`, data),
delete: (id) => axios.delete(`/twins/${id}`),
};

---

# 🧠 HOOKS (React Query layer)

Each hook has a single responsibility.

---

# QUERIES (GET)

useTwins
useTwin
useContexts

---

# MUTATIONS

CREATE → invalidate list
UPDATE → invalidate list
DELETE → invalidate list

---

# 🔑 QUERY KEYS

['twins']
['twin', id]
['contexts']
['user']

---

# 🚀 WHY THIS ARCHITECTURE

- scalable
- clean separation of concerns
- maintainable
- backend agnostic
