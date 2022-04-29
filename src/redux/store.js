import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middlewares = process.env.NODE_ENV !== 'production' ? [logger] : [];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;