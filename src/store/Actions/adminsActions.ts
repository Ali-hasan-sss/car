import { Admin, AdminAction } from "./../../Types/adminTypes";

export const fetchAdminsSuccess = (admins: Admin[]): AdminAction => ({
  type: "FETCH_ADMINS_SUCCESS",
  payload: admins,
});

export const selectAdmin = (admin: Admin): AdminAction => ({
  type: "SELECT_ADMIN",
  payload: admin,
});
