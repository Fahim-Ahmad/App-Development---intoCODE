import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { useRecipeContext } from "./RecipeContext";

export const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { getRecipeByID } = useRecipeContext();

  useEffect(() => {
    console.log(id);
    const fetchRecipeDetails = async () => {
        const fetchedRecipe = await getRecipeByID(id);
        setRecipe(fetchedRecipe);
    };

    fetchRecipeDetails();
  }, [id]);

  return (
    <div>
      {recipe ? (
        <>
          <h2>{recipe.name}</h2>
          
          <h2>Ingredients</h2>
          {/* {recipe.ingredients.length} */}
          {/* {console.log(recipe.ingredients)} */}
          {recipe.ingredients.map((ing, index) => {
            return (
              <ul key={index}>
                <li key={index}>
                    {ing.name}: {ing.quantity} {ing.unit}
                </li>
              </ul>
            );
          })}

          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
          <p>{recipe.totalCookingTimeMinutes} Minutes</p>
          <p>{recipe.calories100g} Kcal/100g</p>
          <br></br>
          <Link to="/">
            <button>Back Home</button>
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
