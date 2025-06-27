import React, { createContext, useState } from 'react'

export const addProjectContext= createContext()

export const editPorjectContext= createContext()

export const deleteProjectContext= createContext()

const ContextApi = ({children}) => {
const [addProjectResponse,setAddProjectResponse]= useState([])
const [editProjectResponse,setEditProjectResponse]= useState([])
const [deleteProjectResponse,setDeleteProjectResponse]= useState([])


  return (
    <addProjectContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
    <editPorjectContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
    <deleteProjectContext.Provider value={{deleteProjectResponse,setDeleteProjectResponse}}>    
        {children}
    </deleteProjectContext.Provider>
    </editPorjectContext.Provider>
    </addProjectContext.Provider>
  )
}

export default ContextApi