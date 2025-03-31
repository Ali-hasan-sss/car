"use client";
import TableHeader from "@/components/DashboardComponernt/titleBar/tableHeader";
import ToolBar from "@/components/DashboardComponernt/toolbar";
import Search_input from "@/components/inputs/search_input";
//import CustomPagination from "@/components/pagination/extrnalPagenation";
import GeneralTable, { Column } from "@/components/table";
import { useAppDispatch } from "@/store/Reducers/hooks";
import { fetchUsers } from "@/store/slice/userSlice";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Users: React.FC = () => {
  const columns: Column[] = [
    {
      id: "name",
      label: "الاسم",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "email",
      label: "الايميل",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "contact.mobile",
      label: "رقم الهاتف",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "type",
      label: "نوع الحساب",
      languageDisplay: "en",
      includeInForm: false,
    },
  ];
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showing, setShowing] = useState(10);
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const apiUrl = "admin/users";
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [actions] = useState({
    edit: false,
    add: true,
    delete: true,
    view: true,
  });
  if (error) return <p>حدث خطأ: {error}</p>;
  return (
    <div>
      <TableHeader
        title={"المستخدمين"}
        action={{
          filter: false,
          export: true,
          add: true,
          addNewActiom: () => console.log(true),
        }}
      />
      <Search_input value={searchTerm} onChange={setSearchTerm} />
      <ToolBar
        showing={showing}
        onShowingChange={setShowing}
        totalItems={totalCount}
      />
      <GeneralTable
        columns={columns}
        apiUrl={apiUrl}
        actions={actions}
        onTotalCountChange={setTotalCount}
        showing={showing}
        searchTerm={searchTerm}
        initialData={users}
        loading={loading}
      />
      {/*<CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />*/}
    </div>
  );
};

export default Users;
