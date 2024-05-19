import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <header style={{ paddingLeft: 0, margin: 30 }}>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=600')",
          height: 400,
        }}
      >
        <div
          className="mask"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: 10 }}
        >
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">TalentSathi-Mern</h1>
              <p className="mb-3">
                For this project, I'll create an authentication system where
                users can sign up, log in, view their profile, change their
                profile details, and delete their account. The frontend is built
                using React.js, while the backend is built using Node.js and
                Express.
              </p>
              <LinkContainer to="/login">
                <Button
                  className="btn btn-lg ms-5"
                  variant="custom"
                  style={{ margin: 5 }}
                  role="button"
                >
                  Login
                </Button>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Button
                  className="btn btn-lg ms-5"
                  variant="custom"
                  style={{ margin: 5, padding: 5, backgroundColor: "black" }}
                  href="/signup"
                  role="button"
                >
                  Register
                </Button>
              </LinkContainer>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
