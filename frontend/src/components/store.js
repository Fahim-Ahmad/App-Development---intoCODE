import { action, makeObservable, observable } from "mobx";

export class RecipeStore {
  items = [];

  constructor(initialItems = []) {
    makeObservable(this, {
      items: observable,
    //   addItem: action,
      removeItem: action,
      updateItem: action,
    });

    this.items.replace(initialItems);
  }

  addItem(item) {
    this.items.push(item);
  }

  updateItem(item) {
    const index = this.items.findIndex((i) => {
      return String(i.id) === String(item.id);
    });

    if (index !== -1) {
      const itemsCopy = [...this.items];
      itemsCopy[index] = item;

      this.items.replace(itemsCopy);
    }
  }

  removeItem(item) {
    this.items.replace(this.items.filter((i) => i.id !== item.id));
  }
}
 