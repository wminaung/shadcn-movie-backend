# Movies API Documentation

This is the documentation for the Movies API. The API allows users to perform CRUD operations on movies. Below are the endpoints and how to use them.

## Prerequisites

Before using this API, ensure you have the following:

- A running instance of the Movies API server.
- An API client such as Postman or `curl`.

## Base URL

```
http://localhost:PORT
```

Replace `PORT` with the port your server is running on.

## Endpoints

### Fetch All Movies

**GET** `/movie`

Fetches a list of all movies.

#### Response Example:

```json
[
  {
    "id": "cl123456",
    "title": "Inception",
    "category": "Science Fiction",
    "release_year": 2010,
    "description": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    "rating": 8.8,
    "director": "Christopher Nolan",
    "runtime": 148
  },
  {
    "id": "cl123457",
    "title": "The Matrix",
    "category": "Action",
    "release_year": 1999,
    "description": "A computer hacker learns the truth about his reality and his role in the war against its controllers.",
    "rating": 8.7,
    "director": "The Wachowskis",
    "runtime": 136
  }
]
```

### Fetch a Movie by ID

**GET** `/movie/{id}`

Fetches the details of a single movie by its ID.

#### Path Parameters:

- `id` (string): The unique identifier of the movie.

#### Response Example:

```json
{
  "id": "cl123456",
  "title": "Inception",
  "category": "Science Fiction",
  "release_year": 2010,
  "description": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
  "rating": 8.8,
  "director": "Christopher Nolan",
  "runtime": 148
}
```

## For POST, PUT, and DELETE Requests, Admin Access is Required

### Get Token

1. First, login from the webpage.
2. After logging in, use the following endpoint to retrieve your admin token:

   **GET** `/api/admin/get-token`

   #### Response Example:

   ```json
   {
     "token": "your-token"
   }
   ```

## Example

```js
let token = "your-token";

fetch("/api/admin/movie/{id}", {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((reason) => {
    console.log(reason);
  });
```

### Create a Movie

**POST** `/admin/movie`

Creates a new movie.

#### Request Body:

```json
{
  "title": "Interstellar",
  "category": "Science Fiction",
  "release_year": 2014,
  "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  "rating": 8.6,
  "director": "Christopher Nolan",
  "runtime": 169
}
```

#### Response Example:

```json
{
  "id": "cl123458",
  "title": "Interstellar",
  "category": "Science Fiction",
  "release_year": 2014,
  "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  "rating": 8.6,
  "director": "Christopher Nolan",
  "runtime": 169
}
```

### Update a Movie by ID

**PUT** `/admin/movie/{id}`

Updates an existing movie by its ID.

#### Path Parameters:

- `id` (string): The unique identifier of the movie.

#### Request Body:

```json
{
  "title": "The Dark Knight",
  "category": "Action",
  "release_year": 2008,
  "description": "Batman faces the Joker, a criminal mastermind who seeks to create anarchy in Gotham City.",
  "rating": 9.0,
  "director": "Christopher Nolan",
  "runtime": 152
}
```

#### Response Example:

```json
{
  "id": "cl123456",
  "title": "The Dark Knight",
  "category": "Action",
  "release_year": 2008,
  "description": "Batman faces the Joker, a criminal mastermind who seeks to create anarchy in Gotham City.",
  "rating": 9.0,
  "director": "Christopher Nolan",
  "runtime": 152
}
```

### Delete a Movie by ID

**DELETE** `/admin/movie/{id}`

Deletes an existing movie by its ID.

#### Path Parameters:

- `id` (string): The unique identifier of the movie.

#### Response Example:

```json
{
  "message": "Movie deleted successfully."
}
```

## Error Handling

The API uses standard HTTP status codes for indicating errors:

- `400 Bad Request`: The request is invalid or missing required parameters.
- `404 Not Found`: The specified movie does not exist.
- `500 Internal Server Error`: A server error occurred.

#### Example Error Response:

```json
{
  {
  "id": "deleted movie id",
  "title": "deleted",
  "category": "deleted",
  "release_year": 2008,
  "description": "deleted deleted.",
  "rating": 9.0,
  "director": "deleted",
  "runtime": 152
}
}
```
