import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";

function Navigation({ loggedIn }) {
  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand href="/">Adopt-A-Friend</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* routes */}

          {!loggedIn ? <Nav.Link href="/signin">Sign In</Nav.Link> : ""}

          {!loggedIn ? (
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          ) : (
            <>
            <Nav.Link href="/userpets">Pets</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid ? true : null,
});

export default connect(mapStateToProps)(Navigation);
