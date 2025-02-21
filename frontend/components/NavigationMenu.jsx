import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./NavigationMenu.module.css";
import logo from "../assets/images/LifePlanner.png";

const NavigationMenu = () => {
  return (
    <Navbar className={`${styles.sidebar}`} expand="lg">
      <Container className="d-flex flex-column">
        <div className={styles.logoContainer}>
          <Navbar.Brand href="/" className={styles.brandContainer}>
            <h3 className={styles.brandTitle}>LifePlanner</h3>
            <img src={logo} alt="Logo" className={styles.logo} />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`flex-column ${styles.navLinks}`}>
            <Nav.Link href="/Dashboard" className={styles.navItem}>
              Dashboard
            </Nav.Link>
            <Nav.Link href="/Planner" className={styles.navItem}>
              Planner
            </Nav.Link>
            <Nav.Link href="/Profile" className={styles.navItem}>
              Profile
            </Nav.Link>
            <Nav.Link href="/Calender" className={styles.navItem}>
              Calendar
            </Nav.Link>
            <Nav.Link href="/Shop" className={styles.navItem}>
              Shop
            </Nav.Link>
            <Nav.Link href="/Logout" className={styles.navItem}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
