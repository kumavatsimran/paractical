import { configureStore } from "@reduxjs/toolkit";
import Recipereducer from "../features/Recipe/RecipeSlice";

export const store=configureStore({
    reducer:{
        recipe:Recipereducer
    }
})