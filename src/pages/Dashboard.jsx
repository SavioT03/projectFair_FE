import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import Profile from "../components/Profile";
import Add from "../components/Add";
import View from "../components/View";
import { getUserProjects } from "../services/allApi";
import { addProjectContext, deleteProjectContext, editPorjectContext } from "../../context/ContextApi";

const Dashboard = () => {
  const [projects,setProjects]=useState([])
  const {addProjectResponse,setAddProjectResponse}= useContext(addProjectContext)
  const {editProjectResponse,setEditProjectResponse}=useContext(editPorjectContext)
  const {deleteProjectResponse,setDeleteProjectResponse}=useContext(deleteProjectContext)

  useEffect(()=>{
    getProjects()
  },[addProjectResponse,editProjectResponse,deleteProjectResponse])
  const getProjects= async()=>{

    try {
      let token = sessionStorage.getItem('token')
      if(token){
        let headers= {
          Authorization: `Bearer ${token}`
        }
        let apiResponse= await getUserProjects(headers)
        if(apiResponse.status==200)
        {
           setProjects (apiResponse.data)
        }
        else{
          alert("Failed to fetch projects!")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Header insideDashboard={true} />
      <div className="mt-4 mx-2">
        <Row>
          <Col lg={8}>
            <div className="p-3">
              <h1>
                Welcome <span className="text-danger">User,</span>
              </h1>
              <div>
                <div className="d-flex justify-content-between">
                  <h3>All Projects</h3>
                  <Add />
                </div>
                <div>
                  <View projects={projects} />
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="p-3 fs-2 fw-bold text-danger">
              <Profile />{" "}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
