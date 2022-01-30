import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import AppBar from "../components/AppBar";
import Search from "../components/Search";
import MovieModal from "../components/MovieModal";
import Favourites from "../components/Favourites";

export default function Home(props) {
  const [modalData, setModalData] = React.useState([]);
  const [show, setShow] = React.useState(false);

  return (
    <>
      <AppBar />
      <Container style={styles.container}>
        <Tabs defaultActiveKey="browse" className="mb-3 mt-3">
          <Tab eventKey="browse" title="Browse">
            <Search setModalData={setModalData} setShow={setShow} />
          </Tab>
          <Tab eventKey="favourites" title="My Favourites">
            <Favourites setModalData={setModalData} setShow={setShow} />
          </Tab>
        </Tabs>
      </Container>
      {show && <MovieModal data={modalData} setShow={setShow} />}
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
  },
  tab: {
    backgroundColor: "rgba(255, 255, 255, .541)",
    backdropFilter: "blur(5px)",
  },
};
