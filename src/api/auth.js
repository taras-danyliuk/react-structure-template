import axios from "axios";

import { API_URL } from "./constants";

export const auth = {
  async login(data) {
    try {
      const result = await axios.post(`${API_URL}/login`, data);

      return result.data;
    }
    catch (err) {
      if (err.response && err.response.data) throw err.response.data;
      throw err;
    }
  },

  async register(data) {
    try {
      const result = await axios.post(`${API_URL}/register`, data);

      return result.data
    }
    catch (err) {
      if (err.response && err.response.data) throw err.response.data;
      throw err;
    }
  },

  async logout() {
    try {
      console.log("logout");

      return true;
    }
    catch (err) {
      console.log(err, "err login")
    }
  },
};
