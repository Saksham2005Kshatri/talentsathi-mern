import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateMutation } from "../slices/usersApiSlice";

const Update = () => {
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

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setAge(userInfo.age);
    setCity(userInfo.city);
    setJob(userInfo.job);
    setPhoneNumber(userInfo.phoneNumber);
  }, [
    userInfo.setName,
    userInfo.setEmail,
    userInfo.setAge,
    userInfo.setCity,
    userInfo.setJob,
    userInfo.setPhoneNumber,
    userInfo.name,
    userInfo.email,
    userInfo.age,
    userInfo.city,
    userInfo.job,
    userInfo.phoneNumber,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. ");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          age,
          city,
          job,
          phoneNumber,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        navigate("/profile");
        toast.success("Profile Updated");
      } catch (error) {
        console.error(error);
        toast.error(error.error);
      }
    }
  };

  return (
    <div className="form-container" style={{ marginTop: 30 }}>
      <h1 style={{ textAlign: "center" }}>UPDATE PROFILE</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="23"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full city</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kathmandu"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter job profile</Form.Label>
          <Form.Control
            type="text"
            placeholder="web developer.."
            value={job}
            onChange={(e) => setJob(e.target.value)}
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {isLoading && <Loader />}

        <Button
          variant="primary"
          type="submit"
          onSubmit={(e) => handleSubmit(e)}
        >
          UPDATE
        </Button>
      </Form>
    </div>
  );
};

export default Update;
