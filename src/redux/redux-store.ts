import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import profileReducer from "./reducers/profileReducer";
import dialogsReducer from "./reducers/dialogsReducer";
import { sidebarReducer } from "./reducers/sidebarReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import { thunk } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./reducers/appReducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)
));

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType> 
// export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsTypes>

// export const store = () => {
//     configureStore({
//         reducer: reducers,
//         middleware: (getDefaultMiddleware) => {
//             getDefaultMiddleware().concat(applyMiddleware(thunk))
//         }
//     })+
// } 

// export type RootState = ReturnType<typeof store.getState>
// export type RootState = ReturnType<typeof reducers>
// export type AppStore = ReturnType<typeof store>

// const store = legacy_createStore(reducers, applyMiddleware(thunk))
//@ts-ignore
window.store = store;

export default store