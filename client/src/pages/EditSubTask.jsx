import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editSubTask } from "../redux/subtask/subTaskSlice"
import { useNavigate, useParams, Link } from "react-router-dom"
import './form.css'

const EditSubTask = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { subtasks, isLoading } = useSelector(
        (state) => state.subtask
    )

    const [updateSubTask, setUpdateSubTask] = useState((subtasks.filter((subtask) => subtask._id === params.subtaskID))[0])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateSubTask((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(editSubTask(updateSubTask))
        navigate(-1)
    }

    return (
        <div className="subtaskform__container">  
            <button className="back-btn" onClick={() => navigate(-1)}>--- Go Back ---</button>
            <h1>Update Sub Task</h1>
            <form onSubmit={onSubmit} className="form__container">
                <label htmlFor="name">Name: </label>
                <input 
                    type="text" 
                    name="name"
                    id="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Project Name"
                    value={updateSubTask.name}
                />
                <label htmlFor="description">Descriptions: </label>
                <input 
                    type="text" 
                    name="description"
                    id="description"
                    onChange={(e) => handleChange(e)}
                    placeholder="Project Description"
                    value={updateSubTask.description}
                />
                <button type="submit">
                    Update SubTask
                </button>
            </form>
        </div>
    )
}

export default EditSubTask