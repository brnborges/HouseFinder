import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "../styles/global.css";
import "../styles/pages/landing.css";
import logoImg from "../images/logo.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import markerImg from "../images/map-marker.svg";

function Landing() {
  return (
    <div id="page-landing">
      <motion.div
        className="wrapper-logo"
        initial={{ scale: 0 }}
        animate={{ scale: 2 }}
        transition={{ duration: 1.5, repeat: 1, repeatType: "reverse" }}
      >
        <img src={markerImg} alt="Logo" />

      </motion.div>
      
      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <img src={logoImg} alt="" />

        <main>
          <h1>Find your way home.</h1>
          <p>Smarter property search starts here.</p>
        </main>

        <div className="location">
          <strong>Dublin</strong>
          <span>Ireland</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="#FFF" />
        </Link>
      </motion.div>
    </div>
  );
}

export default Landing;
