import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap(); // unwrap the promise
      console.log("THIS IS THE RESPONSE FROM LOGIN: ", res);
      dispatch(setCredentials({ ...res }));
      navigate("/profile");
      toast.success(`Welcome Back!`);
    } catch (error) {
      toast.error(error.error);
      console.log(error.error);
    }
  };

  return (
    <div className="form-container" style={{ margin: 30 }}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {isLoading && <Loader />}

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <Row className="py-3">
          <Col>
            Not registered? <Link to="/signup">Please register</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
