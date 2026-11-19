# TOOP Workshops

### Ars longa, vita brevis

TOOP Workshops is a workshop registration and management website for **TOOP: The Order of Pen**. It was built as a Full Stack Development Intern assessment, with a React client and an Express/MongoDB API.

## Features

### Public

- Browse upcoming workshops and view their date, time, venue, address, fee, and remaining seats.
- Register with client- and server-side validation.
- Prevent duplicate registrations and reject registrations when a workshop is full.
- Open workshop directions in Google Maps.

### Admin

- Sign in with credentials configured in the server environment.
- View registrations, newest first, with workshop titles when available.
- Sign out; expired or invalid sessions are rejected.
- Registration search and filter controls are **not currently implemented**.

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 7, Tailwind CSS 4, Framer Motion |
| Forms and API | React Hook Form, Zod, Axios |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas, Mongoose 9 |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Tooling | npm, Nodemon, Oxlint |

## Project structure

```text
.
├── client/
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       └── utils/
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── server.js

```

## Prerequisites

- Node.js **20.19+** or **22.12+**, and npm.
- A MongoDB Atlas account, database, and database user. Allow your development machine in the Atlas network access settings.

## Setup

1. Clone the repository. Replace the placeholder with its Git URL:

   ```sh
   git clone <repository-url> toop-workshops
   cd toop-workshops
   ```

2. Install dependencies in both applications:

   ```sh
   cd client
   npm install
   cd ../server
   npm install
   cd ..
   ```

3. Copy the environment templates. In PowerShell, from the repository root:

   ```powershell
   Copy-Item client\.env.example client\.env
   Copy-Item server\.env.example server\.env
   ```

   On macOS/Linux, use `cp client/.env.example client/.env` and `cp server/.env.example server/.env`.

4. Set the values in `client/.env` and `server/.env`. Do not commit either `.env` file.

   | Variable | File | Description |
   | --- | --- | --- |
   | `VITE_API_URL` | `client/.env` | Base URL for the API; the example points to the local server. |
   | `PORT` | `server/.env` | API listening port; defaults to `5000` when omitted. |
   | `MONGO_URI` | `server/.env` | MongoDB Atlas connection URI. |
   | `JWT_SECRET` | `server/.env` | Secret used to sign and verify admin JWTs. |
   | `ADMIN_EMAIL` | `server/.env` | Admin email accepted at sign-in. |
   | `ADMIN_PASSWORD` | `server/.env` | Admin password; the server hashes it at startup. |
   | `CLIENT_URL` | `server/.env` | Allowed client origin for CORS. |

   The server requires `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `CLIENT_URL` to start.

5. Seed the sample workshops:

   ```sh
   cd server
   npm run seed
   ```

   **Warning:** seeding deletes and recreates workshop records. Existing registrations are not deleted, but their old workshop references may no longer resolve.

6. Start the server and client in separate terminals:

   ```sh
   cd server
   npm run dev
   ```

   ```sh
   cd client
   npm run dev
   ```

   The client is usually at `http://localhost:5173` (Vite may select `5174` if that port is busy). The API is at `http://localhost:5000`; check `http://localhost:5000/api/health` for its health response.

## API reference

All API responses use the `{ success, message, data }` shape.

| Method | Path | Auth required | Description |
| --- | --- | --- | --- |
| `GET` | `/api/health` | No | Check that the server is responding. |
| `GET` | `/api/workshops` | No | List upcoming workshops, sorted by date, with `seatsLeft`. |
| `GET` | `/api/workshops/:id` | No | Get one workshop and its remaining seats. |
| `POST` | `/api/registrations` | No | Validate and create a registration. |
| `POST` | `/api/admin/login` | No | Exchange configured admin credentials for an 8-hour JWT. |
| `GET` | `/api/admin/registrations` | Yes — Bearer JWT | List registrations newest first, with workshop titles populated. |

Example registration request (replace `<workshop-id>` with an ID from `GET /api/workshops`):

```sh
curl -X POST http://localhost:5000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"name":"Sam Reader","email":"sam@example.com","phone":"+15551234567","workshop":"<workshop-id>"}'
```

Example successful response:

```json
{
  "success": true,
  "message": "Registration successful.",
  "data": {
    "registrationId": "<registration-id>"
  }
}
```

## Admin access

Open `http://localhost:5173/admin/login` and use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values from `server/.env`. There are no built-in default credentials. The server hashes the configured password at startup; never publish or commit real credentials.

## Credits

- The TOOP logo and workshop images are stored locally in `client/public/images/`. Their original source and attribution are not recorded in the project; add credits here if required.
