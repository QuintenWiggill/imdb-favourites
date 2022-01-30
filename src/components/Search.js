import React from "react";
import {
  Form,
  Button,
  Container,
  InputGroup,
  Card,
  Col,
  Row,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import {
  Search as SearchIcon,
  ListTask,
  ViewStacked,
} from "react-bootstrap-icons";
import { getMoviesByID, getMoviesBySearch } from "../api/api";
import { useStoreState, useStoreActions } from "easy-peasy";
import MovieCard from "./MovieCard";
import MovieListItem from "./MovieListItem";

export default function Search(props) {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const view = useStoreState((state) => state.titleView);
  const changeView = useStoreActions((actions) => actions.changeView);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setResults([]);
    setLoading(true);
    getMoviesBySearch(search).then((result) => {
      setResults(result.Search ? result.Search : []);
      setLoading(false);
    });
  };

  const handleViewMovie = (id) => {
    getMoviesByID(id).then((result) => {
      props.setShow(true);
      props.setModalData(result);
    });
  };

  const handleChangeView = () => {
    changeView(view === "list" ? "card" : "list");
  };

  return (
    <Container style={styles.container}>
      <Card style={styles.card}>
        <InputGroup style={styles.inputGroup}>
          <Form.Control
            placeholder="Search IMDb"
            style={styles.searchBar}
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Button variant="dark" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </InputGroup>
        <Form.Text className="text-dark">e.g. Fight Club</Form.Text>
      </Card>

      <Card style={styles.resultCard}>
        <Card.Header>
          <div>
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
          </div>
        </Card.Header>

        {loading && (
          <Spinner animation="border" role="status" className="mx-auto my-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {results.length === 0 && (
          <h1 className="display-5 text-center">No results to display.</h1>
        )}

        {view === "card" && (
          <Container style={styles.cardContainer}>
            <Row md={3} xs={1} sm={2} lg={4}>
              {results.map((data) => (
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
              {results.map((data) => (
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
    width: "100%",
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
};
