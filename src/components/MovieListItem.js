import React from "react";
import {
  Button,
  Badge,
  ListGroup,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import placeholderImage from "../placeholder.png";

export default function MovieListItem(props) {
  const [isFavourite, setIsFavourite] = React.useState(false);
  const favourites = useStoreState((state) => state.favourites);
  const removeFavourite = useStoreActions((actions) => actions.removeFavourite);

  const { Title, Poster, Type, Year, imdbID } = props.data;

  const handleViewMovie = () => {
    props.handleViewMovie(imdbID);
  };

  const handleRemoveFavourite = (e) => {
    removeFavourite(props.data);
    setIsFavourite(false);
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (favourites.some((d) => d.imdbID === imdbID)) {
      setIsFavourite(true);
    }
  }, [favourites, imdbID]);

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
      style={styles.listGroup}
      onClick={handleViewMovie}
    >
      <img
        src={Poster !== "N/A" ? Poster : placeholderImage}
        style={styles.image}
      />
      <div className="ms-2 me-auto">
        <div className="fw-bold">{Title}</div>
        <Badge bg="dark" pill>
          {Type}
        </Badge>
        <div className="vr mx-1" />
        <Badge bg="dark" pill>
          {Year}
        </Badge>
      </div>

      {isFavourite && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Remove from favourites</Tooltip>}
        >
          <Button
            variant="warning"
            className="btn-fav"
            onClick={handleRemoveFavourite}
          >
            <HeartFill />
          </Button>
        </OverlayTrigger>
      )}
    </ListGroup.Item>
  );
}

const styles = {
  image: {
    height: 100,
  },
  listGroup: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    cursor: "pointer",
  },
};
