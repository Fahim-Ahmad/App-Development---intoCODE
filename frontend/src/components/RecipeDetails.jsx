import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { useRecipeContext } from "./RecipeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart, faHeartCirclePlus, faUserClock, faClock, faHome } from '@fortawesome/free-solid-svg-icons';

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
    <div className="container mt-4 shadow p-3 bg-white rounded border border-info recipe-item">
      {recipe ? (
        <>
          <h2 className="display-4">{recipe.name}</h2>
          <h3 className="mt-3 display-6">Ingredients</h3>
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

          <h3 className="mt-3 display-6">Instructions</h3>
          <p>{recipe.instructions}</p>
          <div className="d-flex justify-content-between">
            <p className='display-10'><FontAwesomeIcon icon={faClock} style={{ color: 'gray' }}  /> {recipe.totalCookingTimeMinutes} minutes</p>
            <p className='display-10'>{recipe.calories100g} Kcal/100g</p>
          </div>

          <br></br>
          <Link to="/">
            <button className="btn btn-secondary">Back Home</button>
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
