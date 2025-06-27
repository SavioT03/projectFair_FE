import React, { useState,useEffect, useContext } from 'react'
import { Col, FloatingLabel, Modal, Row } from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import './Add.css'
import add from '../assets/add.png'
import { createProject } from '../services/allApi';
import { addProjectContext } from '../../context/ContextApi';


const Add = () => {
    const [show, setShow] = useState(false);
    const [validImage,setValidImage]= useState(true)
    const [previewURL,setPreviewURL]= useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {addProjectResponse,setAddProjectResponse}= useContext(addProjectContext)

    const [projectData,setProjectData]=useState({
      title: "",
      language: "",
      overview: "",
      gitLink: "",
      liveLink: "",
      projectImg: "",
    })

    useEffect(()=>{
      if(projectData.projectImg.type == "image/png" || projectData.projectImg.type == "image/jpg" || projectData.projectImg.type == "image/jpeg"){
        // valid
        setValidImage(true)
        setPreviewURL(URL.createObjectURL(projectData.projectImg))
      }else{
        // invalid
        setValidImage(false)
      }
    }, [projectData.projectImg])
    const onAddClick=async()=>{
      if(projectData.title && projectData.language && projectData.overview && projectData.gitLink && projectData.liveLink && projectData.projectImg){
        try {
          const requestBody = new FormData()

          requestBody.append("title",projectData.title)
          requestBody.append("language",projectData.language)
          requestBody.append("overview",projectData.overview)
          requestBody.append("gitLink",projectData.gitLink)
          requestBody.append("liveLink",projectData.liveLink)
          requestBody.append("projectImg",projectData.projectImg)

          const token = sessionStorage.getItem("token")

          if(token){
            let headers ={
              "Content-Type":"multipart/form-data",
              "Authorization": `Bearer ${token}`
            }
            let apiResponse = await createProject(headers,requestBody)
            if(apiResponse.status==201){
              setAddProjectResponse(apiResponse.data)
              alert("Successfully Added")
              handleClose()
            }else{
              alert("Something went wrong Contact Admin")
            }
          }

        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
    <>
    <button className='btn btn-success' onClick={handleShow}>+New</button>
        <Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>New Project Details!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col lg={4}>
                <label>
                  <input onChange={(e)=>setProjectData({...projectData,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} name='' id='' />
                  <img className='img-fluid' src={previewURL?previewURL:add} alt="" />
                </label>
                {
                  !validImage?<p className='text-danger'>*Upload Only the following file types(jpeg,jpg,png)here!!</p> : ""
                }
                </Col>
                <Col lg={8}>
                <Form>
                <FloatingLabel
  controlId="floatingInputTitle"
  label="Project Title"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,title:e.target.value})} type="text" placeholder="Enter project title" />
</FloatingLabel>

<FloatingLabel
  controlId="floatingInputLanguages"
  label="Project Languages"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,language:e.target.value})} type="text" placeholder="Enter languages" />
</FloatingLabel>

<FloatingLabel
  controlId="floatingInputOverview"
  label="Project Overview"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,overview:e.target.value})} type="text" placeholder="Enter overview" />
</FloatingLabel>

<FloatingLabel
  controlId="floatingInputGithub"
  label="Project Github Link"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,gitLink:e.target.value})} type="url" placeholder="Enter GitHub link" />
</FloatingLabel>

<FloatingLabel
  controlId="floatingInputLive"
  label="Project Live Link"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,liveLink:e.target.value})} type="url" placeholder="Enter live link" />
</FloatingLabel>
</Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className='btn btn-danger'>Cancel</button>
                <button disabled={!validImage} onClick={onAddClick} className='btn btn-success'>Add</button>
            </Modal.Footer>
          </Modal>
          </>
  )
}

export default Add