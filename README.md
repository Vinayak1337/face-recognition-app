# Face Recognition App

## Introduction
A progressive web application built using React, TypeScript, and Sass. This single-page application mimics the behavior of a multi-page application, rendering entirely on the client side. The app allows users to upload images, recognize human faces within them, and manage user settings.

[**Live Demo**](https://face-recognition-webapp.netlify.app) [![Netlify Status](https://api.netlify.com/api/v1/badges/4e544221-0c2c-4f99-9e13-eb4a63b9c29f/deploy-status)](https://app.netlify.com/sites/face-recognition-webapp/deploys)

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
1. Clone the repository: `git clone [repo-link]`
2. Navigate to the project directory: `cd face-recognition-app`
3. Install dependencies: `npm install`
4. Start the app: `npm start`

## Server Repository
The backend server handles data processing and storage. While it's currently not live, you can access the code and setup instructions [here](https://github.com/Vinayak1337/face-recognition-server).

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/Vinayak1337/face-recognition-app/blob/master/LICENSE.md) file for details.
