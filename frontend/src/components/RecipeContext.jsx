import { useMemo, useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { RecipeStore } from "./store";
import { useApiContext } from "./ApiContext";

const RecipeContext = createContext(undefined);
 
export const useRecipeContext = () => {
  return useContext(RecipeContext);
};

// using as a controller here
export const RecipeProvider = ({ children }) => {
  const [initialRecipes, setInitialRecipes] = useState([]);

  const store = useMemo(() => {
    return new RecipeStore(initialRecipes);
  }, [initialRecipes]);

  const apiContext = useApiContext();

  useEffect(() => {
    const fetchTodos = async () => {
      const recipes = await apiContext.api.getRecipes();
      setInitialRecipes(recipes);
    };

    fetchTodos();
  }, []);

  const addRecipeItem = async (recipeItem) => {
    const newTask = await apiContext.api.createRecipe(recipeItem);
    store.addItem(newTask);
    console.log(store)
  };

  const updateRecipeItem = async (recipeItem) => {
    const updatedTask = await apiContext.api.updateRecipe(recipeItem);
    store.updateItem(updatedTask);
  };

  const removeRecipeItem = async (recipeItem) => {
    await apiContext.api.deleteRecipe(recipeItem);
    store.removeItem(recipeItem);
  };

  const getRecipeByID = async (id) => {
    const recipe = await apiContext.api.getRecipeByID(id);
    return recipe;
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes: store.items,
        addRecipeItem,
        removeRecipeItem,
        updateRecipeItem,
        getRecipeByID
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
  