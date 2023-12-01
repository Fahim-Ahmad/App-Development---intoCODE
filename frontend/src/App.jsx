import { useState } from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import "./App.css";
import recipeLogo from './assets/logo.svg'
import { RecipeItemList } from "./components/RecipeItemList";
import {NewRecipeForm} from "./components/NewRecipeForm";
import {RecipeDetails} from "./components/RecipeDetails";

function App() {
  return (
    <>
    <BrowserRouter>
        <Link to="/">
          <img src={recipeLogo} className="logo" alt="Recipe logo" />
        </Link>
        <p className="display-15 text-center">Welcome to myRecipe Application</p>
        <hr className="bg-success border-1 border-bottom border-success" />

      <Routes>
        <Route path = "/recipes/new" element={<NewRecipeForm />}/>
        <Route path="*" element={<RecipeItemList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;