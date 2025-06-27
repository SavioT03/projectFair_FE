import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import {serverURL} from '../services/serverURL'

const ProjectCard = ({eachProject}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Card onClick={handleShow} style={{ width: '18rem' }} className='mb-5 mt-4'>
      <Card.Img variant="top" src={`${serverURL}/uploads/${eachProject.projectImg}`} />
      <Card.Body>
        <Card.Title className='text-center'>{eachProject.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose} backdrop="static" centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                src={`${serverURL}/uploads/${eachProject.projectImg}`}
                alt="Project"
                className="img-fluid rounded mb-3"
              />
            </div>
            <div className="col-lg-6">        
              <h5>{eachProject.title}</h5>
             <p>Languages Used : <span className='fw-bold text-warning'>{eachProject.language}</span></p>
             <p className=''>Project Overview: <span className='fw-bold text-tertiary'>{eachProject.overview}</span></p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='me-1 fs-2'>
            <a href=""><i class="fa-brands fa-github"></i></a>
            <a className='ms-3' href=""><i class="fa-solid fa-link"></i></a>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard