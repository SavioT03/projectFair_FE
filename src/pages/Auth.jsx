import React, { useContext, useState } from "react";
import loginpic from "../assets/login.png";
import { Form, FloatingLabel, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser,loginUser } from '../services/allApi'
import { loginContext } from "../../context/LoginContext";


const Auth = ({insideRegister}) => {
  const {isLoggedIn,setLoggedIn}=useContext(loginContext)
  const navigate = useNavigate()
  const [loading,setLoading]= useState()
  const [userData,setUserData] = useState({
    userName:'',
    email:'',
    password:''
  })

  const register = async()=>{

    if(userData.email && userData.password && userData.userName)
    {

      try{
        let apiResult=await registerUser(userData)
        console.log(apiResult)
        if(apiResult.status==201)
        {
          alert("succesfully created")
        }
        else{
          alert("something went wrong !! please contact admin")
        }

      }catch(error){
        console.log(error)

      }

    }
    else{
      alert("please fill the form")
    }
  }
  const login = async()=>{
    if(userData.email && userData.password){
      try {
        setLoading(true)
        let payload ={
          email: userData.email,
          password: userData.password
        }
        let apiResult = await loginUser(payload)
        console.log(apiResult)
        if(apiResult.status==200){
          sessionStorage.setItem("token",apiResult.data.token)

          sessionStorage.setItem("user",apiResult.data.name)
          setLoggedIn(true)
          alert("Login Successfully")
          navigate('/')
        }else{
          alert("Invalid credentials please try again")
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }else{
      alert("Please Fill the Form")
    }
  }
  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="container card">
          <div className="row">
            <div className="col-lg-6">
              <img className="img-fluid w-75" src={loginpic} alt="Login Image" />
            </div>
            <div className="col-lg-6">
              <h1>
                <i className="fa-brands fa-docker">Project Fair</i>
              </h1>
              <h5>Sign {insideRegister ? "up" : "in"} to your Account</h5>
              <Form>
                {insideRegister ? (
                  <FloatingLabel
                    controlId="floatingInput"
                    label="User Name"
                    className="mb-3"
                  >
                    <Form.Control onChange={(e)=>setUserData({...userData,userName:e.target.value})} type="text" placeholder="username" />
                  </FloatingLabel>
                ) : (
                  ""
                )}
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control onChange={(e)=>setUserData({...userData,email:e.target.value})} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                  <Form.Control onChange={(e)=>setUserData({...userData,password:e.target.value})} type="password" placeholder="Password" />
                </FloatingLabel>
              </Form>
              {insideRegister ? (
                <div>
                  <button onClick={register} className="btn btn-primary">Register</button>
                  <p>
                    Existing User? Please Click here to{" "}
                    <Link to={"/login"}>Login</Link>{" "}
                  </p>
                </div>
              ) : (
                <div>
                  <button onClick={login} className="btn btn-primary">Login {loading? <Spinner animation="border" />:""}</button>
                  <p>
                    New User? Please Click here to{" "}
                    <Link to={"/register"}>Register</Link>{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
