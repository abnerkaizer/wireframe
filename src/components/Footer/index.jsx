import React from "react";
import "./styles.css";
import logo from "../../assets/5.png";
const Footer = () => {
  return (
    <footer>
      <img src={logo} alt="commit-logo" />
      <p>
        Produzido por Abner Kaizer.
        <br />
        MIT License.
      </p>
      <p></p>
    </footer>
  );
};

export default Footer;
