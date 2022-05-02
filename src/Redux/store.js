import { legacy_createStore as createStore } from "redux";

import { reducer } from "./reducer";

export const store = createStore(
    reducer,
    window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);

console.log("Subscribe :", store.getState())
store.subscribe(() => {


})