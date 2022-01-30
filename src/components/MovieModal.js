import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { Container, Modal, Button, Row, Col, Badge } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import placeholderImage from "../placeholder.png";

export default function MovieModal(props) {
  const [isFavourite, setIsFavourite] = React.useState(false);
  const favourites = useStoreState((state) => state.favourites);
  const addFavourite = useStoreActions((actions) => actions.addFavourite);
  const removeFavourite = useStoreActions((actions) => actions.removeFavourite);

  const {
    Actors,
    Awards,
    BoxOffice,
    Country,
    DVD,
    Director,
    Genre,
    Language,
    Metascore,
    Plot,
    Poster,
    Production,
    Rated,
    Ratings,
    Released,
    Runtime,
    Title,
    Website,
    Writer,
    Year,
    imdbRating,
    imdbVotes,
    imdbID,
  } = props.data;

  const handleClose = () => props.setShow(false);

  const handleAddFavourite = () => {
    addFavourite(props.data);
    setIsFavourite(true);
  };

  const handleRemoveFavourite = () => {
    removeFavourite(props.data);
    setIsFavourite(false);
  };

  const RatingStars = () => {
    let stars = [];
    let i = 0;
    for (i; i < parseInt(imdbRating); i++) {
      stars.push(<StarFill style={{ fill: "gold" }} />);
    }
    for (i; i < 10; i++) {
      stars.push(<Star style={{ fill: "gold" }} />);
    }
    return <>{stars}</>;
  };

  React.useEffect(() => {
    if (favourites.some((d) => d.imdbID === imdbID)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [favourites, imdbID]);

  return (
    <Modal show size="lg" onHide={handleClose} style={styles.modal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div>
            {Title} - {Year}
          </div>
          <RatingStars />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.modalBody}>
        <img
          src={Poster !== "N/A" ? Poster : placeholderImage}
          style={styles.image}
          className="mx-auto"
        />
        <Badge bg="secondary" style={styles.badge} className="mx-auto">
          Metascore: {Metascore}
        </Badge>
        <Container fluid className="mt-3">
          <Col md={12} sm={12}>
            <Row>
              <b>Ratings</b>{" "}
              {Ratings &&
                Ratings.map((d, i) => (
                  <Row key={i}>
                    <Badge bg="secondary" style={styles.badge} className="my-1">
                      {d.Source}: {d.Value}
                    </Badge>
                  </Row>
                ))}
            </Row>
            <Row>
              <b>Plot</b> {Plot}
            </Row>
            <Row>
              <b>Starring</b> {Actors}
            </Row>
            <Row>
              <b>Director</b> {Director}
            </Row>
            <Row>
              <b>Writer</b> {Writer}
            </Row>
            <Row>
              <b>Runtime</b> {Runtime}
            </Row>
            <Row>
              <b>Genre</b> {Genre}
            </Row>
            <Row>
              <b>Rated</b> {Rated}
            </Row>
            <Row>
              <b>Awards</b> {Awards}
            </Row>
            <Row>
              <b>Box Office</b> {BoxOffice}
            </Row>
            <Row>
              <b>Langugage</b> {Language}
            </Row>
            <Row>
              <b>Country</b> {Country}
            </Row>
          </Col>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {isFavourite ? (
          <Button variant="dark" onClick={handleRemoveFavourite}>
            Remove from favourites
          </Button>
        ) : (
          <Button variant="dark" onClick={handleAddFavourite}>
            Add to favourites
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

const styles = {
  modal: {
    width: "100%",
  },
  image: {
    maxWidth: 300,
    minWidth: 200,
    width: "100%",
  },
  modalBody: {
    display: "grid",
    justifyContent: "center",
  },
  detailsContainer: {
    margin: 5,
    display: "flex",
  },
  badge: {
    width: 200,
  },
};
