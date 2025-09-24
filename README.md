# Savannah Movies Assessment

A React web application for browsing popular movies using The Movie Database (TMDb) API, featuring Jest tests and Firebase Authentication for secure login and password management.

## 🚀 Features
- Browse popular movies with data fetched from the TMDb API.
- Secure user authentication with Firebase (sign-in and password reset).
- Fully responsive design for desktop and mobile devices.
- Comprehensive testing suite using Jest.
- Deployed on Vercel for both development and production environments.

## 📋 Prerequisites

Before starting, ensure you have Node.js v20.19.5 installed.

To check your Node.js version, run:

### `node -v`

If you don’t have the correct version or need to switch, use NVM (Node Version Manager):

### Install NVM
Follow the NVM Installation Guide to set up NVM. (Guide: https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)

Then, install and use the required Node version:
### `nvm install 20.19.5`
### `nvm use 20.19.5`

## 🛠️ Setup
Clone the repository:
### `git clone <https://github.com/Saheel19/savannah-movies.git>`
### `cd savannah-movies`

Install dependencies:
### `npm install`

Configure environment variables:
- Create a .env file in the project root based on the provided .env.template.
- Add your TMDb API key and other required environment variables (e.g., Firebase credentials).

**Note: Ensure the .env file is correctly configured before running the project.**

## ▶️ Available Scripts

In the project directory, you can run the following commands:
### `npm start`

Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.
- The page will reload automatically when you make changes.
- Any lint errors will be displayed in the console.

### `npm test`
Launches the Jest test runner in interactive watch mode.
See the Jest documentation for more details.

## 🔒 Authentication

The Login page uses Firebase Authentication to manage:
- User sign-in.
- Password reset functionality.

**⚠️ Important: Password reset emails may occasionally land in your spam/junk folder. Please check there if you don’t see the email in your inbox.**

## 🌐 Branches & Deployment
This project uses two main branches:
- Development: Connected to the development deployment. link: https://savannah-movies-p7qrz6xou-saheels-projects-b7c3a8f7.vercel.app/
- Production: Connected to the production deployment. link: https://savannah-movies-lz8wgc2yi-saheels-projects-b7c3a8f7.vercel.app/
Both branches are deployed using Vercel for seamless hosting and scaling.


## 💡 Additional Notes
- Environment Setup: Double-check that your .env file is properly configured before starting the app.
- Recommended IDE: Use VSCode for the best developer experience, with support for extensions like ESLint and Prettier.
- Dependency Issues: If you encounter issues with dependencies, delete the node_modules folder and package-lock.json file, then run npm install again.
- Responsive Design: The application is fully responsive and optimized for both desktop and mobile devices.

## 📚 Stack Used
Explore the technologies used in this project:
- React – JavaScript library for building user interfaces.
- Firebase Authentication – Secure authentication for web apps.
- Jest – JavaScript testing framework.
- TMDb API – Movie data API.
- Vercel – Platform for frontend deployment.

## 🐛 Troubleshooting
- Dependency errors: Run npm install again after deleting node_modules and package-lock.json.
- API issues: Verify your TMDb API key in the .env file.
- Authentication problems: Ensure Firebase credentials are correctly set in the .env file and check your spam folder for password reset emails.
