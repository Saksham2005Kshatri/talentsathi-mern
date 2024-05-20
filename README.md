# TALENTSATHI-MERN

This project is a full-stack web application that implements user authentication with CRUD operations. It allows users to register, log in, view/update their profile, and delete their account. The front-end is built using React.js, while the back-end is developed with Node.js and Express. MongoDB with Mongoose is used for data storage, bcrypt for password hashing, and JSON Web Tokens (JWT) for authentication.

## FRONTEND

The frontend is built upon react.
For state management I have used redux and the redux toolkit
Used react-bootstrap for making simple UIs

## BACKEND

The backend is built using nodejs.
For API endpoints express is used
MongoDb is used as the nosql database to store data and browse collections

## API ENDPOINTS

- POST /api/auth/signup: Register a new user.
- POST /api/auth/login: Authenticate a user and return a JWT.
- GET /api/auth/profile: Retrieve the authenticated user's profile information.
- PUT /api/auth/profile: Update the authenticated user's profile information.
- DELETE /api/auth/profile: Delete the authenticated user's account.

## GETTING STARTED

### Clone the git reposity

> git clone https://github.com/Saksham2005Kshatri/talentsathi-mern.git /
> cd talentsathi-mern

### Install package dependencies

> npm install

### Run development server

> npm run dev /
> this line will run both frontend and backend server simultaneously with the help concurrently library
