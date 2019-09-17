import { createStore } from "redux";
import tasksReducer from "../reducers/index";
const store = createStore(tasksReducer,{});
export default store;