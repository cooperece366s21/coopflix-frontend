import React from "react";
import "./App.css";
import api, { User } from "../../services/api";
import { Login } from "../Login/Login";
import { Logout } from "../Logout/Logout";
import { UserFeed } from "../Feed/Feed";
import { Box, Heading, Stack } from "@chakra-ui/react";

type AppProps = {};
type AppState = { user: User | null };

class App extends React.Component<AppProps, AppState> {
  state: AppState = { user: null };

  async componentDidMount() {
    const currentUser = await api.getCurrentUser();
    this.setState({ user: currentUser });
  }

  render() {
    const { user } = this.state;
    return (
      <Box className="App">
        <Stack spacing={6}>
          <Heading as="h1">Coopflix</Heading>
          <Heading as="h2">Don't do homework | Watch Coopflix instead</Heading>
        </Stack>
        {user === null ? (
          <Login onLoggedIn={user => this.setState({ user })} />
        ) : (
          <div>
            <span>Hello {user.name}</span>
            <Logout onLoggedOut={() => this.setState({ user: null })} />
            <UserFeed />
          </div>
        )}
      </Box>
    );
  }
}

export default App;
