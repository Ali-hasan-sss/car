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
import { usePathname, useRouter } from "next/navigation";

export interface Column {
  id: string;
  label: string;
  languageDisplay: "both" | "en" | "ar";
  includeInForm?: boolean;
  formOnly?: boolean;
}

interface TableRow {
  id: number;
  [key: string]: string | number;
}

interface ActionConfig {
  delete?: boolean;
  edit?: boolean;
  add?: boolean;
  view?: boolean;
}

interface GeneralTableProps {
  columns: Column[];
  title?: string;
  AddButtonLabel?: string;
  apiUrl: string;
  apiForForm?: string;
  actions?: ActionConfig;
  formColumns?: Column[]; // خاصية جديدة لاختيار الأعمدة التي يتم تمريرها إلى الفورم
}

type Order = "asc" | "desc";

const GeneralTable: React.FC<GeneralTableProps> = ({
  columns,
  title,
  AddButtonLabel,
  apiUrl,
  apiForForm,
  actions,
  formColumns,
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
  const router = useRouter();
  const pathname = usePathname();
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
  // يمكن وضعها خارج الجدول أو في ملف منفصل
  const statusMap: Record<number, { label: string; color: string }> = {
    0: { label: "محذوف", color: "bg-erd-500 text-white" },
    1: { label: "قيد الانتظار", color: "bg-yellow-600 text-white" },
    2: { label: "قيد التنفيذ", color: "bg-blue-600 text-white" },
    3: { label: "منجز", color: "bg-green-600 text-white" },
  };
  const formatDateTime = (dateString: string): string => {
    if (!dateString) return "غير متوفر";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => {
      if (acc && Array.isArray(acc)) {
        // إذا كانت القيمة مصفوفة، نحاول إيجاد العنصر الذي نبحث عنه
        const index = parseInt(part, 10);

        // إذا كان المسار يشير إلى فهرس داخل المصفوفة، نرجع العنصر في ذلك الفهرس
        if (!isNaN(index)) {
          return acc[index]; // الوصول إلى العنصر باستخدام الفهرس
        }

        // إذا كان المسار يشير إلى اسم خاصية، نرجع جميع العناصر في المصفوفة بشكل مفصل
        return acc.map((item) => item[part]); // معالجة العناصر في المصفوفة مع نفس المفتاح
      }

      // إذا كان الكائن يحتوي على الخاصية المطلوبة
      return acc && acc[part];
    }, obj);
  };

  const formFields = columns.filter((col) => col.includeInForm);
  const tableColumns = columns.filter((col) => !col.formOnly);

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
  const handleView = (id: number) => {
    router.push(`${pathname}/${id}`);
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      {title && (
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
      )}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
          <tr>
            {tableColumns.map((column) => (
              <th key={column.id} scope="col" className="px-6 py-3">
                <div className="flex items-center text-center">
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
                } border-b text-[11px]`} // تصغير الخط هنا
              >
                {tableColumns.map((column) => {
                  const value = getNestedValue(row, column.id);
                  return (
                    <td key={column.id} className="px-3 py-4 text-[10px]">
                      {" "}
                      {/* تقليل البادينغ */}
                      {column.id === "status" ? (
                        <div
                          className={`px-2 py-[1px] w-[70px] rounded-full flex items-center justify-center text-[10px]  ${statusMap[value]?.color}`}
                        >
                          {statusMap[value]?.label || "غير معروف"}
                        </div>
                      ) : column.id === "created_at" ? (
                        <div className="text-[10px]">
                          {formatDateTime(value)}
                        </div>
                      ) : (
                        <div className="text-[10px]">
                          {value ?? "غير متوفر"}
                        </div>
                      )}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-2 py-1">
                    {" "}
                    {/* تقليل البادينغ */}
                    <div className="flex items-center gap-3">
                      {actions.delete && (
                        <>
                          <button
                            onClick={() => {
                              setDeleteId(row.id);
                              setOpenDelete(true);
                            }}
                          >
                            <FaTrash className="text-red-500 text-base" />
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
                          <FaEdit className="text-yellow-500 text-base" />
                        </button>
                      )}
                      {actions.view && (
                        <button onClick={() => handleView(row.id)}>
                          <FaEye className="text-blue-500 text-base" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-[11px]"
              >
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
          apiUrl={apiForForm ? apiForForm : apiUrl}
          fields={formColumns ? formColumns : formFields}
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
