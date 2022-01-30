import React from "react";
import {
  Button,
  Card,
  Badge,
  Tooltip,
  OverlayTrigger,
  Fade,
} from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import placeholderImage from "../placeholder.png";

export default function MovieCard(props) {
  const [overlay, setOverlay] = React.useState(false);
  const [isFavourite, setIsFavourite] = React.useState(false);
  const favourites = useStoreState((state) => state.favourites);
  const removeFavourite = useStoreActions((actions) => actions.removeFavourite);

  const { Title, Poster, Type, Year, imdbID } = props.data;

  const activateOverlay = () => {
    setOverlay(true);
  };

  const deactivateOverlay = () => {
    setOverlay(false);
  };

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
    <Card
      onMouseEnter={activateOverlay}
      onMouseLeave={deactivateOverlay}
      border="dark"
      className="mb-2"
    >
      <Card.Img
        variant="bottom"
        src={Poster !== "N/A" ? Poster : placeholderImage}
      />
      <Fade in={overlay}>
        <div>
          <Card.ImgOverlay style={styles.overlay} onClick={handleViewMovie}>
            <Card.Text>
              <Badge pill bg="light" style={styles.badge}>
                {Type}
              </Badge>
              <div className="vr" />
              <Badge pill bg="light" style={styles.badge}>
                {Year}
              </Badge>
              {isFavourite && (
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Remove from favourites</Tooltip>}
                >
                  <Button
                    variant="warning"
                    className="float-end btn-fav"
                    onClick={handleRemoveFavourite}
                  >
                    <HeartFill />
                  </Button>
                </OverlayTrigger>
              )}
            </Card.Text>

            <Card.Title style={styles.title}>{Title}</Card.Title>
          </Card.ImgOverlay>
        </div>
      </Fade>
    </Card>
  );
}

const styles = {
  title: {
    color: "white",
  },
  badge: {
    color: "black",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
  },
};
