# Indus Golf & Country Club Backend

This is the Node.js / Express backend server for the Indus Golf & Country Club portal, connected to MongoDB Atlas.

## Tech Stack
- **Node.js** with **Express**
- **MongoDB Atlas** with **Mongoose** ORM
- **Cors** (cross-origin communications)
- **Morgan** (HTTP logging)
- **Dotenv** (configuration environment management)
- **Nodemon** (hot reloading in development)

---

## Folder Structure

```text
BE/
├── src/
│   ├── config/
│   │   └── db.js            # Mongoose connection module
│   ├── controllers/
│   │   ├── memberController.js # Handles Member database CRUD actions
│   │   └── clubController.js   # Handles Club details retrieval
│   ├── models/
│   │   ├── Member.js        # Member mongoose model schema
│   │   └── ClubInfo.js      # Club metadata / config mongoose schema
│   ├── routes/
│   │   ├── memberRoutes.js  # Routes mapping for member endpoints
│   │   └── clubRoutes.js    # Routes mapping for club info
│   ├── scripts/
│   │   └── seed.js          # MongoDB database seeding script
│   ├── app.js               # Express application middleware/routing configurations
│   └── server.js            # Server entry point
├── .env                     # Local environment file (ignored by git)
├── .env.example             # Template environment variables
├── .gitignore               # Files ignored by git
├── package.json             # NPM package scripts & dependencies
└── README.md                # This instructions file
```

---

## Setup & Running Instructions

### 1. Install Dependencies
Navigate to the `BE/` directory and install the packages:
```bash
cd BE
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Open `.env` and configure your settings:
*   `PORT`: Port for the backend server (defaults to `5000`).
*   `MONGODB_URI`: Replace `YOUR_MONGODB_ATLAS_URI_HERE` with your actual MongoDB Atlas connection string. Example:
    `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/indus_golf_club?retryWrites=true&w=majority`

### 3. Seed the Database
To populate your MongoDB database with the initial membership and privileges data from the frontend JSON structure:
```bash
npm run seed # or: node src/scripts/seed.js
```

### 4. Run the Server
*   **Development Mode (with auto-restart on code change):**
    ```bash
    npm run dev
    ```
*   **Production Mode:**
    ```bash
    npm start
    ```

---

## API Endpoints Reference

### Health Check
*   `GET /api/health`: Returns server status and database connectivity.

### Members
*   `GET /api/members`: Fetch all roster members (sorted by newest).
*   `GET /api/members/:membership_no`: Fetch detailed credentials for a specific member by membership number.
*   `POST /api/members`: Create a new member.
*   `PUT /api/members/:id`: Edit a member's details by their database `_id`.
*   `DELETE /api/members/:id`: Delete a member record by their database `_id`.

### Club Information
*   `GET /api/club-info`: Retrieves club details, affiliations, privilege list, and terms.
