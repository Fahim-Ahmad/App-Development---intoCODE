import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useRecipeContext } from "./RecipeContext";

export const NewRecipeForm = observer(() => {
  const {addRecipeItem} = useRecipeContext();

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

  const handleSubmit = (e) => {
    addRecipeItem(recipeData);
    console.log(recipeData);
  };

  return (
    <>
    <form>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={recipeData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Instructions:
        <textarea
          name="instructions"
          value={recipeData.instructions}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Total Cooking Time (minutes):
        <input
          type="number"
          name="totalCookingTimeMinutes"
          value={recipeData.totalCookingTimeMinutes}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Calories per 100g:
        <input
          type="number"
          name="calories100g"
          value={recipeData.calories100g}
          onChange={handleChange}
        />
      </label>
      <br />
      <h3>Ingredients:</h3>
      {recipeData.ingredients.map((ingredient, index) => (
        <div key={index}>
          <label>
            Ingredient Name:
            <input
              type="text"
              name={`ingredient-name-${index}`}
              value={ingredient.name}
              onChange={(e) => handleChange(e, index)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name={`ingredient-quantity-${index}`}
              value={ingredient.quantity}
              onChange={(e) => handleChange(e, index)}
            />
          </label>
          <label>
            Unit:
            <input
              type="text"
              name={`ingredient-unit-${index}`}
              value={ingredient.unit}
              onChange={(e) => handleChange(e, index)}
            />
          </label>
          <br></br>
          {index === recipeData.ingredients.length - 1 && (
            <button type="button" onClick={handleAddIngredient}>
              +
            </button>
          )}
          <br />
        </div>
      ))}
      <br />
    </form>
    <Link to="/">
      <button onClick={handleSubmit}>Submit +</button>
    </Link>
    <Link to="/">
      <button>Cancel</button>
    </Link>
    </>
  );
})

