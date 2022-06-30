import React, { Component, Fragment } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  login = () => {
    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Kullanıcı Adı ya da Şifre Boş Bırakılamaz" });
    }
    let loggedIn = this.props.context.login(username, password);
    if (!loggedIn) {
      this.setState({ error: "Hatalı Kullanıcı ya da Şifre" });
    }
  };

  render() {
    return !this.props.context.user ? (
      <Fragment>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Giriş</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Kullanıcı Adı: </label>
              <input
                className="input"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Şifre: </label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )}
            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
                onClick={this.login}
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
      <Redirect to="/products" />
    );
  }
}

export default withContext(Login);
