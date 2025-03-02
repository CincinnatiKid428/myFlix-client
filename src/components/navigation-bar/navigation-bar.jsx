import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";

//Set to 1px for debug border
const debugBorder = "0px solid red";

// Image imports - Matinee images created using www.recraft.ai and are owned by Recraft.
import matineeNavbarBrand from "../../img/matinee-logo2-navbar-sm.png";

export const NavigationBar = ({ user, onLoggedOut }) => {

  return (
    <Navbar expand="md" className="sticky-top custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={matineeNavbarBrand} />
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
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>

        </Navbar.Collapse>

      </Container>
      {user ? (
        <span style={{ float: "right", marginLeft: "10px", border: debugBorder }}>Welcome, {user.Username}!</span>
      ) : (
        <></>
      )
      }
    </Navbar >
  );
};
