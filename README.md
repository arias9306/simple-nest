<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

The server will start running on `http://localhost:3000/`.

## API Endpoints

### Base URL

All routes are prefixed with `/api/v1`.

### 1. **App Routes**

- **GET** `/api/v1`: Returns a basic status message.

### 2. **Todo Routes**

- **POST** `/api/v1/todo`: Create a new Todo item.
- **GET** `/api/v1/todo`: Retrieve a list of all Todo items.
- **GET** `/api/v1/todo/:id`: Retrieve a specific Todo item by its ID.
- **PATCH** `/api/v1/todo/:id`: Update a specific Todo item by its ID.
- **DELETE** `/api/v1/todo/:id`: Delete a specific Todo item by its ID.

### 3. **Recipe Routes**

- **POST** `/api/v1/recipe`: Create a new Recipe.
- **GET** `/api/v1/recipe`: Retrieve a list of all Recipes.
- **GET** `/api/v1/recipe/:id`: Retrieve a specific Recipe by its ID.
- **PATCH** `/api/v1/recipe/:id`: Update a specific Recipe by its ID.
- **DELETE** `/api/v1/recipe/:id`: Delete a specific Recipe by its ID.

### Notes:

- Ensure that the database and necessary environment variables are properly configured before running the server.
- In the root folder you can find the postman collection to call all the endpoints
