import axios from "axios";
import Vue from "vue";

export default {
  install() {
    Vue.prototype.$http = axios.create({
      baseURL: `https://sqlminiproj.herokuapp.com/`,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
