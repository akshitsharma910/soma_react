import React from "react";
import { Offcanvas, Nav, Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const genres1 = [
  { name: "Fiction", class: "link-primary" },
  { name: "Non-Fiction", class: "link-secondary" },
  { name: "Mystery", class: "link-success" },
  { name: "Fantasy", class: "link-danger" },
  { name: "Science Fiction", class: "link-warning" }
];
const genres2 = [
  { name: "Biography", class: "link-primary" },
  { name: "Romance", class: "link-secondary" },
  { name: "Thriller", class: "link-success" },
  { name: "Horror", class: "link-danger" },
  { name: "Historical", class: "link-warning" }
];

const Sidebar = ({ show, handleClose, user }) => (
  <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true} placement="start">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Backdrop with scrolling</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Nav className="flex-column mb-auto">
        <Nav.Item>
          <Nav.Link as={Link} to="/" active>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="#" className="link-body-emphasis">
            Popular
          </Nav.Link>
        </Nav.Item>
        {/* Genres */}
        <div className="container my-5">
          <h5 className="text-center mb-4">Genres</h5>
          <div className="row justify-content-between">
            <div className="col-6 col-md-2 mb-3">
              <Nav className="flex-column" style={{ fontSize: "small" }}>
                {genres1.map(g => (
                  <Nav.Item key={g.name} className="mb-2">
                    <Nav.Link as={Link} to="#" className={`p-0 ${g.class}`}>{g.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
            <div className="col-6 col-md-5 mb-3">
              <Nav className="flex-column" style={{ fontSize: "small" }}>
                {genres2.map(g => (
                  <Nav.Item key={g.name} className="mb-2">
                    <Nav.Link as={Link} to="#" className={`p-0 ${g.class}`}>{g.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </div>
        </div>
      </Nav>
      {/* User Dropdown */}
      <Dropdown className="pt-4">
        <Dropdown.Toggle
          as="a"
          className="d-flex align-items-center link-body-emphasis text-decoration-none"
          style={{ cursor: "pointer" }}
        >
          <Image
            src={user?.picture || "https://github.com/mdo.png"}
            alt=""
            width={32}
            height={32}
            roundedCircle
            className="me-2"
          />
          <strong>{user?.fullName || "mdo"}</strong>
        </Dropdown.Toggle>
        <Dropdown.Menu className="text-small shadow">
          <Dropdown.Item as={Link} to="/posts/add">New project...</Dropdown.Item>
          <Dropdown.Item as={Link} to="#">Settings</Dropdown.Item>
          <Dropdown.Item as={Link} to="/user/profile">Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="#">Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Offcanvas.Body>
  </Offcanvas>
);

export default Sidebar;
