import React from "react";
import { Button, Container, Card, Col, Row, ListGroup } from "react-bootstrap";
import {
  Search as SearchIcon,
  ListTask,
  ViewStacked,
  HeartFill,
} from "react-bootstrap-icons";
import { useStoreState, useStoreActions } from "easy-peasy";
import MovieCard from "./MovieCard";
import MovieListItem from "./MovieListItem";

export default function Favourites(props) {
  const view = useStoreState((state) => state.titleView);
  const changeView = useStoreActions((actions) => actions.changeView);
  const favourites = useStoreState((state) => state.favourites);

  const handleChangeView = () => {
    changeView(view === "list" ? "card" : "list");
  };

  const handleViewMovie = (id) => {
    props.setShow(true);
    props.setModalData(favourites.filter((d) => d.imdbID === id)[0]);
  };

  return (
    <Container style={styles.container}>
      <h1 className="display-1 text-light">
        <HeartFill style={styles.icon} /> My Favourites
      </h1>
      <Card style={styles.resultCard}>
        <Card.Header>
          View as
          <Button variant="light" size="sm m-1" onClick={handleChangeView}>
            {view === "list" ? (
              <>
                Cards <ViewStacked />
              </>
            ) : (
              <>
                List <ListTask />
              </>
            )}
          </Button>
        </Card.Header>

        {favourites.length === 0 && (
          <h1 className="display-5 text-center">No results to display.</h1>
        )}

        {view === "card" && (
          <Container style={styles.cardContainer}>
            <Row md={3} xs={1} sm={2} lg={4}>
              {favourites.map((data) => (
                <Col key={data.imdbID}>
                  <MovieCard data={data} handleViewMovie={handleViewMovie} />
                </Col>
              ))}
            </Row>
          </Container>
        )}

        {view === "list" && (
          <Container style={styles.listContainer}>
            <ListGroup as="ol" variant="flush">
              {favourites.map((data) => (
                <MovieListItem
                  key={data.imdbID}
                  data={data}
                  handleViewMovie={handleViewMovie}
                />
              ))}
            </ListGroup>
          </Container>
        )}
      </Card>
    </Container>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, .541)",
    backdropFilter: "blur(5px)",
    textAlign: "center",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  inputGroup: {
    width: 500,
  },
  cardContainer: {
    marginTop: 20,
  },
  resultCard: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, .541)",
    backdropFilter: "blur(5px)",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  icon: {
    fill: "gold",
  },
};
