import {configureStore} from "@reduxjs/toolkit";
import material from "./main/main.js";

export const store = configureStore({
    reducer: {
        main: material,
    }
});

