// tests/adminsReducer.test.ts
import adminsReducer from "../../store/Reducers/adminsReducer";
import {
  fetchAdminsSuccess,
  selectAdmin,
} from "./../../store/Actions/adminsActions";

describe("adminsReducer", () => {
  it("should handle FETCH_ADMINS_SUCCESS", () => {
    const initialState = { adminsList: [], selectedAdmin: null };
    const action = fetchAdminsSuccess([
      { id: 1, first_name: "John", last_name: "Doe" },
      { id: 2, first_name: "Jane", last_name: "Smith" },
    ]);
    const newState = adminsReducer(initialState, action);
    expect(newState.adminsList.length).toBe(2);
  });

  it("should handle SELECT_ADMIN", () => {
    const initialState = { adminsList: [], selectedAdmin: null };
    const action = selectAdmin({ id: 1, first_name: "John", last_name: "Doe" });
    const newState = adminsReducer(initialState, action);
    expect(newState.selectedAdmin?.first_name).toBe("John");
  });
});
