import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useRecipeContext } from "./RecipeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // tried to use 'useHistory' hook, but it seems it is replaces with 'useNavigate'. https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom

export const NewRecipeForm = observer(() => {
  const {addRecipeItem} = useRecipeContext();
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: [{ name: "", quantity: 0, unit: "" }],
    totalCookingTimeMinutes: 0,
    calories100g: 0,
    instructions: "",
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.includes("ingredient")) {
      const newIngredients = [...recipeData.ingredients];
      newIngredients[index][name.split("-")[1]] = value;
      setRecipeData({ ...recipeData, ingredients: newIngredients });
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, { name: "", quantity: 0, unit: "" }],
    });
  };

  const handleSubmit = async (e) => {
    if (!recipeData.name.trim()) {
      alert("Please enter a name for the recipe.");
      return;
    }

    if (!recipeData.instructions.trim()) {
      alert("Please enter an instruction for the recipe.");
      return;
    }

    if (recipeData.totalCookingTimeMinutes == 0) {
      alert("Total ccooking time can't be 0");
      return;
    }
 
    // addRecipeItem(recipeData);
    // console.log(recipeData);
    try {
      const newRecipeId = await addRecipeItem(recipeData);
      // console.log(newRecipeId)
      navigate(`/recipes/${newRecipeId}`);      
    } catch (error) {
      console.error('Error adding recipe:', error);
    }

  };

  return (
    <>
    <div className="container mt-4">
      <h2 className="display-6">Create Recipe</h2>

      <form>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            placeholder="Name of the Recipe"
            type="text"
            className="form-control"
            name="name"
            value={recipeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Instructions:</label>
          <textarea
            placeholder="Please write down the instructions"
            name="instructions"
            className="form-control"
            value={recipeData.instructions}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between row">
          <div className="col-md-6">
            <label className="form-label">Total Cooking Time (minutes):</label>
            <input
              type="number"
              className="form-control"
              name="totalCookingTimeMinutes"
              value={recipeData.totalCookingTimeMinutes}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Calories per 100g:</label>
            <input
              type="number"
              className="form-control"
              name="calories100g"
              value={recipeData.calories100g}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="display-6">Ingredients:</h3>
        {recipeData.ingredients.map((ingredient, index) => (
          <div key={index} className="mb-3 row align-items-end">
            <div className="col">
              <label className="form-label">Ingredient Name:</label>
              <input
                required
                placeholder="Ingredient"
                type="text"
                name={`ingredient-name-${index}`}
                value={ingredient.name}
                onChange={(e) => handleChange(e, index)}
                className="form-control"
              />
            </div>

            <div className="col">
              <label className="form-label">Quantity:</label>
              <input
                type="number"
                name={`ingredient-quantity-${index}`}
                value={ingredient.quantity}
                onChange={(e) => handleChange(e, index)}
                className="form-control"
              />
            </div>

            <div className="col">
              <label className="form-label">Unit:</label>
              <input
                type="text"
                name={`ingredient-unit-${index}`}
                value={ingredient.unit}
                onChange={(e) => handleChange(e, index)}
                className="form-control"
              />
            </div>

            {index === recipeData.ingredients.length - 1 && (
              <div className="col">
                <button type="button" onClick={handleAddIngredient} className="btn btn-primary">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="gap-6">
          <div className="row justify-content-between gap-2">
            <div className="col-auto">
              {/* <Link to={newRecipeId}> */}
                <button onClick={handleSubmit} type="button" className="btn btn-primary">
                  <FontAwesomeIcon icon={faSave} /> Save
                </button>
              {/* </Link> */}
            </div>
            <div className="col-auto">
              <Link to="/">
                <button type="button" className="btn btn-secondary">
                  <FontAwesomeIcon icon={faCancel} /> Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
    </>
  );
})

