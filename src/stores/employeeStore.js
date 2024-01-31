import { defineStore } from "pinia";
import axios from "axios";

export const useEmployeeStore = defineStore("employee", () => {
  const getDataAllEmployee = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/employees/show");
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getDataDetailEmployee = async (idData) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/employees/show/" + idData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getDataAllEmployee,
    getDataDetailEmployee,
  };
});
