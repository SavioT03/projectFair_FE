import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjects } from '../services/allApi'

const Projects = () => {
  const [projectData,setProjectData]=useState([])
  const [searchKey,setSearchKey]=useState('')

  useEffect(()=>{
    getProjects()
  }, [searchKey])

  const getProjects= async()=>{
    let token = sessionStorage.getItem('token')
    let header = {
      "Authorization" : `Bearer ${token}`
    }

    let apiResponse= await getAllProjects(header,searchKey)
    if(apiResponse.status == 200){
      setProjectData(apiResponse.data)
    }
  }
  return (
    <>
    <Header/>
    <div className="d-flex justify-content-between">
      <h1>All Projects</h1>
      <input onChange={(e)=>setSearchKey(e.target.value)} className="form-control w-25" type="text" placeholder='Search Projects by language' />
    </div>
    <Row>
      {projectData?projectData.map((eachProject)=>(
      <Col lg={4} md={6} sm={12}>
      <ProjectCard  eachProject={eachProject}/>
      </Col>        
      )): " "
    }

    </Row>
    </>
  )
}

export default Projects