import { useContext, useEffect, useState } from 'react';
import { Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { serverURL } from '../services/serverURL';
import { editProject } from '../services/allApi';
import { editPorjectContext } from '../../context/ContextApi';


const Edit = ({project}) => {
  const {editProjectResponse,setEditProjectResponse}=useContext(editPorjectContext)
  const [show, setShow] = useState(false);
  const [validImage,setValidImage]= useState(true)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [previewURL,setPreviewURL]= useState("")
  const imgPlace= `${serverURL}/uploads/${project.projectImg}`

  const [projectData,setProjectData]=useState({
    title: "",
    language: "",
    overview: "",
    gitLink: "",
    liveLink: "",
    projectImg: "",
      })

      useEffect(()=>{
        setProjectData(project)
      },[])

  useEffect(()=>{
    if(projectData.projectImg.type == "image/png" || projectData.projectImg.type == "image/jpg" || projectData.projectImg.type == "image/jpeg"){
        // valid
        setValidImage(true)
        setPreviewURL(URL.createObjectURL(projectData.projectImg))
      }else{
        // invalid
        setValidImage(false)
      }
  },[projectData.projectImg])  
  
  const onEditClick=async()=>{
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
              let pId= project._id
              if(token){
                let headers ={
                  "Content-Type":"multipart/form-data",
                  "Authorization": `Bearer ${token}`
                }
                let apiResponse = await editProject(headers,requestBody,pId)
                if(apiResponse.status==200){
                  setEditProjectResponse(apiResponse.data)
                  alert("Successfully Edited Project")
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
    <button onClick={handleShow} className='btn'><i className="fa-solid fa-pen-to-square"></i></button>
    <Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>Edit Project Details!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col lg={4}>
                <label>
                  <input onChange={(e)=>setProjectData({...projectData,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} name='' id='' />
                  <img className='img-fluid'
                   src={previewURL?previewURL:imgPlace}
                    alt="image" />
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
  <Form.Control onChange={(e)=>setProjectData({...projectData,title:e.target.value})} value={projectData?.title||" "} type="text" placeholder="Enter project title" />
</FloatingLabel>

<FloatingLabel
  controlId="floatingInputLanguages"
  label="Project Languages"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,language:e.target.value})}value={projectData?.language||" "} type="text" placeholder="Enter languages" />
</FloatingLabel>

<FloatingLabel
  controlId="floatingInputOverview"
  label="Project Overview"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,overview:e.target.value})} value={projectData?.overview||" "} type="text" placeholder="Enter overview" />
</FloatingLabel>

<FloatingLabel
  controlId="floatingInputGithub"
  label="Project Github Link"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,gitLink:e.target.value})} value={projectData?.gitLink||" "} type="url" placeholder="Enter GitHub link" />
</FloatingLabel>

<FloatingLabel
  controlId="floatingInputLive"
  label="Project Live Link"
  className="mb-3 floating-label-custom"
>
  <Form.Control onChange={(e)=>setProjectData({...projectData,liveLink:e.target.value})} value={projectData?.liveLink||" "} type="url" placeholder="Enter live link" />
</FloatingLabel>
</Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className='btn btn-danger'>Cancel</button>
                <button onClick={onEditClick} className='btn btn-success'>Edit</button>
            </Modal.Footer>
          </Modal>
    </>
  )
}

export default Edit