import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";

export default function AppBar(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <HeartFill style={styles.icon} />
          IMDb Favourites
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

const styles = {
  icon: {
    marginRight: 5,
    fill: "gold",
  },
};
