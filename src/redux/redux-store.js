import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import profileReducer from "./reducers/profileReducer";
import dialogsReducer from "./reducers/dialogsReducer";
import { sidebarReducer } from "./reducers/sidebarReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import { thunk } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./reducers/appReducer";
import { compose } from "redux";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)
));

// const store = legacy_createStore(reducers, applyMiddleware(thunk))

window.store= store;

export default store