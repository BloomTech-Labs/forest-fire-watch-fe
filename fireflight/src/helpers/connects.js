import axios from "axios";
import stats from "./status.js";
import { isArray } from "util";
import { base_url_staging, base_url_local } from "../config/vars";
class connector {
  /**
   * This class is built as a helper to deal with all connection requests.
   */
  constructor() {
    this.connector = axios;
    this.coreString = process.env.REACT_APP_ENV || base_url_local;
    // console.log("ENVIRONMENT", this.coreString);
    this.fireflight = process.env.REACT_APP_MAPBOX_TOKEN;

    if (localStorage.getItem("token") != null) {
      this.connector.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      this.self()
        .then(data => {
          console.log("connects data: ", data);
          this.user = data.email;
        })
        .catch(err => {
          localStorage.removeItem("token");
          this.connector.defaults.headers.common["Authorization"] = undefined;
        });
    }
    this.user = null;
  }

  /**
   * Attempts to login to the application, passes a token to axios upon request.
   * Sends a status with stats:true upon succes, and stats:false upon failure. Message will contain reason
   * @param {email:String, password:string} creds, Credentials to test against
   */
  async login(creds) {
    let res = await axios.post(this.coreString + "auth/login", creds);

    let data = await res.data;
    // console.log(data);
    if (res.status == 200) {
      //success test
      localStorage.setItem("token", data.token);
      this.connector.defaults.headers.common["Authorization"] = data.token;
      let who = await this.self();
      window.location.href = "/";
      return new stats(true, who.email);
    } else {
      //success failed
      throw { status: false, data: "Login Failed" };
    }
  }

  /**
   * Destroyed stored authorization token and removes the token from storage
   */
  logout() {
    this.connector.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("token");

    // adding this page refresh to clear lingering location pins from the map upon logout.
    window.location.reload(false);
  }

  /**
   * returns user object
   */
  async self() {
    // session endpoint returns the JWT (session route { email: 'example@gmail.com', user_id: 1 })
    let response = await axios.get(`${this.coreString}users/session`);
    let data = await response.data;
    return data;
  }

  /**
   * Registers a user with given credentials
   * Returns a status with {stats:true} upon success, and {stats:false} upon failure.
   * @param {email,password} creds Creditals wanted to register
   */
  async register(creds) {
    let response = await axios.post(`${this.coreString}auth/register`, creds);
    if (response.status == 201) {
      let data = await response.data;
      this.connector.defaults.headers.common["Authorization"] = data.token;
      localStorage.setItem("token", data.token);
      let who = await this.self();

      return new stats(true, { email: who.email });
    } else {
      let errors = { code: response.status };
      errors.message = response.data.message;
      return new stats(false, errors);
    }
  }

  /**
   * Fetch all locations associated with current login
   */
  async fetchLocations() {
    let response = await this.connector.get(`${this.coreString}locations`);
    let data = await response.data;
    if (response.status == 200) {
      return new stats(true, data);
    } else {
      return new stats(false, data);
    }
  }

  /**
   *
   * @param {location} locs save location to server and return the saved location
   * @param {number} radius radius to change
   */
  async saveLocations(locs, radius, name) {
    try {
      let user = await this.self();
      if (isArray(locs))
        locs = locs.map(i => ({
          user_id: user.user_id,
          address: i,
          radius: radius,
          address_label: name || ""
        }));
      else
        locs = {
          user_id: user.user_id,
          address: locs,
          radius: radius,
          address_label: name || ""
        };
      let response = await this.connector.post(
        `${this.coreString}locations`,
        locs
      );
      let data = await response.data;
      return new stats(true, data);
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param {Address} add Address to swap to
   * @param {id} id Id to change
   * @param {number} radius radius to change
   */
  async updateLocation(add, radius, name, id) {
    try {
      let user = await this.self();
      let sender = {
        address: add,
        user_id: user.user_id,
        radius: radius,
        address_label: name || ""
      };
      let res = await this.connector.put(
        `${this.coreString}locations/${id}`,
        sender
      );
      let data = await res.data;
      return new stats(true, add);
    } catch (err) {
      throw new stats(false, err);
    }
  }

  async deleteLocation(id) {
    try {
      let user = await this.self();
      let res = await this.connector.delete(
        `${this.coreString}locations/${id}`
      );
      let data = await res.data;
      return new stats(true, "deleted " + id);
    } catch (err) {
      throw new stats(false, err);
    }
  }
}

const connect = new connector();

export default connect;
