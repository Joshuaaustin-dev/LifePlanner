import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./NavigationMenu.module.css";
import logo from "../assets/images/LifePlanner.png";
import { TfiDashboard } from "react-icons/tfi";
import { IoMdBook } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

const NavigationMenu = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Update the state based on screen width
  const handleResize = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // Listen to window resize event
  useEffect(() => {
    handleResize(); // Initial check on component mount
    window.addEventListener("resize", handleResize); // Add resize listener

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar className={`${styles.sidebar}`} expand="lg">
      <Container className={`d-flex ${isMobile ? "flex-row" : "flex-column"}`}>
        <Nav
          className={`${isMobile ? "flex-row" : "flex-column"} ${
            styles.navLinks
          }`}
        >
          <Nav.Link href="/" className={styles.navLogo}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </Nav.Link>
          <Nav.Link href="/Dashboard" className={styles.navItem}>
            <TfiDashboard /> <span>Dashboard</span>
          </Nav.Link>
          <Nav.Link href="/Planner" className={styles.navItem}>
            <IoMdBook /> <span>Planner</span>
          </Nav.Link>
          <Nav.Link href="/Profile" className={styles.navItem}>
            <CgProfile /> <span>Profile</span>
          </Nav.Link>
          <Nav.Link href="/Calender" className={styles.navItem}>
            <FaRegCalendarAlt /> <span>Calendar</span>
          </Nav.Link>
          <Nav.Link href="/Shop" className={styles.navItem}>
            <FaShop /> <span>Shop</span>
          </Nav.Link>
          <Nav.Link href="/Logout" className={styles.navItem}>
            <FaSignOutAlt /> <span>Log out</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
