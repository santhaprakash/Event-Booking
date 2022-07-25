import React, { useState } from "react";
import Home from "../components/Home";
import Events from "../components/Events";
import styles from "../styles/Nav.module.css";
import { Link } from "react-scroll";
import Workshop from "../components/Workshop";
import Contact from "../components/Contact";
import InstagramIcon from "@mui/icons-material/Instagram";
function Nav() {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "10000",
          backgroundColor: "#e6e6e6",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          boxShadow: "0 0 5px 2px #e6e6e6",
        }}
      >
        <div>
          <Link to="home">
            <h3 className={styles.logo}>SWAYAM</h3>
          </Link>
        </div>
        <div className={styles.navbar}>
          <Link to="home" smooth={true} offset={-70} duration={600}>
            <h3 className={styles.linktest}>Home</h3>
          </Link>
          <Link to="events" spy smooth={true} offset={-100} duration={600}>
            <h3 className={styles.linktest}>Events</h3>
          </Link>
          <Link to="workshop" smooth={true} offset={-100} duration={600}>
            <h3 className={styles.linktest}>Workshop</h3>
          </Link>
          <Link to="contact" smooth={true} offset={-80} duration={600}>
            <h3 className={styles.linktest}>Contact</h3>
          </Link>
        </div>
        <div>
          <a
            href="https://www.instagram.com/santha__prakash/?hl=en"
            className={styles.contact}
          >
            <InstagramIcon style={{ fontSize: "30px" }} />
          </a>
        </div>
      </div>
      <div id="home" style={{ height: "100vh" }}>
        <Home />
      </div>
      <div id="events" >
        <Events />
      </div>
      <div id="workshop" style={{height: "123vh" }}> 
        <Workshop />
      </div>
      <div id="contact"  style={{marginTop:'-50px'}}>
        <Contact />
      </div>
    </div>
  );
}

export default Nav;
