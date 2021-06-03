import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, NavbarBrand } from "react-bootstrap";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./home";
import Todo from "./todo";
import "./App.css"
import { LoginOrLogout, Profile } from "./Auth"

const App = () => {

  return (
    <>
      <Nav
        className="justify-content-center"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <NavbarBrand><Profile></Profile></NavbarBrand>
        <Nav.Item><LoginOrLogout></LoginOrLogout> </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to={"/"}>
              <p>ホーム</p>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to={"/todos"}>
              <p>企業リスト</p>
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todos" element={<Todo />}></Route>
        </Routes>
      </Container>
    </>
  );
};

export default App;
