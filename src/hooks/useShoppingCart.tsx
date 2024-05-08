import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TFood } from "./useBusiness";

const shoppingCartState = create<TShoppingCartState>()(
  persist(
    (set) => ({
      foods: [],
      setFood: (food, amount = 1) =>
        set((state) => {
          const foods = [...state.foods];
          const foodIdx = state.foods.findIndex((f) => f.name == food.name);

          if (foodIdx > -1) foods[foodIdx].amount += amount;
          else foods.push({ ...food, amount });

          return { foods };
        }),
      updateFoodAmount: (id, amount) =>
        set((state) => {
          const foods = [...state.foods];
          const foodIdx = foods.findIndex((f) => f.id == id);

          if (foodIdx > -1) {
            if (amount == 0) foods.splice(foodIdx, 1);
            else foods[foodIdx].amount = amount;
          }

          return { foods };
        }),
      deleteFood: (id) =>
        set((state) => {
          const foods = [...state.foods];
          const foodIdx = foods.findIndex((f) => f.id == id);

          if (foodIdx > -1) foods.splice(foodIdx, 1);

          return { foods };
        }),
    }),
    {
      name: "shopping-cart",
    }
  )
);

export default function useShoppingCart() {
  return shoppingCartState((state) => state);
}

type TShoppingCartState = {
  foods: TShoppingCartFood[];
  setFood: (food: TFood, amount: number) => void;
  updateFoodAmount: (id: number, amount: number) => void;
  deleteFood: (id: number) => void;
};

type TShoppingCartFood = TFood & { amount: number };
