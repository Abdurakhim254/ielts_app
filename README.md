IELTS Backend API

A comprehensive backend API built with NestJS to support the IELTS application, facilitating functionalities like user authentication, question management, test submissions, and result processing.

🚀 Features

User Authentication: Secure login and registration with JWT-based authentication.

Role-Based Access Control: Differentiated access for users and administrators.

Question Management: CRUD operations for managing IELTS questions.

Test Submission: Users can submit answers, and results are processed accordingly.

Result Processing: Evaluation of user responses with feedback.

🛠️ Technologies Used

NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.

TypeScript: A superset of JavaScript that compiles to clean, readable JavaScript.

Passport.js: Authentication middleware for Node.js.

JWT (JSON Web Tokens): Compact, URL-safe means of representing claims to be transferred between two parties.

Swagger: API documentation and testing tool.

TypeORM: ORM for TypeScript and JavaScript (ES7, ES6, ES5).

PostgreSQL: Relational database management system.


🛡️ Authentication API

Bu bo‘lim foydalanuvchilarni ro‘yxatdan o‘tkazish, login qilish, token yangilash va tokenni dekodlash funksiyalarini taqdim etadi.

Base URL:

http://localhost:4000/api/v1/auth

1️⃣ Register (Ro‘yxatdan o‘tish)

Endpoint: POST /auth/register
Access: Public

Body (JSON):

{
  "email": "user@example.com",
  "password": "your_password"
}


Response (200 OK):

{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}


Errors:

400 Bad Request: Email is required yoki Password is required

409 Conflict: User already exists

2️⃣ Login

Endpoint: POST /auth/login
Access: Public

Body (JSON):

{
  "email": "user@example.com",
  "password": "your_password"
}


Response (200 OK):

{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}


Errors:

400 Bad Request: Email or password is missing

401 Unauthorized: Invalid credentials

3️⃣ Refresh Token

Endpoint: POST /auth/refresh
Access: Public

Body (JSON):

{
  "refreshToken": "your_refresh_token",
  "accessToken": "optional_access_token"
}


Notes:

accessToken ixtiyoriy, agar yuborilsa tokenni tekshirishda ishlatiladi.

Har safar yangi accessToken va refreshToken qaytariladi.

Response (200 OK):

{
  "accessToken": "new_jwt_access_token",
  "refreshToken": "new_jwt_refresh_token"
}


Errors:

400 Bad Request: Refresh token is required

401 Unauthorized: Invalid refresh token

4️⃣ Decode Token

Endpoint: POST /auth/decode
Access: Public

Body (JSON):

{
  "refreshToken": "your_refresh_token",
  "accessToken": "optional_access_token"
}


Response (200 OK):

{
  "email": "user@example.com",
  "role": "user",
  "id": 1
}


Errors:

400 Bad Request: Token is required

401 Unauthorized: Invalid token


Barcha endpointlar JSON formatida ma’lumot oladi va qaytaradi.

accessToken va refreshToken JWT formatida bo‘lib, foydalanuvchini autentifikatsiya qilish uchun ishlatiladi.

decode endpoint frontend uchun foydalanuvchi rolini va emailini cookie’ga saqlashda ishlatiladi.


📋 Questions API

Base URL:

http://localhost:4000/api/v1/question

1️⃣ Create Question

Endpoint: POST /question
Access: Admin Only

Body (JSON):

{
  "text": "Which planet is known as the Red Planet?",
  "options": ["Earth", "Mars", "Jupiter", "Venus"],
  "correctIndex": 1
}


Response (200 OK):

{
  "id": 1,
  "text": "Which planet is known as the Red Planet?",
  "options": ["Earth", "Mars", "Jupiter", "Venus"],
  "correctIndex": 1,
  "createdAt": "2025-08-13T13:37:02.243Z",
  "updatedAt": "2025-08-13T13:37:02.243Z"
}


Errors:

400 Bad Request: validation errors

403 Forbidden: if user is not admin

2️⃣ Get All Questions

Endpoint: GET /question
Access: Admin or Authorized Role

Response (200 OK):

{
  "message": "Questions Found Successfully",
  "questions": [
    {
      "id": 1,
      "text": "Which planet is known as the Red Planet?",
      "options": ["Earth", "Mars", "Jupiter", "Venus"],
      "correctIndex": 1,
      "createdAt": "2025-08-13T13:37:02.243Z",
      "updatedAt": "2025-08-13T13:37:02.243Z"
    }
  ]
}

3️⃣ Get One Question

Endpoint: GET /question/:id
Access: Admin Only

Params:

id: Question ID (number)

Response (200 OK):

{
  "id": 1,
  "text": "Which planet is known as the Red Planet?",
  "options": ["Earth", "Mars", "Jupiter", "Venus"],
  "correctIndex": 1,
  "createdAt": "2025-08-13T13:37:02.243Z",
  "updatedAt": "2025-08-13T13:37:02.243Z"
}


Errors:

404 Not Found: if question does not exist

403 Forbidden: if user is not admin

4️⃣ Update Question

Endpoint: PUT /question/:id
Access: Admin Only

Params:

id: Question ID (number)

Body (JSON):

{
  "text": "Updated question text",
  "options": ["Option1", "Option2", "Option3", "Option4"],
  "correctIndex": 2
}


Response (200 OK):

{
  "id": 1,
  "text": "Updated question text",
  "options": ["Option1", "Option2", "Option3", "Option4"],
  "correctIndex": 2,
  "createdAt": "2025-08-13T13:37:02.243Z",
  "updatedAt": "2025-08-14T12:00:00.000Z"
}


Errors:

400 Bad Request: validation errors

403 Forbidden: if user is not admin

404 Not Found: if question does not exist

5️⃣ Delete Question

Endpoint: DELETE /question/:id
Access: Admin Only

Params:

id: Question ID (number)

Response (200 OK):

{
  "message": "Question deleted successfully"
}


Errors:

403 Forbidden: if user is not admin

404 Not Found: if question does not exist



📝 Answers API

Base URL:

http://localhost:4000/api/v1/answers

Submit Answers

Endpoint: POST /answers/submit
Access: Authorized Users (RolesGuard)

Body (JSON):

{
  "answers": [
    { "choosenIndex": 1, "questionId": 1 },
    { "choosenIndex": 2, "questionId": 3 },
    { "choosenIndex": 2, "questionId": 5 }
  ]
}


choosenIndex: Foydalanuvchi tanlagan javob indeksi (0 dan boshlanadi)

questionId: Savolning ID raqami

Response (200 OK):

{
  "message": "Answers processed successfully",
  "total": 5,
  "correct": 2,
  "incorrect": 3
}


Errors:

400 Bad Request: Agar body noto‘g‘ri formatda bo‘lsa

403 Forbidden: Agar foydalanuvchi autentifikatsiyadan o‘tmagan bo‘lsa
