import { useContext } from "react"
import { deleteProjectContext } from "../../context/ContextApi"
import { deleteProject } from "../services/allApi"
import Edit from "./Edit"

const View = ({projects}) => {
    const {deleteProjectResponse,setDeleteProjectResponse}=useContext(deleteProjectContext)
  const deletProj=async(id)=>{
    try {
      let token= sessionStorage.getItem('token')
      if(token){
        let headers={
          Authorization: `Bearer ${token}`
        }
        let apiResponse=await deleteProject(id,headers);
        if(apiResponse.status==200){
          setDeleteProjectResponse(apiResponse.data)
          alert("Deleted Successfully")
        }else{
          alert("Failed to Delete")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {
        projects?projects.map((eachProject)=>(
          <div className='d-flex justify-content-between bg-dark shadow rounded my-2' style={{ padding:"1rem"}}>
      <h1>{eachProject.title}</h1>
      <div>
        <Edit project={eachProject}/>
        <a className='btn' target="_blank" href={eachProject.gitLink}>
          <i className="fa-brands fa-github"></i>
          </a>
        <button onClick={()=>deletProj(eachProject._id)} className='btn btn-danger'>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
        )): <div>No Projects Found </div>
      }
    </div>
  )
}

export default View