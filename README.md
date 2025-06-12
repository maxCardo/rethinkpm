# Node.js + React.js App

This project is a combination of a Node.js server and a React.js client. Follow the steps below to get up and running.

## Getting Started

Before you begin, make sure to add the necessary environment variables in the root directory by creating a `.env` file.

1. In the root directory, run the following command to install the server dependencies:

   ```
   npm install

2. Change into the client directory for installing the client dependencies:

   ```
   cd client
   npm install


4. Navigate back to the root directory and Run the following command to start both the server and client concurrently:

   ```
   cd ..
   npm run dev

This command uses concurrently to run the server and client concurrently. The server will run on a specified port, and the client will be accessible in the browser.

Now you should have the Node.js + React.js app up and running! Open your browser and visit the specified address to see the application in action.