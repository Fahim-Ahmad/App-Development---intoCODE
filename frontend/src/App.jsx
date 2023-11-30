import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import recipeLogo from './assets/logo.svg'
import { RecipeItemList } from "./components/RecipeItemList";
import { RecipeProvider } from "./components/RecipeContext";
import {NewRecipeForm} from "./components/NewRecipeForm";
import {RecipeDetails} from "./components/RecipeDetails";

function App() {
  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={recipeLogo} className="logo" alt="Recipe logo" />
        </a>
        <p className="display-15 text-center">Welcome to myRecipe Application</p>
        <hr class="bg-success border-1 border-bottom border-success" />
      </div>

    <BrowserRouter>
      <Routes>
        <Route path = "/recipes/new" element={<RecipeProvider><NewRecipeForm /></RecipeProvider>}/>
        <Route path="*" element={<RecipeProvider><RecipeItemList /></RecipeProvider>} />
        <Route path="/recipes/:id" element={<RecipeProvider><RecipeDetails /></RecipeProvider>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;