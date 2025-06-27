import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingImg from '../assets/LandingImg.png'
import ProjectCard from '../components/ProjectCard'
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'
import avatar3 from '../assets/avatar3.webp'
import { getLimitedProjects } from '../services/allApi'


const Home = () => {
    const navigate = useNavigate()
    const [projectData,setProjectData]=useState([])
    useEffect(()=>{
        getProjects()
    },[])

    const onProjectClick=()=>{
        if(sessionStorage.getItem("token")){
            navigate("/projects")
        }else{
            alert("Please Login")
            navigate("/login")
        }
    }

    const getProjects= async()=>{
        try {
            let apiResult = await getLimitedProjects()
            if(apiResult.status == 200){
                setProjectData(apiResult.data)
            }else{
                alert("Failed to fetch projects")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <div style={{minHeight:"100vh"}} className='d-flex justify-content-center align-items-center shadow rounded'>
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-6">
                <h1 style={{fontSize:"65px"}}><i className="fa-brands fa-docker"></i>{" "}Project Fair</h1>
                <p style={{textAlign:"center"}}>One Stop Destination for all Software Development Projects. Where User can add and manage their projects. As well as access all projects available in our website... What are you waiting for!!!</p>
                {
                    sessionStorage.getItem("token")?<Link to={'/dashboard'} className='btn btn-danger'>Manage your Projects </Link> : (<Link to={'/login'} className='btn btn-primary'>Start To Explore </Link>)
                }
                
            </div>
            <div className="col-lg-6">
                <img style={{paddingLeft:'40vh'}} src={LandingImg} alt="" />
            </div>
        </div>
    </div>
    </div>
    <div className='text-center justify-content-center align-items-center my-5'>
        <h1>Explore Our Projects</h1>
        <marquee>
            <div className='d-flex gap-5'>
            {projectData?projectData.map((eachProject)=>(
            <ProjectCard eachProject={eachProject}/>
            )):" "}
            </div>
         </marquee>

        <button onClick={onProjectClick} className='btn btn-link mt-5'>Click Here To View More Projects</button>
    </div>
<div className='text-center mt-5'>
        <h1>Our Testimonials</h1>
        <div className='d-md-flex justify-content-around'>
            <div style={{width:'14rem'}} className='card'>
                <img src={avatar1} alt="" />
                <div className='text-warning mt-2'><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                <p className='mt-2'>Some quick example text to build on the card title and make up the bulk of the card's content</p>
            </div>
            <div style={{width:'14rem'}} className='card'>
                <img  src={avatar2} alt="" />
                <div className='text-warning mt-2'><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                <p  className='mt-2'>Some quick example text to build on the card title and make up the bulk of the card's content</p>



            </div>
             <div style={{width:'14rem'}} className='card'>
                <img  src={avatar3} alt="" />
                <div className='text-warning mt-2'><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
                <p className='mt-2'>Some quick example text to build on the card title and make up the bulk of the card's content</p>


            </div>

        </div>
    </div>    </>
  )
}

export default Home