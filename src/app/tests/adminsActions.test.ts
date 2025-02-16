// tests/adminsActions.test.ts
import {
  fetchAdminsSuccess,
  selectAdmin,
} from "./../../store/Actions/adminsActions";

describe("adminsActions", () => {
  it("should create an action to fetch admins", () => {
    const payload = [{ id: 1, first_name: "John", last_name: "Doe" }];
    const action = fetchAdminsSuccess(payload);
    expect(action.type).toBe("FETCH_ADMINS_SUCCESS");
    expect(action.payload).toEqual(payload);
  });

  it("should create an action to select an admin", () => {
    const admin = { id: 1, first_name: "John", last_name: "Doe" };
    const action = selectAdmin(admin);
    expect(action.type).toBe("SELECT_ADMIN");
    expect(action.payload).toEqual(admin);
  });
});
