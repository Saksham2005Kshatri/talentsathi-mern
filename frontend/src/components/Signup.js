import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { useSignupMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. ");
    } else {
      try {
        const res = await signup({
          name,
          email,
          password,
          age,
          city,
          job,
          phoneNumber,
        }).unwrap(); // unwrap the promise
        dispatch(setCredentials({ ...res }));
        navigate("/profile");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message || error.error);
      }
    }
  };

  return (
    <div className="form-container" style={{ margin: 30 }}>
      <h1 style={{ textAlign: "center" }}>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="23"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full city</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kathmandu"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter job profile</Form.Label>
          <Form.Control
            type="text"
            placeholder="web developer.."
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            placeholder="93840294"
            size={10}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {isLoading && <Loader />}

        <Button
          variant="primary"
          type="submit"
          onSubmit={(e) => handleSubmit(e)}
        >
          Submit
        </Button>

        <Row className="py-3">
          <Col>
            Already signed up? <Link to="/login">Please Login</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Signup;
