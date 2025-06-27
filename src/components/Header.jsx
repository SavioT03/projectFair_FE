import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../../context/LoginContext'

const Header = ({insideDashboard}) => {
  const {isLoggedIn,setLoggedIn}=useContext(loginContext)
  const navigate = useNavigate()
  const onLoginClick=()=>{
    sessionStorage.clear()
    setLoggedIn(false)
    navigate("/")
  }
  return (
    <>
  <Navbar className="position-sticky top-0 shadow bg-dark">
        <Container className='d-flex'>
          <div>
          <Navbar.Brand href="/">
              <i className="fa-brands fa-docker text-primary fs-1 fw-bolder"></i><span className='text-primary fw-bolder fs-4'> Project Fair</span>
          </Navbar.Brand>
          </div>
          {insideDashboard? (
            <button onClick={onLoginClick} className='btn btn-link fw-bold fs-5'>logout <i className='fa-solid fa-right-from-bracket'></i></button>
          ): (
            ""
          )}
        </Container>
      </Navbar>
      </>
  )
}

export default Header