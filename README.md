# DriveStack 🚗

A professional and robust REST API built with **Node.js** and **Express** for automobile inventory management. This project implements industry best practices, including advanced validation, interactive documentation, and centralized error handling.

## 🚀 Key Features

- **🛡️ Security:** Integrated with `helmet` for security headers and protection against common vulnerabilities.
- **📜 Swagger Documentation:** Interactive API documentation available at `/api-docs`.
- **✅ Robust Validation:** Uses **Zod** for strict validation schemas and detailed error messages.
- **🔄 Asynchronous Operations:** Implements `fs/promises` to ensure the server is non-blocking and scalable.
- **⚠️ Centralized Error Handling:** Global middleware for managing both operational and programming exceptions.
- **⚙️ Environment Configuration:** Uses `dotenv` for secure management of configuration variables.
- **📂 Clean Architecture:** Clear separation of concerns between routes, controllers, validators, and utilities.

## 🔧 Installation and Usage

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sebastianvasquezechavarria1234/drive-stack.git
    cd drive-stack
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file based on the `.env.example` file:

    ```bash
    cp .env.example .env
    ```

4.  **Start the server:**
    - Development mode (with Nodemon): `npm run dev`
    - Production mode: `npm start`

## 🛣️ API Endpoints

| Method     | Endpoint     | Description                                            |
| :--------- | :----------- | :----------------------------------------------------- |
| **GET**    | `/`          | Welcome message and server status.                     |
| **GET**    | `/health`    | System health check (uptime and status).               |
| **GET**    | `/api-docs`  | **Interactive Documentation (Swagger UI)**.            |
| **GET**    | `/autos`     | Get all cars (Supports `category` and `name` filters). |
| **GET**    | `/autos/:id` | Get details of a specific car by ID.                   |
| **POST**   | `/autos`     | Register a new car (Requires schema validation).       |
| **PUT**    | `/autos/:id` | Update an existing car's information.                  |
| **DELETE** | `/autos/:id` | Remove a car from the inventory.                       |

## 📁 Project Structure

```text
├── src/
│   ├── controllers/  # Request logic
│   ├── middlewares/  # Validations (Zod) and Error Handler
│   ├── routes/       # Express route definitions
│   ├── utils/        # Persistence (db.js) and custom Error class
├── db.json           # Local "Database" in JSON format
├── swagger.yaml      # OpenAPI 3.0 Specification
├── index.js          # Application entry point
└── .env              # Configuration variables (git ignored)
```

## 🛠️ Technologies Used

- **Express 5** - Fast, unopinionated web framework.
- **Zod** - Schema declaration and type validation.
- **Helmet** - Security for Express applications.
- **Morgan** - HTTP request logger.
- **Swagger UI** - API visualization and testing.
- **Dotenv** - Environment variable management.

## 🤝 Contribution

Contributions are what make the open-source community such an amazing place! Feel free to open an issue or submit a pull request.

---

Developed by **sebastianvasquezechavarria1234 & Santi Vasquez** 🛡️🗿
