import React from "react";
import { useState } from "react";
import Forms from "../components/Forms";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { setCredentials } from "../slices/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpinnerLoading from "../components/SpinnerLoading";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [address, setAddress] = useState(userInfo.address);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const submit = async (e) => {
    e.preventDefault();
    if (password!=="" && (password !== confirmPassword)) {
      toast.error("Passwords do not match");
    } else if (
      email === "" ||
      address === "" ||
      name === ""
    ) {
      toast.error("One or more fields blank.");
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          address,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    console.log("Sign in");
  };
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
  }, [userInfo.name, userInfo.email, userInfo.address]);

  return (
    <Forms>
      <h2>Update Profile</h2>
      <Form onSubmit={submit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password (Leave blank if no change)</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <SpinnerLoading />}
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </Forms>
  );
};

export default ProfileScreen;
