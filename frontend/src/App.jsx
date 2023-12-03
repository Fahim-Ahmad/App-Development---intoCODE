import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
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
        <hr className="bg-success border-1 border-bottom border-success" />

      <Routes>
        <Route path = "/recipes/new" element={<NewRecipeForm />}/>
        <Route path="/" element={<RecipeItemList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>

    <hr className="bg-success border-1 border-bottom border-dark" />
    <p className="display-15 text-center">This application has been developed with <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }}  /> by Fahim Ahmad Yousufzai, Abdulrahman Masri, and Ahmad Bilal Alam.</p>
    </>
  );
}

export default App;