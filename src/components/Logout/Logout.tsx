import React from "react";
import api from "../../services/api";

export type LogoutProps = { onLoggedOut: () => void };

export class Logout extends React.Component<LogoutProps> {
  render() {
    return (
      <span>
        <button onClick={() => this.onClick()} type="submit">
          Logout
        </button>
      </span>
    );
  }

  onClick() {
    api.logout();
    this.props.onLoggedOut();
  }
}
