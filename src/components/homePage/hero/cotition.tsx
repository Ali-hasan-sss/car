import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import TextSelector from "../../inputs/selectors/text_selector";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Textarea from "@/components/inputs/Textarea";
import axiosInstance from "@/utils/axiosInstance";
import { Switch } from "@mui/material";
import { toast } from "sonner";
import { selectBlog, updateBlog } from "@/store/Reducers/blogsReducer";
import LoadingBTN from "@/components/loading/loadingBTN";
import { setHeroImages } from "@/store/slice/heroSlice";
import Loader from "@/components/loading/loadingPage";

export default function Cotation() {
  const { t, isArabic } = useLanguage();
  const userRole = useSelector((state: RootState) => state.auth.user?.userRole);
  const items = [
    { src: "/images/sedan.png", alt: "sedan", label: "Car" },
    { src: "/images/pickup-truck.png", alt: "pickup-truck", label: "Pickup" },
    { src: "/images/suv.png", alt: "SUV", label: "SUV" },
    { src: "/images/van.png", alt: "bus", label: "van" },
  ];
  const [isArabice, setIsArabic] = useState(true);
  const [car, setCar] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shippingPort, setShippingPort] = useState("");
  const RLM = "\u200F"; // Right-To-Left Mark
  const dispatch = useDispatch();
  const message = `المستخدم ذو البريد الإلكتروني ${RLM}(${email})${RLM} يطلب الحصول على عرض سعر لشحن سيارة من فئة ${RLM}"${car}"${RLM} من ${RLM}"${shippingPort}"${RLM} إلى ${RLM}"${address}"${RLM}.`;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const pathName = window.location.pathname;
  const isDashboard = pathName.includes("dashboard");
  const heroInfo = useSelector((state: RootState) => state.blogs.selectedBlog);
  const [userHero, setUserHero] = useState({
    title: "",
    description: "",
  });
  type LocalizedString = string | { ar: string; en: string } | undefined;

  function getLocalized(value: LocalizedString, lang: "ar" | "en"): string {
    if (!value) return "";
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return parsed?.[lang] ?? "";
      } catch {
        return value;
      }
    }
    return value[lang];
  }
  //fetch blog for admin
  useEffect(() => {
    const fetchBlog = async () => {
      setLoadingPage(true);
      try {
        const response = await axiosInstance.get("/admin/blogs/31");
        dispatch(selectBlog(response.data.data));
      } catch (error) {
        console.error("فشل جلب المقالات", error);
      } finally {
        setLoadingPage(false);
      }
    };
    if (isDashboard) fetchBlog();
  }, [dispatch]);
  //fetch blog for user
  useEffect(() => {
    const fetchBlog = async () => {
      setLoadingPage(true);
      try {
        const response = await axiosInstance.get(
          `${userRole === "ADMIN" ? "admin" : "customer"}/blogs/31`
        );
        const title = response.data.data.title;
        const description = response.data.data.description;
        const images = response.data.data.images;
        const imageUrls = images.map((img: { image: string }) => img.image);
        setUserHero({
          title: title,
          description: description,
        });
        dispatch(setHeroImages(imageUrls));
      } catch (error) {
        console.error("فشل جلب المقالات", error);
      } finally {
        setLoadingPage(false);
      }
    };
    fetchBlog();
  }, [dispatch, isArabic]);

  //validate form for user cotetion
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!car) newErrors.car = "select car category*";
    if (!address) newErrors.address = "select your address*";
    if (!shippingPort) newErrors.shippingPort = "select shippingPort*";
    if (!email) {
      newErrors.email = "the Email is requaier";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Enter valed Email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [adminForm, setAdminForm] = useState<{
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string;
    images: string[];
  }>({
    title: { en: "", ar: "" },
    body: { en: "", ar: "" },
    description: { en: "", ar: "" },
    image: "",
    images: [],
  });
  //init form for edit blog
  useEffect(() => {
    if (heroInfo && isDashboard) {
      setAdminForm({
        title:
          typeof heroInfo.title === "string"
            ? JSON.parse(heroInfo.title)
            : heroInfo.title,
        description:
          typeof heroInfo.description === "string"
            ? JSON.parse(heroInfo.description)
            : heroInfo.description,
        body:
          typeof heroInfo.body === "string"
            ? JSON.parse(heroInfo.body)
            : heroInfo.body,
        images: (heroInfo.images ?? [])
          .filter((img): img is string => typeof img === "string")
          .map((img) => img.split("/").pop() ?? ""),

        image: heroInfo.image ? heroInfo.image.split("/").pop() ?? "" : "",
      });
    }
  }, [heroInfo]);
  //send cotetion
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) console.log("message:", message);
  };
  //edit hero info
  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        title: JSON.stringify(adminForm.title),
        description: JSON.stringify(adminForm.description),
        body: JSON.stringify(adminForm.body),
        image: adminForm.image,
        images: adminForm.images.length > 0 ? adminForm.images : undefined,
      };

      const response = await axiosInstance.put("/admin/blogs/31", payload);
      if (response.data.success) {
        const updatedBlog = {
          ...adminForm,
          ...payload,
          id: 31,
          image: response.data.data?.image || payload.image,
          images: response.data.data?.images
            ?.filter((img): img is string => typeof img === "string")
            .map((img) => img.split("/").pop() ?? ""),
        };
        dispatch(updateBlog(updatedBlog));
        toast.success(t("Edit_Item"));
        setEditing(false);
      }
    } catch (error) {
      console.error("فشل التعديل:", error);
      toast.error(t("Error_Edit_Item"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fillter w-full ">
      {userRole === "ADMIN" && isDashboard && (
        <div className="flex w-full justify-between items-center py-4 gap-4">
          <button
            className="button_outline px-2 py-1"
            onClick={() => {
              if (editing) {
                handleSave();
              } else {
                setEditing(true);
              }
            }}
          >
            {" "}
            {editing ? loading ? <LoadingBTN /> : t("Save") : t("Edit")}
          </button>
          <div className="px-2 flex items-center gap-2">
            <span className="text-sm font-medium">
              {isArabice ? "AR" : "EN"}
            </span>
            <Switch
              onChange={() => setIsArabic(!isArabice)}
              checked={isArabice}
              color="primary"
            />
          </div>
          {editing && (
            <button
              className="button_close px-2 py-1"
              onClick={() => {
                setEditing(false);
              }}
            >
              {" "}
              {t("Cansle")}{" "}
            </button>
          )}
        </div>
      )}
      <div className="text">
        {userRole === "ADMIN" && isDashboard ? (
          editing ? (
            isArabice ? (
              <div className="flex flex-col py-4 gap-3">
                <Textarea
                  name="title"
                  value={adminForm.title.ar}
                  onChange={(e) => {
                    setAdminForm({
                      ...adminForm,
                      title: {
                        ...adminForm.title,
                        ar: e.target.value,
                      },
                    });
                  }}
                  className="w-full h-[70px]"
                />
                <Textarea
                  name="description"
                  value={adminForm.description.ar}
                  onChange={(e) => {
                    setAdminForm({
                      ...adminForm,
                      description: {
                        ...adminForm.description,
                        ar: e.target.value,
                      },
                    });
                  }}
                  className="w-full h-[70px]"
                />
              </div>
            ) : (
              <div className="flex flex-col py-4 gap-3">
                <Textarea
                  name="title"
                  value={adminForm.title.en}
                  onChange={(e) => {
                    setAdminForm({
                      ...adminForm,
                      title: {
                        ...adminForm.title,
                        en: e.target.value,
                      },
                    });
                  }}
                  className="w-full h-[70px]"
                />
                <Textarea
                  name="description"
                  value={adminForm.description.en}
                  onChange={(e) => {
                    setAdminForm({
                      ...adminForm,
                      description: {
                        ...adminForm.description,
                        en: e.target.value,
                      },
                    });
                  }}
                  className="w-full h-[70px]"
                />
              </div>
            )
          ) : (
            <>
              <h1 className="text-4xl font-bold">
                {getLocalized(heroInfo?.title, isArabice ? "ar" : "en")}
              </h1>
              <p className="text-sm my-3 text-gray-500">
                {" "}
                {getLocalized(heroInfo?.description, isArabice ? "ar" : "en")}
              </p>
            </>
          )
        ) : loadingPage ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-4xl font-bold">{userHero.title}</h1>
            <p className="text-sm my-3 text-gray-500">{userHero.description}</p>
          </>
        )}
        <div className="fillter p-[10px] sm:p-[0px] gap-[20px]">
          <p className="text-primary1 text-sm font-montserrat">
            {t("What_shipping")}
          </p>
          {/* cars category */}
          <div className="flex flex-wrap mt-2 items-start justify-start gap-2">
            {items.map((item, index) => (
              <div
                key={index}
                className={`article box cursor-pointer text-xs font-montserrat  gap-[18px] flex items-center justify-center w-[150px] h-[50px] py-[8px] px-[12px] bg-white border rounded ${
                  car === item.label ? "activ" : ""
                } ${errors.car ? "error" : ""}`}
                onClick={() => setCar(item.label)}
              >
                <img src={item.src} alt={item.alt} width={40} height={40} />
                <div className="flex items-center justify-center">
                  <p className="text-primary1 text-center">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/**port information  */}
        <div className="fillter p-[10px] sm:p-[0px] gap-4">
          <p className="text-primary1 mt-4 font-montserrat text-sm">
            {t("Select_address")}
          </p>

          <div className="flex w-full mt-2 flex-wrap items-start justify-start gap-3">
            {/* Select your address */}
            <div className=" bg-white  w-1/2 md:w-1/3 ">
              <TextSelector
                options={[
                  { value: "Muscat", label: "Muscat" },
                  { value: "aldoqm", label: "Aldoqm" },
                ]}
                placeholder="Muscat"
                value={address}
                onChange={(val) => {
                  setAddress(String(val));
                }}
                error={errors.address}
              />
            </div>
            <div className=" bg-white   w-1/2 md:w-1/3">
              <TextSelector
                options={[{ value: "torinto", label: "Torinto" }]}
                value={shippingPort}
                placeholder="Shipping Port"
                onChange={(val) => {
                  setShippingPort(String(val));
                }}
                error={errors.shippingPort}
              />
            </div>
          </div>
        </div>
        {/**email address */}
        <div className="fillter p-[10px] sm:p-[0px] gap-[20px]">
          <p className="text-primary1 text-sm mt-3 font-montserrat">
            {t("Enter_Email")}
          </p>
          <div
            className={`flex  h-[56px] bg-white px-[12px] py-[8px] gap-[18px] border rounded items-start justify-start gap-4 ${
              errors.email ? "border-red-500" : ""
            }`}
          >
            <div className="flex gap-[12px] w-full h-full item-center ">
              <div className="w-[24px] h-[24px] relative item-center justify-center mt-[10px]">
                <img src="/images/email-icon.png" alt="email" />
              </div>
              <div className="input flex item-center w-full justify-center">
                <input
                  type="email"
                  placeholder="mail@example.com"
                  className=" bg-white focus:outline-none mb-1 font-montserrat text-sm w-full"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 ms-2">{errors.email}</p>
          )}
        </div>
        {/**action */}
        <div className="action w-full h-80px flex item-center justify-center py-[16px]">
          <button
            className="button_bordered rounded py-3 px-5 font-bold text-sm text-blue-200 "
            onClick={handleSubmit}
          >
            {t("Get_Quote")}
          </button>
        </div>
      </div>
    </div>
  );
}
