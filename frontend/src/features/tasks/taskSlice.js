import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  assignedTasks: [],
  isError: false,
  isReceivedSuccessfully: false,
  isLoading: false,
  message: "",
  isDeletedSuccessfully: false,
  isUpdatedSuccessfully: false,
  isCreatedSuccessfully: false,
};

// Create new task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user tasks
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTasks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get assigned user tasks
export const getAssignedTasks = createAsyncThunk(
  "tasks/getAssignedTasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getAssignedTasks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.updateTask(taskData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.deleteTask(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      isError: false,
      isReceivedSuccessfully: false,
      isLoading: false,
      message: "",
      isDeletedSuccessfully: false,
      isUpdatedSuccessfully: false,
      isCreatedSuccessfully: false,
    }),
    fullReset: () => ({
      tasks: [],
      assignedTasks: [],
      isError: false,
      isReceivedSuccessfully: false,
      isLoading: false,
      message: "",
      isDeletedSuccessfully: false,
      isUpdatedSuccessfully: false,
      isCreatedSuccessfully: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreatedSuccessfully = true;
        state.tasks.push(action.payload);
        if (
          action.payload.users.find((user) => user.id === action.payload.user)
        ) {
          state.assignedTasks.push(action.payload);
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReceivedSuccessfully = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAssignedTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignedTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReceivedSuccessfully = true;
        state.assignedTasks = action.payload;
      })
      .addCase(getAssignedTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeletedSuccessfully = true;
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload._id
        );
        state.assignedTasks = state.assignedTasks.filter(
          (task) => task._id !== action.payload._id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdatedSuccessfully = true;
        const indexOfTask = state.tasks.findIndex(
          (ele) => ele._id === action.payload._id
        );
        if (indexOfTask > -1) {
          state.tasks.splice(indexOfTask, 1, action.payload);
        }
        const indexOfAssignedTask = state.assignedTasks.findIndex(
          (ele) => ele._id === action.payload._id
        );
        if (indexOfAssignedTask > -1) {
          state.assignedTasks.splice(indexOfAssignedTask, 1, action.payload);
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, fullReset } = taskSlice.actions;
export default taskSlice.reducer;
