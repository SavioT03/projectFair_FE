import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark w-100 py-4">
      <div className="container">
        <div className="row gx-4 gy-4 mt-4">
          <div className="col-12 col-lg-3">
            <Link
              className="text-decoration-none fs-1 fw-bolder text-primary"
              to="/"
            >
              <i className="fa-brands fa-docker"></i> Project Fair
            </Link>
            <p className="mt-3 text-secondary">
              Designed by Students of luminar Technolab
            </p>
            <p className="text-secondary mb-0">&copy;2025</p>
          </div>

          <div className="col-12 col-lg-2">
            <h4 className="text-light">Pages</h4>
            <Link to="/" className="text-decoration-none text-secondary d-block mb-1">
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-decoration-none text-secondary d-block mb-1"
            >
              Dashboard
            </Link>
            <Link to="/projects" className="text-decoration-none text-secondary d-block">
              Projects
            </Link>
          </div>

          <div className="col-12 col-lg-2">
            <h4 className="text-light">Guides</h4>
            <p className="text-secondary mb-1">React</p>
            <p className="text-secondary mb-1">MongoDB</p>
            <p className="text-secondary mb-1">Node.js</p>
            <p className="text-secondary mb-0">Express</p>
          </div>

          <div className="col-12 col-lg-5">
            <h4 className="text-light">Contact</h4>
            <div className="d-flex w-100 mb-2">
              <input
                type="email"
                className="form-control bg-secondary text-light border-0"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button className="btn btn-primary ms-2">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="d-flex mt-3 gap-3 fs-4">
              <a href="#" className="text-primary"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="text-primary"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="text-primary"><i className="fa-brands fa-linkedin"></i></a>
              <a href="#" className="text-primary"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="text-primary"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="text-primary"><i className="fa-solid fa-phone"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
