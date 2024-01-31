import { defineStore } from "pinia";
import axios from "axios";

export const useMenuStore = defineStore("menu", () => {
  const getDataAllFood = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/show"
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getDataDetailFood = async (idDataFood) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/show/" + idDataFood
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const storeDataFood = async (dataFood) => {};

  return {
    getDataAllFood,
    getDataDetailFood,
    storeDataFood,
  };
});
