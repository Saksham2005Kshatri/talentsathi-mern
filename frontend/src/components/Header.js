import { Container, Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";

const Header = () => {
  // get the userinfo
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="dark" className="mb-5 " variant="dark" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Talentsathi-MERN</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="ms-auto">
          {userInfo ? (
            <>
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>
                  <FaSignOutAlt /> Sign Up
                </Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
