# Developer Seeker

Developer Seeker is a full-stack application built with the MERN stack (MongoDB, Express, React, and Node.js). The application allows developers and employers to connect, post jobs, and collaborate through an integrated chat feature that works with sockets.io.

## Features

- Developer and Employer Registration
- Posting and Applying for Jobs
- Real-time Chat System
- Skills and Position Matching

## Tech Stack

- **Frontend**: React, Axios, CSS Modules, Socket.IO
- **Backend**: Node.js, Express, MongoDB, Mongoose, Socket.IO

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/kjacome24/Developer_seeker.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Developer_seeker
    ```

3. Install backend dependencies:

    ```bash
    cd Server
    npm install
    ```

4. Install frontend dependencies:

    ```bash
    cd ../Client
    npm install
    ```

## Running the Project

### Backend (Server)

1. Run the backend server:

    ```bash
    npm run dev
    ```

### Frontend (Client)

1. In the `Client` directory, run the frontend server:

    ```bash
    npm start
    ```

## Usage

Once both servers are running, navigate to `http://localhost:5173` to access the application.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License.
