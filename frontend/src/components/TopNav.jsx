import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function TopNav() {
  const { user } = useAuthContext();

  const logout = useLogout();
  const handClick = () => {
    logout();
  };

  return (
    <Navbar
      className="d-xxl-none"
      collapseOnSelect
      expand="false"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            defaultActiveKey="/"
            className="d-flex flex-column justify-content-between text-start h-100"
          >
            <div>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/income" eventKey="link-1">
                Income
              </Nav.Link>
              <Nav.Link as={Link} to="/expenses" eventKey="link-2">
                Expenses
              </Nav.Link>
              <Nav.Link as={Link} to="/budgets" eventKey="link-3">
                Budgets
              </Nav.Link>
            </div>
            <div className="pb-5">
              {!user && (
                <>
                  <Nav.Link as={Link} to="/login" eventKey="link-4">
                    login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" eventKey="link-5">
                    signup
                  </Nav.Link>
                </>
              )}
              {user && (
                <div>
                  <Button size="lg" onClick={handClick}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
