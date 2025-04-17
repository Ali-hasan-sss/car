import { setTableData } from "@/store/Reducers/tableDataReducer";
import { AppDispatch } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteMessage from "../messags/deleteMessage";
import DynamicForm from "../adminComponents/forms/DynamicForm";
import AnimatedModal from "../modal/AnimatedModal";
import { usePathname, useRouter } from "next/navigation";
import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import {
  Check,
  CheckCircle,
  Edit,
  EllipsisVertical,
  Eye,
  Trash,
  XCircle,
} from "lucide-react";

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
  accept?: boolean;
  reject?: boolean;
  finish?: boolean;
}

interface GeneralTableProps {
  columns: Column[];
  showing?: number;
  loading?: boolean;
  onTotalCountChange: (count: number) => void;
  sortBy?: string;
  searchTerm?: string;
  title?: string;
  AddButtonLabel?: string;
  apiUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any[];
  apiForForm?: string;
  actions?: ActionConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customEditForm?: (data: any, close: () => void) => React.ReactNode;
  onChangeStatus?: (id: number, type: "accept" | "reject" | "finish") => void;
  formColumns?: Column[];
}

type Order = "asc" | "desc";

const GeneralTable: React.FC<GeneralTableProps> = ({
  columns,
  title,
  AddButtonLabel,
  apiUrl,
  apiForForm,
  actions,
  initialData,
  showing,
  onTotalCountChange,
  sortBy,
  searchTerm,
  customEditForm,
  formColumns,
  onChangeStatus,
  loading: externalLoading,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [internalLoading, setInternalLoading] = useState(false);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [accept, setAccept] = useState<number | null>(null);
  const [reject, setReject] = useState<number | null>(null);
  const [finish, setFinish] = useState<number | null>(null);

  const [openForm, setOpenForm] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editData, setEditData] = useState<Record<string, any> | null>(null);
  const [localTableData, setLocalTableData] = useState<TableRow[]>(
    initialData || []
  );
  const [displayedData, setDisplayedData] = useState<TableRow[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  // تحميل البيانات عند تغيير apiUrl
  useEffect(() => {
    const fetchData = async () => {
      if (initialData) {
        setLocalTableData(initialData);
        onTotalCountChange(initialData.length);
        setCurrentPage(1);
        return;
      }

      setInternalLoading(true);
      try {
        const response = await axiosInstance.get(apiUrl);
        const fetchedData = response.data.data;
        dispatch(setTableData({ key: apiUrl, data: fetchedData }));
        setLocalTableData(fetchedData);
        onTotalCountChange(fetchedData.length);
        setCurrentPage(1);
      } catch (error) {
        console.error("❌ فشل جلب البيانات:", error);
      }
      setInternalLoading(false);
    };

    fetchData();
  }, [apiUrl, dispatch, initialData]);
  const statusMap: Record<number, { label: string; color: string }> = {
    0: { label: "مرفوض", color: "bg-red-500 text-white" },
    1: { label: "قيد الانتظار", color: "bg-yellow-600 text-white" },
    2: { label: "قيد التنفيذ", color: "bg-blue-600 text-white" },
    3: { label: "منجز", color: "bg-green-600 text-white" },
  };
  const typeMap: Record<number, { label: string; color: string }> = {
    1: { label: "شخصي", color: "bg-blue-500 text-white" },
    2: { label: "شركة", color: "bg-yellow-600 text-white" },
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
  // ترتيب البيانات
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortData = (data: any[], sortBy: string) => {
    const sorted = [...data];
    switch (sortBy) {
      case "date":
        sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "status":
        sorted.sort((a, b) => String(a.status).localeCompare(String(b.status)));
        break;
      case "model":
        sorted.sort((a, b) =>
          a.category.manufacturer.title.localeCompare(
            b.category.manufacturer.title
          )
        );
        break;
      default:
        break;
    }
    return sorted;
  };
  useEffect(() => {
    if (!Array.isArray(localTableData)) {
      setDisplayedData([]); // تعيين مصفوفة فارغة لتجنب الأخطاء
      return;
    }

    let processedData = [...localTableData];

    // ✅ فلترة فقط إذا تم تمرير searchTerm
    if (searchTerm && searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      processedData = processedData.filter((row) =>
        Object.values(row).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(lowerSearch);
          }
          if (typeof value === "number") {
            return value.toString().includes(lowerSearch);
          }
          if (typeof value === "object" && value !== null) {
            return JSON.stringify(value).toLowerCase().includes(lowerSearch);
          }
          return false;
        })
      );
    }

    // ✅ ترتيب فقط إذا تم تمرير sortBy
    if (sortBy) {
      processedData = sortData(processedData, sortBy);
    }

    // ✅ تقسيم البيانات المعالجة بناءً على الصفحة الحالية وعدد العناصر (إذا تم تمرير showing)
    if (showing) {
      const startIndex = (currentPage - 1) * showing;
      const sliced = processedData.slice(startIndex, startIndex + showing);
      setDisplayedData(sliced);
    } else {
      // في حال لم يتم تمرير showing، نعرض كل البيانات
      setDisplayedData(processedData);
    }
  }, [localTableData, sortBy, showing, currentPage, searchTerm]);

  // ترتيب البيانات عند النقر على عنوان العمود
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortedData = [...localTableData].sort((a: any, b: any) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });

    setLocalTableData(sortedData);
    // تحديث التخزين العام في حال لم تكن initialData
    if (!initialData) {
      dispatch(setTableData({ key: apiUrl, data: sortedData }));
    }
  };

  // دالة التعديل باستخدام نفس الرابط مع معرف السطر
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (rowData: any) => {
    setEditData(rowData);
    console.log(`data:${rowData}`);
    setOpenForm(true);
    handleMenuClose();
  };

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
    handleMenuClose();
  };
  const handleView = (id: number) => {
    router.push(`${pathname}/${id}`);
    handleMenuClose();
  };

  const handleDeleteSuccess = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedData = localTableData.filter((item: any) => item.id !== id);
    setLocalTableData(updatedData);
    if (!initialData) {
      dispatch(setTableData({ key: apiUrl, data: updatedData }));
    }
  };
  const handleAccept = (id: number) => {
    setAccept(id);
    console.log(accept);
    if (onChangeStatus) onChangeStatus(id, "accept");
    handleMenuClose();
  };

  const handleReject = (id: number) => {
    setReject(id);
    console.log(reject);
    if (onChangeStatus) onChangeStatus(id, "reject");
    handleMenuClose();
  };
  const handleFinish = (id: number) => {
    setFinish(id);
    console.log(finish);
    if (onChangeStatus) onChangeStatus(id, "finish");
    handleMenuClose();
  };
  // // التنقل بين الصفحات
  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };
  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        {title && (
          <div className="flex items-center justify-between w-full border border-secondary1 px-4 py-2">
            <h2 className="text-text_title">{title}</h2>

            <div className="flex items-center gap-3 bg-secondary1">
              {actions?.add && (
                <button
                  onClick={handleAdd}
                  className="button_outline px-4 py-2"
                >
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

            {displayedData && displayedData.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              displayedData.map((row: any, index: number) => (
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
                        ) : column.id === "type" ? (
                          <div
                            className={`px-2 py-[1px] w-[70px] rounded-full flex items-center justify-center text-[10px]  ${typeMap[value]?.color}`}
                          >
                            {typeMap[value]?.label || "غير معروف"}
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
                      <div className="flex items-center">
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, row.id)}
                        >
                          <EllipsisVertical className="text-gray-600 text-lg" />
                        </IconButton>

                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && selectedRow === row.id}
                          onClose={handleMenuClose}
                          PaperProps={{
                            style: { minWidth: "150px" }, // تعيين عرض القائمة
                          }}
                        >
                          {actions.view && (
                            <MenuItem onClick={() => handleView(row.id)}>
                              <Eye className="text-blue-500 mr-2" /> عرض
                              التفاصيل
                            </MenuItem>
                          )}
                          {actions.edit && (
                            <MenuItem
                              onClick={() => {
                                const simplifiedRow = {
                                  ...row,
                                  manufacturer:
                                    row.category?.manufacturer?.id || null,
                                  category_id: row.category?.id || null,
                                  cmodel_id: row.cmodel?.id || null,
                                  images:
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    row.images?.map((img: any) => img.image) ||
                                    [],
                                };

                                console.log("init:", simplifiedRow); // أو JSON.stringify للسلاسل
                                handleEdit(simplifiedRow);
                              }}
                            >
                              <Edit className="text-yellow-500 mr-2" /> تعديل
                            </MenuItem>
                          )}
                          {actions.delete && (
                            <MenuItem
                              onClick={() => {
                                setDeleteId(row.id);
                                setOpenDelete(true);
                                handleMenuClose();
                              }}
                            >
                              <Trash className="text-red-500 mr-2" /> حذف
                            </MenuItem>
                          )}
                          {actions.accept && (
                            <MenuItem
                              onClick={() => {
                                handleAccept(row.id);
                              }}
                            >
                              <CheckCircle className="text-green-500 mr-2" />{" "}
                              قبول
                            </MenuItem>
                          )}
                          {actions.reject && (
                            <MenuItem
                              onClick={() => {
                                handleReject(row.id);
                              }}
                            >
                              <XCircle className="text-red-500 mr-2" /> رفض
                            </MenuItem>
                          )}
                          {actions.finish && (
                            <MenuItem
                              onClick={() => {
                                handleFinish(row.id);
                              }}
                            >
                              <Check className="text-green-500 mr-2" /> تعيين ك
                              منجز
                            </MenuItem>
                          )}
                        </Menu>

                        {/* مكون حذف الطلب */}
                        <DeleteMessage
                          API={apiUrl}
                          open={openDelete}
                          handleClose={() => setOpenDelete(false)}
                          id={deleteId}
                          onDeleteSuccess={handleDeleteSuccess}
                        />
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
        {editData &&
          openForm &&
          (customEditForm ? (
            <Modal open={openForm} onClose={() => setOpenForm(false)}>
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%", // 80% من عرض الشاشة (يبقى 10% من الجوانب)
                  maxWidth: "1000px", // الحد الأقصى لعرض المودال
                  height: "80%", // 80% من ارتفاع الشاشة (يبقى 10% من الأعلى والأسفل)
                  maxHeight: "90vh", // ضمان عدم تجاوز الشاشة
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 3,
                  borderRadius: "8px",
                  overflowY: "auto", // السماح بالتمرير عند زيادة المحتوى
                  outline: "none",
                }}
              >
                {customEditForm(editData, () => setOpenForm(false))}
              </Box>
            </Modal>
          ) : (
            <AnimatedModal
              open={openForm}
              handleClose={() => setOpenForm(false)}
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
          ))}
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
      {/* <Pagination totalPages={totalPages} onPageChange={handlePageChange} /> */}
    </div>
  );
};

export default GeneralTable;
