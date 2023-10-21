# Face Recognition App

## Introduction
A progressive web application built using React, TypeScript, and Sass. This single-page application mimics the behavior of a multi-page application, rendering entirely on the client side. The app allows users to upload images, recognize human faces within them, and manage user settings.

[**Live Demo**](https://face-recognition-ht5h.netlify.app) [![Netlify Status](https://api.netlify.com/api/v1/badges/4e544221-0c2c-4f99-9e13-eb4a63b9c29f/deploy-status)](https://app.netlify.com/sites/face-recognition-webapp/deploys)

## Features
- **Authentication**: Users can either log in or sign up to access the app.
- **Face Detection**: Upload images containing human faces, and the app will highlight each face detected.
- **User Dashboard**: Track the number of images you've processed.
- **Settings**: Update your password, set an avatar (image or GIF), and modify your username.

## Technologies Used
- **React Hooks**: 
  - `useState`: Manage temporary states such as email, password, and more.
  - `useReducer`: Handle complex states within components.
  - `useRef`: Access and modify DOM elements.
  - `useEffect`: Leverage component lifecycle methods.
  - `useCallback`: Optimize performance by preventing unnecessary renders.
- **Custom Hooks**: Manage sessionStorage/localStorage and debug by logging value changes.
- **React-router-dom**: Simulate multi-page navigation in a single-page application.
- **Redux**: Global state management, especially for user data.
- **Material UI**: Implement pre-designed UI components.
- **Moment**: Efficient date handling.
- **Class Components**: Demonstrated ability to create class-based components with lifecycle methods and state management. See an example in the [SignUp component](https://github.com/Vinayak1337/face-recognition-app/blob/master/src/Components/Auth/SignUp/SignUp.tsx).

## Setup and Installation
1. Clone the repository: 
   ```bash
   git clone https://github.com/Vinayak1337/face-recognition-app.git
   ```
2. Navigate to the project directory: 
   ```bash
   cd face-recognition-app
   ```
3. Install dependencies: 
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following values:
   ```
   REACT_APP_BASE_URL=YOUR_BASE_URL
   ```
Replace `YOUR_BASE_URL` with the appropriate URL, either the already hosted server's URL or the URL of the server repository hosted locally.

## Server Repository
The backend server handles data processing and storage. It's currently [live](https://face-recognition-server-ht5h.onrender.com/), and you can either use the base URL of the already hosted server or start the server on your local machine. Access the code and setup instructions [here](https://github.com/Vinayak1337/face-recognition-server).

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/Vinayak1337/face-recognition-app/blob/master/LICENSE.md) file for details.
