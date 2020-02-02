import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Header, Segment } from "semantic-ui-react";

const App = () => {
  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h1" inverted textAlign="center">
        Draw Me
      </Header>

      <Segment inverted textAlign="center">
        <p>Upload a picture (all uploads will be posted publicly).</p>
      </Segment>

      <Segment inverted textAlign="center">
        <Button inverted color="yellow" size="massive">
          Select Image...
        </Button>
      </Segment>
    </Container>
  );
};

export default App;
