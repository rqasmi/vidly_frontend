import { Component } from "react";
import auth from "../services/authService";

/**
 * Logout Component.
 */

class Logout extends Component {
  /**
   * Removes the auth token from the client and redirects the user to the homepage.
   */
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
