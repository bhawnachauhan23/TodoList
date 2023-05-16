import React from "react";

// importing bootstrap components
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

// importing corresponding css
import "./Header.css";

// Header Functional Component
function Header() {
  return (
    // Header Container
    <div className="header-container">
      <Navbar className="Navbar" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/React-TodoList">
            <img
              alt="todoicon"
              src="https://images-platform.99static.com/8QnXcN6DRaE1ybz0F6GrbJ15nyo=/100x105:900x905/500x500/top/smart/99designs-contests-attachments/82/82682/attachment_82682137"
              className="d-inline-block align-top todoIcon"
            />{" "}
            <h1 className="navbar-title">TodoList</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
