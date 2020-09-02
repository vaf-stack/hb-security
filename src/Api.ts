import axios from "axios";

class Api {
  token?: string;
  link = "https://hb-security.herokuapp.com/";
  /**
   *
   * @param route Route to make the request
   * @param method HTTP Method
   */
  create(route: string, method: string, data?: object) {
    if (method === "POST") {
      return axios.post(`${this.link}${route}`, { ...data }, { headers: { Authorization: this.token } });
    } else if (method === "GET") {
      return axios.get(`${this.link}${route}`, { headers: { Authorization: this.token } });
    }
  }
}

export default Api;
