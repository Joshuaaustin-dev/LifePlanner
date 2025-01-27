import { Navbar, Nav, Container } from "react-bootstrap";

const NavigationMenu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Login/Signup</Nav.Link>
            <Nav.Link href="/about">Planner</Nav.Link>
            <Nav.Link href="/services">Profile</Nav.Link>
            <Nav.Link href="/contact">Calendar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
