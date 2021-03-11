import React from "react";
import api, { User } from "../../services/api";

type LoginProps = { onLoggedIn: (user: User) => void };

type LoginState = {
  username: string;
  password: string;
  loginResponse: string | null;
};

export class Login extends React.Component<LoginProps, LoginState> {
  state = {
    username: "",
    password: "",
    loginResponse: null
  };

  async onSubmit() {
    const { onLoggedIn } = this.props;
    const { username, password } = this.state;

    const result = await api.login(username, password);

    if (result.status === "success") {
      onLoggedIn(result.value);
    } else {
      this.setState({ loginResponse: result.error });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          {this.state.loginResponse && <h2>{this.state.loginResponse}</h2>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.currentTarget.value })}
            />
          </div>
          <div>
            <label htmlFor="pass">Password (8 characters minimum):</label>
            <input
              type="password"
              id="pass"
              name="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.currentTarget.value })}
              minLength={8}
              required
            />
          </div>
          <button onClick={() => this.onSubmit()} type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
