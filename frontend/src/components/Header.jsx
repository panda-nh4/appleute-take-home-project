import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { updateLocalCart } from "../slices/cartSlice";
import { useGetCartMutation } from "../slices/cartApiSlice";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [userName, setuserName] = useState("");
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getCartItems] = useGetCartMutation();
  const getOrders = async () => {
    const res = await (await fetch("/api/orders")).json();
    navigate("/orders", { state: res.orders });
  };
  const getCart = async () => {
    try {
      const res = await getCartItems().unwrap();
      dispatch(updateLocalCart(res));
      navigate("/cart");
    } catch (err) {
      if(err?.data?.message==="No token")
      {navigate('/login')}
      toast.error(err?.data?.message || err.error);
    }
  };
  const logout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(clearCredentials());
      dispatch(updateLocalCart({}));
    } catch (err) {
      toast.warn(err);
    }
  };
  useEffect(() => {
    if (userInfo !== null) {
      setuserName(userInfo.name);
    }
  });
  return (
    <header>
      <Navbar bg="primary" data-bs-theme="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Shopapp</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => getCart()}>
                <FaShoppingCart /> {`Cart`}
              </Nav.Link>

              {userInfo ? (
                <>
                  <NavDropdown title={userName} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={getOrders}>
                      Orders
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
