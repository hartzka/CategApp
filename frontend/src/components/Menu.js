import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'

const Menu = ({ user, handleLogout }) => {
  const style = {
    padding: '5px',
    color: 'white'
  }
  return (
    <Navbar collapseOnSelect expand="lg" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={style} to="/">categories</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={style} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user !== null &&
            <form onSubmit={handleLogout}>
              <p>{user.name} logged in
                <button class="btn btn-danger" type="submit">logout</button>
              </p>
            </form>
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu