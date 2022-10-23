import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { getProjects } from '../redux/project/projectSlice';
import { useEffect } from 'react';
import Project from '../components/Project';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import './dashboard.css'

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageLoader, setPageLoader] = useState(false)
    const dispatch = useDispatch()
    const { projects, isLoading, isError, message } = useSelector(
        (state) => state.projects
    )
    const postsPerPage = 20

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = projects.slice(indexOfFirstPost, indexOfLastPost)

    // Change Page
  const paginate = (num) => {
    setPageLoader(true)
    setCurrentPage(num)
    setPageLoader(false)
  }

    useEffect(() => {
      if (isError) {
        console.log(message)
      }
      dispatch(getProjects())
    }, [isError, message, dispatch])
    
    if(isLoading || pageLoader || !projects) {
        return <Spinner />
    }

    return (
        <div>
            <div className='projects__container'>
                <div className="table">
                    <div className="summary">
                        <div className="summary__col">
                            <h3>Total Projects</h3>
                            <p>{projects.length.toString()}</p>
                        </div>
                    </div>
                    <div className="row">
                        <h2>List of Projects</h2>
                    </div>

                    {projects.length > postsPerPage && (<Pagination postsPerPage={postsPerPage} totalPosts={projects} paginate={paginate} currentPage={currentPage} />)}
                    {currentPosts.map((project, index) => (    
                        <Project project={project} subtasks={project.subTaskID} key={index}  />
                    ))}
                    {projects.length > postsPerPage && (<Pagination postsPerPage={postsPerPage} totalPosts={projects} paginate={paginate} currentPage={currentPage} />)}
                </div>
            </div>
        </div>
    )
}

export default Dashboard