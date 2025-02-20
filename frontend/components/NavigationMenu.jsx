import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./NavigationMenu.module.css";
import logo from "../assets/images/LifePlanner.png";

const NavigationMenu = () => {
  return (
    <Navbar className={`${styles.sidebar} NavigationMenu`}>
      <Container className="d-flex flex-column align-items-center">
        <div className={styles.logoContainer}>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/Planner">Planner</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/Calender">Calendar</Nav.Link>
            <Nav.Link href="/Calender">Shop</Nav.Link>
            <Nav.Link href="/Logout">Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
