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
      <div>
        {feed &&
          feed.shelves.map((shelf, idx) => (
            <div key={idx}>
              <p>{shelf.title}</p>
              {shelf.shelfItems.map((shelfItem, itemIdx) => (
                <div key={itemIdx}>{shelfItem.title}</div>
              ))}
            </div>
          ))}
      </div>
    );
  }
}
