import { createStore } from "redux";
// import logger from 'redux-logger';

import rootReducer from './RootReducer';

// const middlewares = [ logger ];

// const Store = createStore(rootReducer, applyMiddleware(...middlewares));

const Store = createStore(rootReducer);


export default Store;