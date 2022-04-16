import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userRegisterReducer } from "./reducers/userReducers";

// reducers
const reducers = combineReducers({
  userRegister: userRegisterReducer,
});

// initial state
const initialState = {};

// middleware
const middleware = [thunk];

// create store
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
