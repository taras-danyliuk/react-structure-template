import axios from "axios";
import Cookies from "universal-cookie";


import { API_URL } from "./constants";

const auth = {
  async login(data) {
    try {
      const result = await axios.post(`${API_URL}/login`, data);

      // Save token in cookies
      const cookies = new Cookies();
      cookies.set("token", result.data);

      // NOTE: If your token has expire date, than you should set it as cookie expire date
      // cookies.set("token", result.data, { expires: <some date> });

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
      console.info("logout");

      return true;
    }
    catch (err) {
      throw { error: "logout error" }
    }
  },
};

export default auth;
