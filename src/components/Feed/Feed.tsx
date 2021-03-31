import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import api, { Feed } from "../../services/api";

type FeedState = {
  feed: Feed | null;
};

type FeedProps = {};

export class UserFeed extends React.Component<FeedProps, FeedState> {
  state: FeedState = {
    feed: null
  };

  async componentDidMount() {
    const feed = await api.getFeed();
    this.setState({ feed: feed });
  }

  render() {
    const { feed } = this.state;
    return (
      <VStack>
        {feed &&
          feed.shelves.map((shelf, idx) => (
            <Box key={idx}>
              <Heading as="h2" size="2xl">
                {shelf.title}
              </Heading>
              <HStack spacing="24px">
                {shelf.shelfItems.map((shelfItem, itemIdx) => (
                  <Box bg="pink.100" key={itemIdx}>
                    <p>{shelfItem.title}</p>
                    <p>{shelfItem.rating && shelfItem.rating.value}</p>
                  </Box>
                ))}
              </HStack>
            </Box>
          ))}
      </VStack>
    );
  }
}
