import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectService from './projectService';

const initialState = {
    projects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get Projects
export const getProjects = createAsyncThunk('projects/getAll', async (_, thunkAPI) => {
    try {
        return await projectService.getProjects()
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Create Project
export const createProject = createAsyncThunk('projects/create', async (projectData, thunkAPI) => {
    try {
        return await projectService.createProject(projectData)
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Edit Project
export const editProject = createAsyncThunk('projects/edit', async (projectData, thunkAPI) => {
    try {
        console.log(projectData, "PROJECT DATA")
        return await projectService.editProject(projectData)
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Projects
export const deleteProject = createAsyncThunk('projects/delete', async (id, thunkAPI) => {
    try {
        return await projectService.deleteProject(id)
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = action.payload.reverse()
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects.unshift(action.payload)
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.projects = state.projects.filter((project) => project._id !== action.payload.id)
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(editProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer