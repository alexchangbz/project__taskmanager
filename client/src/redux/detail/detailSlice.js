import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import detailService from './detailService';

const initialState = {
    detail: {name: "", description: "", projectID: "" , subTaskID: [], status: ""},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getProject = createAsyncThunk('projects/getByID', async (projectID, thunkAPI) => {
    try {
        return detailService.getProject(projectID)
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.detail = action.payload
            })
            .addCase(getProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = detailSlice.actions
export default detailSlice.reducer