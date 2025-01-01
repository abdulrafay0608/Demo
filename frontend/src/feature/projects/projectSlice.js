import { createSlice } from "@reduxjs/toolkit";
import {
  AddProjectsAction,
  GetAllProjectsAction,
  GetSingleProjectAction,
  GetUserProjectsAction,
  UpdateProjectStatusAction,
} from "../../actions/projectsAction";

const initialState = {
  allProjects: [],
  singleProject: null,
  userProjects: null,
  loading: false,
  error: null,
};

const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handleError = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    builder
      .addCase(AddProjectsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddProjectsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjects = [...state.allProjects, action.payload.project];
      })
      .addCase(AddProjectsAction.rejected, handleError)

      .addCase(GetAllProjectsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllProjectsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjects = action.payload.projects;
      })
      .addCase(GetAllProjectsAction.rejected, handleError)

      .addCase(GetSingleProjectAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetSingleProjectAction.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProject = action.payload.project;
      })
      .addCase(GetSingleProjectAction.rejected, handleError)

      .addCase(GetUserProjectsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUserProjectsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload.projects;
      })
      .addCase(GetUserProjectsAction.rejected, handleError)

      .addCase(UpdateProjectStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateProjectStatusAction.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProject = action.payload.project;
      })
      .addCase(UpdateProjectStatusAction.rejected, handleError);

    //   .addCase(EditTicketAction.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(EditTicketAction.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.allTickets = state.allTickets.map((ticket) =>
    //       ticket._id === action.payload.ticket._id
    //         ? action.payload.ticket
    //         : ticket
    //     );
    //   })
    //   .addCase(EditTicketAction.rejected, handleError)

    //   .addCase(DeleteTicketAction.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(DeleteTicketAction.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.allTickets = state.allTickets.filter(
    //       (ticket) => ticket._id !== action.payload.ticket._id
    //     );
    //   })
    //   .addCase(DeleteTicketAction.rejected, handleError);
  },
});

export const { clearError } = ProjectSlice.actions;
export default ProjectSlice.reducer;
