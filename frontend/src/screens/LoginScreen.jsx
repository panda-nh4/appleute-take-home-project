import React from "react";
import { useState } from "react";
import Forms from "../components/Forms";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import SpinnerLoading from "../components/SpinnerLoading";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
        toast.error(err?.data?.message || err.error)
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <Forms>
      <h2>Sign Up</h2>
      <Form onSubmit={submit}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <SpinnerLoading/>}
        <Button type="submit" variant="primary">
          Sign in
        </Button>
        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </Forms>
  );
};

export default LoginScreen;
