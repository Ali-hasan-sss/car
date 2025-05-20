"use client";
import CmodelForm from "@/components/forms/carForms/carModelsForm";
import CategoryForm from "@/components/forms/carForms/CategoryForm";
import Loader from "@/components/loading/loadingPage";
import DeleteMessage from "@/components/messags/deleteMessage";
import AnimatedModal from "@/components/modal/AnimatedModal";
import { useLanguage } from "@/context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/store/Reducers/hooks";
import {
  deleteCarModel,
  deleteCategory,
  fetchManufacturer,
} from "@/store/slice/adminManufacturerSlice";
import { category } from "@/Types/adminTypes";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

interface CModel {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}
interface CModelProps {
  id: number;
}

export default function CModel({ id }: CModelProps) {
  const { t } = useLanguage();
  const { manufacturer, loading, error } = useAppSelector(
    (state) => state.adminManufacturer
  );
  const [modalOpen, setModalOpen] = useState("");
  const [isNew, setisNew] = useState(false);
  const [apiUrlForm, setApiUrlForm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletId, setDeletId] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editData, setEditData] = useState<Record<string, any> | null>(null);

  const [category_id, setcategory_id] = useState(0);
  const dispatch = useAppDispatch();
  const apiUrl = {
    getAll: `admin/manufacturers/${id}`,
    addCategory: `admin/categories`,
    editCategory: `admin/categories`,
    addModel: `admin/cmodels`,
    editModel: `admin/cmodels`,
  };

  useEffect(() => {
    if (id !== 0) {
      dispatch(fetchManufacturer(id));
    }
  }, [dispatch, id]);

  const toggleAccordion = (categoryId: number) => {
    setActiveCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCategory = () => {
    setisNew(true);
    setEditData(null);
    setModalOpen("category");
    setApiUrlForm(apiUrl.addCategory);
  };

  const handleEditCategory = (category: category) => {
    setisNew(false);
    setApiUrlForm(apiUrl.editCategory);
    setEditData(category);
    setModalOpen("category");
  };

  const handleDeleteCategory = (categoryId: number) => {
    setApiUrlForm(apiUrl.editCategory);
    setOpenDelete(true);
    setDeletId(categoryId);
  };

  const handleAddModel = () => {
    setisNew(true);
    setApiUrlForm(apiUrl.addModel);
    setModalOpen("model");
  };

  const handleEditModel = (model: CModel) => {
    setApiUrlForm(apiUrl.editModel);
    setisNew(false);
    setEditData(model);
    setModalOpen("model");
  };

  const handleDeleteModel = (modelId: number) => {
    setApiUrlForm(apiUrl.editModel);
    setOpenDelete(true);
    setDeletId(modelId);
  };
  const handleDeleteSuccess = () => {
    if (apiUrlForm.includes("categories")) {
      // حذف فئة
      dispatch(deleteCategory(deletId));
    } else if (apiUrlForm.includes("models")) {
      // حذف موديل - تحتاج معرفة categoryId
      dispatch(deleteCarModel({ categoryId: category_id, modelId: deletId }));
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) return <p>حدث خطأ: {error}</p>;
  if (!manufacturer)
    return (
      <div className="flex items-center justify-center">
        {t("choies_manefacturar")}
      </div>
    );
  const filteredCategories = manufacturer.categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-[900px] mx-auto">
      <div className=" flex flex-col mb-4 md:flex-row md:items-center justify-between py-2 gap-2">
        <h1 className="text-xl font-bold text-gray-800">
          {manufacturer.title}
        </h1>

        <div className="flex items-center gap-2  md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-primary1  "
          />
          <button
            className="button_outline py-1 px-2 whitespace-nowrap"
            onClick={handleAddCategory}
          >
            {t("add_new_model")}
          </button>
        </div>
      </div>
      {id === 0 ? (
        <div className=" h-[200px] overflow-y-auto ">
          {t("choies_manefacturar")}
        </div>
      ) : (
        <div className=" h-[200px] overflow-y-auto ">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.id} className="mb-4 rounded-lg shadow">
                <div className="flex items-center justify-between px-2 bg-secondary1 rounded-lg hover:bg-gray-200 transition duration-200">
                  <button
                    onClick={() => toggleAccordion(category.id)}
                    className="text-left px-4 py-3 font-semibold w-full"
                  >
                    {category.title}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        handleEditCategory(category);
                        // console.log(category);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                {activeCategoryId === category.id && (
                  <div className="p-4 bg-white border-t">
                    {Array.isArray(category.cmodels) &&
                    category.cmodels.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {category.cmodels.map((model) => (
                          <li
                            key={model.id}
                            className="text-gray-700 flex border-b items-center justify-between"
                          >
                            <span>{model.title}</span>
                            <div className="flex items-center gap-2">
                              <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => {
                                  handleEditModel(model);
                                  setcategory_id(category.id);
                                }}
                              >
                                <FiEdit size={13} />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() => {
                                  handleDeleteModel(model.id);
                                  setcategory_id(category.id);
                                }}
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          </li>
                        ))}
                        <li className="text-gray-700 w-full flex items-center justify-center flex mt-2">
                          <button
                            className="text-green-600 p-1 rounded-full bg-gray-200  hover:text-green-800"
                            onClick={() => {
                              setEditData(null);
                              handleAddModel();
                              setcategory_id(category.id);
                            }}
                          >
                            <FiPlus className="text-xl font-bold text-center" />
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <div>
                        <p className="text-gray-500">
                          {t("No_model_avilable")}
                        </p>{" "}
                        <button
                          className="text-green-600 p-1 rounded-full bg-gray-200  hover:text-green-800"
                          onClick={() => {
                            setEditData(null);
                            handleAddModel();
                            setcategory_id(category.id);
                          }}
                        >
                          <FiPlus className="text-xl font-bold text-center" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">
              {t("No_search_result")}
            </div>
          )}
        </div>
      )}
      <AnimatedModal
        open={modalOpen === "category" || modalOpen === "model"}
        handleClose={() => setModalOpen("")}
        className="w-[400px]"
      >
        {modalOpen === "category" && (
          <CategoryForm
            Api={apiUrlForm}
            isNew={isNew}
            onClose={() => setModalOpen("")}
            manufacturer_id={id}
            initialData={editData as category | null}
          />
        )}

        {modalOpen === "model" && (
          <CmodelForm
            Api={apiUrlForm}
            isNew={isNew}
            onClose={() => {
              setModalOpen("");
            }}
            category_id={category_id}
            initialData={editData as CModel | null}
          />
        )}
      </AnimatedModal>

      <DeleteMessage
        API={apiUrlForm}
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        id={deletId}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
