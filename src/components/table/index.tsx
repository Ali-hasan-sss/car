import { setTableData } from "@/store/Reducers/tableDataReducer";
import { AppDispatch } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectTableData } from "../../store/selectors/tableSelectors";
import DeleteMessage from "../messags/deleteMessage";
import DynamicForm from "../adminComponents/forms/DynamicForm";
import AnimatedModal from "../modal/AnimatedModal";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export interface Column {
  id: string;
  label: string;
  languageDisplay: "both" | "en" | "ar";
}
interface TableRow {
  id: number;
  [key: string]: string | number;
}
interface ActionConfig {
  delete?: boolean;
  edit?: boolean;
  add?: boolean;
  view?: (id: number) => void; // Function to handle view action
  share?: (id: number) => void;
}

interface GeneralTableProps {
  columns: Column[];
  title: string;
  AddButtonLabel?: string;
  apiUrl: string;
  actions?: ActionConfig;
}

type Order = "asc" | "desc";

const GeneralTable: React.FC<GeneralTableProps> = ({
  columns,
  title,
  AddButtonLabel,
  apiUrl,
  actions,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editData, setEditData] = useState<Record<string, any> | null>(null);
  const selectTableData = useMemo(() => makeSelectTableData(apiUrl), [apiUrl]);
  const tableData = useSelector(selectTableData) as TableRow[];

  // تحميل البيانات عند تغيير apiUrl
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(apiUrl); // جلب البيانات
        dispatch(setTableData({ key: apiUrl, data: response.data.data })); // تخزين البيانات
      } catch (error) {
        console.error("❌ فشل جلب البيانات:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [apiUrl, dispatch]);

  // ترتيب البيانات عند النقر على عنوان العمود
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortedData = [...tableData].sort((a: any, b: any) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });

    dispatch(setTableData({ key: apiUrl, data: sortedData }));
  };

  // دالة التعديل باستخدام نفس الرابط مع معرف السطر
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (rowData: any) => {
    setEditData(rowData);
    console.log(`data:${rowData}`);
    setOpenForm(true);
  };
  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleDeleteSuccess = (id: number) => {
    dispatch(
      setTableData({
        key: apiUrl,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: tableData.filter((item: any) => item.id !== id),
      })
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between w-full border border-secondary1 px-4 py-2">
        <h2 className="text-text_title">{title}</h2>

        <div className="flex items-center gap-3 bg-secondary1">
          {actions?.add && (
            <button onClick={handleAdd} className="button_outline px-4 py-2">
              {AddButtonLabel}
            </button>
          )}
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  {column.label}
                  <button
                    onClick={() => handleSort(column.id)}
                    className="ml-2"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </div>
              </th>
            ))}
            {actions && <th className="px-6 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-6 py-2"
              >
                <div className="h-1 w-full bg-gray-300 relative overflow-hidden">
                  <div className="absolute h-1 bg-blue-500 animate-loadingBar"></div>
                </div>
              </td>
            </tr>
          )}

          {tableData.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            tableData.map((row: any, index: number) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b`}
              >
                {columns.map((column) => (
                  <td key={column.id} className="px-6 py-4">
                    {row[column.id] ?? "غير متوفر"}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {actions.delete && (
                        <>
                          <button
                            onClick={() => {
                              console.log("حذف العنصر بمعرف:", row.id);
                              setDeleteId(row.id);
                              setOpenDelete(true);
                            }}
                          >
                            <FaTrash className="text-red-500 text-lg mx-2" />
                          </button>
                          <DeleteMessage
                            API={apiUrl}
                            open={openDelete}
                            handleClose={() => setOpenDelete(false)}
                            id={deleteId}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                        </>
                      )}
                      {actions.edit && (
                        <button onClick={() => handleEdit(row)}>
                          <FaEdit className="text-yellow-500 text-lg mx-2" />
                        </button>
                      )}
                      {actions.view && (
                        <button onClick={() => actions.view?.(row.id)}>
                          <FaEye className="text-blue-500 text-lg mx-2" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                لا توجد بيانات متاحة
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <AnimatedModal
        open={openForm}
        handleClose={() => setOpenForm(false)}
        className="w-[400px]"
      >
        <DynamicForm
          key={editData?.id || "new"}
          open={openForm}
          onClose={() => setOpenForm(false)}
          apiUrl={apiUrl}
          fields={columns}
          initialData={editData}
        />
      </AnimatedModal>
      <style jsx>{`
        @keyframes loadingBar {
          0% {
            left: -100%;
            width: 0;
          }
          50% {
            left: 50%;
            width: 50%;
          }
          100% {
            left: 100%;
            width: 0;
          }
        }
        .animate-loadingBar {
          animation: loadingBar 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default GeneralTable;
