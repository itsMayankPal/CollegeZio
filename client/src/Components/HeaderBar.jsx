// HeaderBar.jsx
import React from "react";
import "../Styles/HeaderBar.css"; // Import CSS for styling

export default function HeaderBar() {
  return (
    <header className="header-bar">
      <div className="logo">
        {/* You can replace this text with an actual logo image if you have one */}
        <h1>Resource Hub</h1>
      </div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="#resources">Resources</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
