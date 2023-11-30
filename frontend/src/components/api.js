export class RecipeApi {
  constructor() {
    this.url = "http://localhost:3000";
  }

  async getRecipes() {
    const response = await fetch(`${this.url}/recipes`);
    return response.json();
  }

  async getRecipeByID(id) {
    const response = await fetch(`${this.url}/recipes/${id}`);
    return response.json();
  }


  async updateRecipe(recipeItem) {
    const response = await fetch(`${this.url}/recipes/${recipeItem.id}/favorite`, {
      method: "PUT",
      body: JSON.stringify(recipeItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  async deleteRecipe(recipeItem) {
    const response = await fetch(`${this.url}/recipes/${recipeItem.id}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      return { message: "Recipe deleted" };
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Failed to delete recipe");
    }
  }

  async createRecipe(recipeItem) {
    const response = await fetch(`${this.url}/recipes`, {
      method: "POST",
      body: JSON.stringify({
        name: recipeItem.name,
        ingredients: recipeItem.ingredients,
        totalCookingTimeMinutes: recipeItem.totalCookingTimeMinutes,
        calories100g: recipeItem.calories100g,
        instructions: recipeItem.instructions,
        isFavorite: false
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

}
