import { createStore } from "redux";
import tasksReducer from "../reducers/index";
import { login } from "../actions";

let initialStoreData = {}
if(localStorage.getItem("TaskerInitialStoreData")) {
    initialStoreData = JSON.parse(localStorage.getItem("TaskerInitialStoreData"));
}
const store = createStore(tasksReducer, initialStoreData);

window.addEventListener('storage', function(e) {  
    let newStorageState = JSON.parse(localStorage.getItem("TaskerInitialStoreData"));
    store.dispatch(login(newStorageState.user.username, newStorageState.user.tasks));
});

store.subscribe(() => {
    localStorage.setItem("TaskerInitialStoreData", JSON.stringify(store.getState()));
})

export default store;