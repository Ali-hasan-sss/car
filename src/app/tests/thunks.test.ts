import { fetchAdmins } from "../../store/Actions/thunks";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import adminSlice from "../../store/Reducers/adminsReducer"; // Assuming your adminsReducer is created using createSlice
import { Admin } from "../../Types/adminTypes";

jest.mock("axios");

describe("fetchAdmins thunk", () => {
  it("dispatches FETCH_ADMINS_SUCCESS and updates the state with correct data", async () => {
    const mockAdmins: Admin[] = [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        is_active: true,
      },
      {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        is_active: false,
      },
    ];

    // Mocking the axios.get to return mockAdmins
    (axios.get as jest.Mock).mockResolvedValue({ data: mockAdmins });

    // Create a store using the reducer from your slice
    const store = configureStore({
      reducer: {
        admins: adminSlice.reducer,
      },
    });

    // Dispatch the thunk to fetch admins
    await store.dispatch(fetchAdmins());

    // Get the current state after dispatching the action
    const state = store.getState();
    expect(state.admins.adminsList).toEqual(mockAdmins); // Verify the state was updated correctly
  });

  it("handles errors gracefully", async () => {
    // Mocking axios to reject the request
    (axios.get as jest.Mock).mockRejectedValue(new Error("API error"));

    const store = configureStore({
      reducer: {
        admins: adminSlice.reducer,
      },
    });

    await store.dispatch(fetchAdmins());

    const state = store.getState();
    expect(state.admins.adminsList).toEqual([]); // Make sure the list remains empty after error
  });
});
