import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import "./App.css";

import { RecipeItemList } from "./components/RecipeItemList";
import { RecipeProvider } from "./components/RecipeContext";
import {NewRecipeForm} from "./components/NewRecipeForm";
import {RecipeDetails} from "./components/RecipeDetails";

function App() {
  return (
    <>    
    <BrowserRouter>
      <Routes>
        <Route path = "/new" element={<RecipeProvider><NewRecipeForm /></RecipeProvider>}/>
        <Route path="*" element={<RecipeProvider><RecipeItemList /></RecipeProvider>} />
        <Route path="/recipes/:id" element={<RecipeProvider><RecipeDetails /></RecipeProvider>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;