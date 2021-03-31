import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";
import React from "react";
import api, { User } from "../../services/api";

type LoginProps = { onLoggedIn: (user: User) => void };

type LoginState = {
  username: string;
  password: string;
  loginResponse: string | null;
  loading: boolean;
};

export class Login extends React.Component<LoginProps, LoginState> {
  state = {
    username: "",
    password: "",
    loginResponse: null,
    loading: false
  };

  async onSubmit() {
    this.setState({ loading: true });

    const { onLoggedIn } = this.props;
    const { username, password } = this.state;

    const result = await api.login(username, password);

    if (result.status === "success") {
      onLoggedIn(result.value);
    } else {
      this.setState({ loginResponse: result.error });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Box>
        <form onSubmit={e => e.preventDefault()}>
          {this.state.loginResponse && (
            <Heading as="h2" size="2xl">
              {this.state.loginResponse}
            </Heading>
          )}
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type=""
              value={this.state.username}
              onChange={e => this.setState({ username: e.currentTarget.value })}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type=""
              value={this.state.password}
              onChange={e => this.setState({ password: e.currentTarget.value })}
            />
          </FormControl>
          {/*<div>*/}
          {/*  <label htmlFor="username">Username:</label>*/}
          {/*  <input*/}
          {/*    type="text"*/}
          {/*    id="username"*/}
          {/*    name="username"*/}
          {/*    value={this.state.username}*/}
          {/*    onChange={e => this.setState({ username: e.currentTarget.value })}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <label htmlFor="pass">Password (8 characters minimum):</label>*/}
          {/*  <input*/}
          {/*    type="password"*/}
          {/*    id="pass"*/}
          {/*    name="password"*/}
          {/*    value={this.state.password}*/}
          {/*    onChange={e => this.setState({ password: e.currentTarget.value })}*/}
          {/*    minLength={8}*/}
          {/*    required*/}
          {/*  />*/}
          {/*</div>*/}
          <Button
            isLoading={this.state.loading}
            onClick={() => this.onSubmit()}
          >
            Sign in
          </Button>
        </form>
      </Box>
    );
  }
}
