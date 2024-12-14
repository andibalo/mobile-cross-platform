import { configureStore } from "@reduxjs/toolkit";
import reducer from "./states";

export const store = configureStore({ reducer });