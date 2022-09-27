import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'

const Menu = ({ user, handleLogout }) => {
  const style = {
    padding: '5px',
    color: 'white'
  }
  return (
    user !== null ?
      <Navbar collapseOnSelect expand='lg' variant='light'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={style} to='/'>categories</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={style} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={{padding: '5px', color: 'black'}}>{user.name} logged in</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <form onSubmit={handleLogout}>
                <button class='btn btn-danger' type='submit' id='logout-button'>Logout</button>
              </form>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    : null
  )
}

export default Menu