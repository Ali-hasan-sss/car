import { createSelector } from "reselect";
import { RootState } from "../store"; // تأكد أن المسار صحيح

// تحديد الـ state الأساسي للجدول
const selectTableState = (state: RootState) => state.tableData;

// إنشاء Selector ديناميكي بناءً على `apiUrl`
export const makeSelectTableData = (apiUrl: string) =>
  createSelector([selectTableState], (tableData) => tableData[apiUrl] || []);
