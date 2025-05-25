"use client";
import TableHeader from "@/components/common/titleBar/tableHeader";
import ToolBar from "@/components/common/toolbar";
// import UserForm from "@/components/forms/UserForm";
import Search_input from "@/components/inputs/search_input";
import CustomPagination from "@/components/pagination/extrnalPagenation";
// import AnimatedModal from "@/components/modal/AnimatedModal";
//import CustomPagination from "@/components/pagination/extrnalPagenation";
import GeneralTable, { Column } from "@/components/table";
import { useLanguage } from "@/context/LanguageContext";
import { useAppDispatch } from "@/store/Reducers/hooks";
import { fetchUsers } from "@/store/slice/userSlice";
import { RootState } from "@/store/store";
// import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "sonner";

const Users: React.FC = () => {
  const { t } = useLanguage();
  const columns: Column[] = [
    {
      id: "name",
      label: "Full_Name",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "email",
      label: "email",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "contact.mobile",
      label: "Phone_NO",
      languageDisplay: "en",
      includeInForm: true,
    },
    {
      id: "type",
      label: "Account_type",
      languageDisplay: "en",
      includeInForm: false,
    },
  ];
  const [totalCount, setTotalCount] = useState(0);
  // const [openModal, setOpenModal] = useState(false);
  // const [Loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showing, setShowing] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { users, loading, totalPages, error } = useSelector(
    (state: RootState) => state.users
  );
  const apiUrl = `admin/users`;
  useEffect(() => {
    const apiUrl = `admin/users?page_size=${showing}&page=${currentPage}`;
    dispatch(fetchUsers(apiUrl));
  }, [dispatch, currentPage, showing]);

  console.log("users:", users);

  const [actions] = useState({
    edit: false,
    add: true,
    delete: true,
    view: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const InitialData = {
  //   email: "",
  //   type: 1,
  //   name: "",
  //   user_id: "",
  //   mobile: "",
  //   other_mobile: "",
  //   country_id: null,
  //   language: "",
  //   address1: "",
  //   address2: "",
  //   city: "",
  //   zip_code: "",
  //   id_number: "",
  //   id_file: "",
  //   passport_file: "",
  //   tax_info: "",
  //   cr_certificate: "",
  // };
  // const onSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axiosInstance.post(apiUrl);
  //     if (res.data.success) {
  //       toast.success(t("add_new_user_success"));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(t("Error"));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (error) return <p>حدث خطأ: {error}</p>;
  return (
    <div>
      <TableHeader
        title={t("Users")}
        action={{
          filter: false,
          export: true,
        }}
      />
      <Search_input value={searchTerm} onChange={setSearchTerm} />
      <ToolBar
        showing={showing}
        onShowingChange={setShowing}
        totalItems={totalCount}
      />
      <GeneralTable
        actionLoading={[0]}
        columns={columns}
        apiUrl={apiUrl}
        actions={actions}
        onTotalCountChange={setTotalCount}
        showing={showing}
        searchTerm={searchTerm}
        initialData={users}
        loading={loading}
      />
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Users;
