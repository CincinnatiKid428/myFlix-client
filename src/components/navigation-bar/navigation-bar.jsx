import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="sticky-top custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix {/** Add logo image here later */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Log in
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
