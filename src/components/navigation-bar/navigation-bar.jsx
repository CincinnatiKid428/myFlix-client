import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";
import { setMovies } from "../../redux/reducers/movies";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router"; // Make sure you use "react-router-dom" if you're using it for routing

//Set to 1px for debug border
const debugBorder = "0px solid red";

// Image imports - Matinee images created using www.recraft.ai and are owned by Recraft.
import matineeNavbarBrand from "../../img/matinee-logo2-navbar-sm.png";

export const NavigationBar = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // State to track whether the navbar is expanded
  const [expanded, setExpanded] = useState(false);

  // Function to handle closing the navbar after a NavLink is clicked
  const handleNavLinkClick = () => setExpanded(false);

  const handleNavLinkLogout = () => {
    setExpanded(false);
    onLoggedOut();
  }

  const onLoggedOut = () => {
    console.log("navigation-bar.jsx|Clearing localStorage and setting user/token/movies to null/[]...");
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setMovies(null));
    console.log("navigation-bar.jsx|Logout complete.");

  };

  return (
    <Navbar expand="md" className="sticky-top custom-navbar mb-2" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>
          <img src={matineeNavbarBrand} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)} // Toggle the expanded state on button click
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick}>
                  Log in
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" onClick={handleNavLinkClick}>
                  Sign up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" onClick={handleNavLinkClick}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleNavLinkLogout}>
                  Logout ( {user.Username} )
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
};
