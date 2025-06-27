import React, { useState } from "react";
import { Collapse, FloatingLabel, Form } from "react-bootstrap";
import add2 from "../assets/add2.png";
import { editProfile } from "../services/allApi";


const Profile = () => {
  const [open, setOpen] = useState(false);

  const [profileData,setProfileData] = useState({})

  const updatedProfile= async()=>{
    if(Object.keys(profileData).length>0) {
      try {
      let token= sessionStorage.getItem('token')
        let headers={
          Authorization: `Bearer ${token}`
        }
        let apiResponse=await editProfile(profileData,headers);
        if(apiResponse.status==200){
          alert("Updated Profile Successfully")
        }else{
          alert("Something went wrong")
        }
      } catch (error) {
        console.log(error)
      }
  }
 }
  return (
    <div>
      <div className="d-flex justify-content-around align-items-center text-danger">
        <h2>Profile</h2>
        <button
          className="btn text-danger"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <i className="fa-solid fa-caret-down"></i>
        </button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text" className="shadow bg-dark text-center">
          <label>
            <input onChange={(e)=>setProfileData({...profileData,profilePic: e.target.files[0]})} type="file" style={{ display: "none" }} name="" id="" />
            <img
              className="img-fluid"
              src={add2}
              alt=""
              style={{ maxWidth: "40%" }}
            />
          </label>
          <FloatingLabel
            controlId="floatingInputTitle"
            label="User Github Link"
            className="mb-3 floating-label-custom"
            style={{ fontSize: "1.15rem" }}
          >
            <Form.Control onChange={(e)=>setProfileData({...profileData,linkedIn: e.target.value})} type="text" placeholder="Enter project title" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInputTitle"
            label="User LinkedIn Link"
            className="mb-3 floating-label-custom"
            style={{ fontSize: "1.15rem" }}
          >
            <Form.Control onChange={(e)=>setProfileData({...profileData,github: e.target.value})} type="text" placeholder="Enter project title" />
          </FloatingLabel>
          <button onClick={updatedProfile} className="btn btn-primary w-100 fw-bold">Update</button>
        </div>
      </Collapse>
    </div>
  );
};

export default Profile;
