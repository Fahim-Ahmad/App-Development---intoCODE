import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRecipeContext } from "./RecipeContext";
import { RecipeItem } from "./RecipeItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export const RecipeItemList = observer(() => {
  const recipeCtx = useRecipeContext();
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleCheckboxChange = (e) => {
    setShowFavorites(e.target.checked);
  };
  
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredRecipes = recipeCtx.recipes
  .filter((recipe) => (showFavorites ? recipe.isFavorite : true))
  .filter((recipe) => recipe.name.toLowerCase().includes(searchValue));

  return (
    <>
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <div className="col-8">
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            className="form-control mb-2"
            placeholder="Search by recipe name..."
          />
        </div>
        <Link to="/recipes/new">
          <button className="btn btn-primary mb-2">
            <FontAwesomeIcon icon={faPlusCircle} /> New Recipe
          </button>
        </Link>
      </div>

      <hr className="bg-success border-1 border-top border-dark" />

      <div className="d-flex justify-content-between row">
        <div className="col-md-10">
          <div className="form-check mb-2">
            <input
              type="checkbox"
              checked={showFavorites}
              onChange={handleCheckboxChange}
              className="form-check-input"
            />
            <label className="form-check-label">Only show favorites</label>
          </div>
        </div>
        <div className="col-md-2 justify-content-between">
          <p>Number of Recipes: <b>{filteredRecipes.length}</b></p>
        </div>
      </div>
      <div className="row">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="col-4 mb-4">
            <RecipeItem recipeItem={recipe} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
});
 