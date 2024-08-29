import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const getDark = () => {
    let isTrue = localStorage.getItem("dark");
    if (isTrue) {
      return JSON.parse(localStorage.getItem("dark"));
    }
    return false;
  };
  const [dark, setDark] = useState(getDark());
  const body = document.querySelector("body");

  const toggleDarkMode = () => {
    setDark((prevDark) => !prevDark);
  };

  console.log(dark);

  useEffect(() => {
    if (dark) {
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
    }
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    let elements = document.getElementsByClassName("typewrite");
    for (let i = 0; i < elements.length; i++) {
      let toRotate = elements[i].getAttribute("data-type");
      let period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
  }, []);

  class TxtType {
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.isDeleting = false;
      this.tick();
    }

    tick() {
      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

      let delta = 300 - Math.random() * 100; // Increased base delay to slow down typing

      if (this.isDeleting) {
        delta /= 2; // Deleting speed is still faster than typing
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period; // Pause before starting to delete
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500; // Pause before starting the next phrase
      }

      setTimeout(() => this.tick(), delta);
    }
  }

  return (
    <>
      <header
        className="header"
        style={
          !dark
            ? { backgroundColor: "rgba(0, 0, 0, 0.8)" }
            : { backgroundColor: "rgba(255, 255, 255, 0.5)" }
        }
      >
        <div
          className="header__top-wrapper"
          style={
            !dark
              ? { backgroundColor: "rgba(0, 0, 0, 0.8)" }
              : { backgroundColor: "rgba(255, 255, 255, 0.5)" }
          }
        >
          <Link to="/" className="header__logo-link">
            <h1 className="header__title">!NDIA</h1>
          </Link>

          <button className="header__dark-mode-btn" onClick={toggleDarkMode}>
            {!dark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                color={dark ? "#fff" : "#000"}
                className="header__icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                color={dark ? "#fff" : "#000"}
                className="header__icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="header__fade">
          <h1
            className="typewrite"
            data-period="2000"
            data-type='[ "Incredible !ndia", "Dekho Apna Desh!", "Explore the Indian Culture and Heritage." ]'
          >
            <span className="wrap">
              Explore the Indian Culture and Heritage.
            </span>
          </h1>
          <div className="header__lg-nav">
            <ul className="header__ul">
              <li className="header__li">
                <Link className="header__link" to="/">
                  India
                </Link>
              </li>
              <li className="header__li">
                <Link className="header__link" to="/home">
                  Home
                </Link>
              </li>
              <li className="header__li">
                <Link className="header__link" to="/heritage-sites">
                  Heritage Sites
                </Link>
              </li>
              <li className="header__li">
                <Link className="header__link" to="/travel-with-us">
                  Travel with Us
                </Link>
              </li>
              <li className="header__li">
                <Link className="header__link" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li className="header__li">
                <Link className="header__link" to="/our-pride">
                  Our Pride
                </Link>
              </li>
              <li className="header__li">
                <a className="header__link" href="/blog">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
