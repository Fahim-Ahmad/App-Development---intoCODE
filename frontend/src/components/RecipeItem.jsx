import { useState } from "react";
import { observer } from "mobx-react-lite";
import {Link} from "react-router-dom";

import { useRecipeContext } from "./RecipeContext";

export const RecipeItem = observer(({ recipeItem }) => {
  const {removeRecipeItem, updateRecipeItem} = useRecipeContext();

  const onIsFavoriteChange = (event) => {
    const newTodoItem = { ...recipeItem, isFavorite: event.target.checked };
    updateRecipeItem(newTodoItem);
  };

  const onDeleteClick = () => {
    removeRecipeItem(recipeItem);
  };
 
  return (
    <>
        <div id = {recipeItem.id}>
          <h3>{recipeItem.name}</h3>
          <input
          type="checkbox"
          checked={recipeItem.isFavorite}
          onChange={onIsFavoriteChange}
          />
          <p>{recipeItem.instructions}</p>
          <p>{recipeItem.calories100g} Kcal/100g</p>
          <p>{recipeItem.totalCookingTimeMinutes} minutes</p>
          
          <Link to={`/recipes/${recipeItem.id}`}>
              <button>Show Recipe</button>
          </Link>
          <button onClick={onDeleteClick}>Delete x</button>
          <hr></hr>
        </div>
    </>
  );
});
 