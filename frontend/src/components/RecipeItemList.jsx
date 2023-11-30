import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useRecipeContext } from "./RecipeContext";
import { RecipeItem } from "./RecipeItem";
import { Link } from "react-router-dom";

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

  return (
    <>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search by recipe name..."
      />
      <Link to="/new">
        <button>New Recipe +</button>
      </Link>
      <p>Number of Recipes: {recipeCtx.recipes.length}</p>
      <input
        type = "checkbox"
        checked = {showFavorites}
        onChange = {handleCheckboxChange}
      />
      <span>Only show favorites</span>
      {recipeCtx.recipes
        .filter((recipe) =>
          showFavorites ? recipe.isFavorite : true
        )
        .filter((recipe) =>
          // recipe.name.includes(searchValue) // case sensitive
          recipe.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((recipe) => (
          <RecipeItem key={recipe.id} recipeItem={recipe} />
      ))}
    </>
  );
});
 