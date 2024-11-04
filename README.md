Backend Setup
Clone the Repository:

```bash
git clone https://github.com/somugowdasoft/online-assessment-platform-backend.git
cd backend
```

Install Dependencies:

```bash
npm install```

**Environment Variables:** Create a .env file in the root of your backend directory and configure:

```bash
MONGO_URI=mongodb://localhost:27017/assessment-platform
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRE = 1h
```
**Start the Backend Server:**

```bash
npm run dev```

**Backend Tech Overview:**

**Node.js & Express.js:** For handling API routes and business logic.
**MongoDB:** For storing user data, exam questions, and results.
**JWT:** For authenticating and authorizing users.
**Role-based Access Control:** Differentiates between admin and student routes.
**Postman:** For API testing and documentation.

**API Endpoints:**

**User Authentication:**
POST /api/auth/register (Admin & Student)
POST /api/auth/login (Admin & Student)

**Question Bank Management:**
GET, POST, PUT, DELETE /api/questions (Admin only)
**Exam Management:**
GET, POST, PUT /api/exam (Admin only)
**Students:**
GET, DELETE /api/students (Admin only)
**Results and Analytics:**
GET /api/result (Admin & Student based on role)
