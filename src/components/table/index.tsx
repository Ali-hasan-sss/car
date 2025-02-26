// @ts-nocheck
/* eslint-disable */

import { setTableData } from "@/store/Reducers/tableDataReducer";
import { AppDispatch } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectTableData } from "../../store/selectors/tableSelectors";

interface Column {
  id: string;
  label: string;
  type?: "image" | "text"; // نوع البيانات
  languageDisplay: "both" | "en" | "ar";
}
interface TableRow {
  id: number;
  data: {
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    body: { en: string; ar: string };
    image: string;
  };
}

interface ActionConfig {
  edit?: boolean;
  delete?: boolean;
  share?: boolean;
  view?: boolean;
  onEdit?: (row: TableRow) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onShare?: (id: number) => void;
}

interface GeneralTableProps {
  columns: Column[];
  apiUrl: string;
  actions?: ActionConfig;
  details?: boolean;
}

type Order = "asc" | "desc";

const GeneralTable: React.FC<GeneralTableProps> = ({
  columns,
  apiUrl,
  actions,
  details,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const selectTableData = useMemo(() => makeSelectTableData(apiUrl), [apiUrl]);
  const tableData = useSelector(selectTableData);
  // تحميل البيانات عند تغيير apiUrl
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(apiUrl); // استدعاء API باستخدام Axios
        dispatch(setTableData({ key: apiUrl, data: response.data.data })); // تخزين البيانات
      } catch (error) {
        console.error("❌ فشل جلب البيانات:", error);
      }
    };

    fetchData();
  }, [apiUrl, dispatch]);

  // ترتيب البيانات عند النقر على عنوان العمود
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    const sortedData = [...tableData].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });

    dispatch(setTableData({ key: apiUrl, data: sortedData }));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  {column.label}
                  {column.type !== "image" && (
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
                  )}
                </div>
              </th>
            ))}
            {actions && <th className="px-6 py-3">Actions</th>}
            {details && <th className="px-6 py-3"></th>}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row: any, index: number) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b`}
              >
                {columns.map((column) => (
                  <td key={column.id} className="px-6 py-4">
                    {column.type === "image" ? (
                      <img
                        src={row[column.id]}
                        alt={column.label}
                        className="w-10 h-10 rounded-md"
                      />
                    ) : row[column.id] && typeof row[column.id] === "object" ? (
                      row[column.id].en && row[column.id].ar ? (
                        column.languageDisplay === "both" ? (
                          `${row[column.id].en} / ${row[column.id].ar}`
                        ) : column.languageDisplay === "en" ? (
                          row[column.id].en
                        ) : (
                          row[column.id].ar
                        )
                      ) : (
                        JSON.stringify(row[column.id]) // عرض البيانات كـ JSON إن لم تكن كائنًا نصيًا
                      )
                    ) : (
                      row[column.id] ?? "غير متوفر"
                    )}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {actions.delete && (
                        <button onClick={() => actions.onDelete?.(row.id)}>
                          <img
                            src="/images/redtrash.png"
                            width={14}
                            alt="delete"
                          />
                        </button>
                      )}
                      {actions.edit && (
                        <button
                          onClick={() => {
                            if (!row || !row.data) {
                              console.error(
                                "❌ البيانات غير متوفرة أو غير صالحة:",
                                row
                              );
                              return;
                            }
                            actions.onEdit?.(row);
                          }}
                        >
                          <img src="/images/edit.png" width={14} alt="edit" />
                        </button>
                      )}

                      {actions.view && (
                        <button onClick={() => actions.onView?.(row.id)}>
                          <img src="/images/eye.png" width={14} alt="view" />
                        </button>
                      )}
                      {actions.share && (
                        <button onClick={() => actions.onShare?.(row.id)}>
                          <img src="/images/share.png" width={14} alt="share" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
                {details && (
                  <td className="px-6 py-4">
                    <button>
                      <img src="/images/list.png" alt="list" />
                    </button>
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
    </div>
  );
};

export default GeneralTable;
