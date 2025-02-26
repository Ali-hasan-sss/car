"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
} from "@mui/material";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
  FaTiktok,
  FaDiscord,
  FaPinterest,
  FaReddit,
  FaTwitch,
  FaEnvelope,
  FaXTwitter,
} from "react-icons/fa6";
import { FaEdit, FaSnapchatGhost, FaTrash } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import Loader from "../../components/loadingPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchSocialMediaSuccess } from "@/store/Reducers/socialMediaReducer";

interface SocialMedia {
  id: number;
  icon: string;
  link: string;
}

// قائمة الأيقونات المتاحة
const iconOptions = [
  { name: "facebook", icon: <FaFacebook className="text-blue-600 text-2xl" /> },
  { name: "twitter", icon: <FaTwitter className="text-blue-400 text-2xl" /> },
  {
    name: "instagram",
    icon: <FaInstagram className="text-pink-500 text-2xl" />,
  },
  { name: "linkedin", icon: <FaLinkedin className="text-blue-700 text-2xl" /> },
  { name: "telegram", icon: <FaTelegram className="text-blue-500 text-2xl" /> },
  {
    name: "whatsapp",
    icon: <FaWhatsapp className="text-green-500 text-2xl" />,
  },
  { name: "youtube", icon: <FaYoutube className="text-red-600 text-2xl" /> },
  { name: "tiktok", icon: <FaTiktok className="text-black text-2xl" /> },
  {
    name: "snapchat",
    icon: <FaSnapchatGhost className="text-yellow-400 text-2xl" />,
  },
  { name: "discord", icon: <FaDiscord className="text-indigo-500 text-2xl" /> },
  {
    name: "pinterest",
    icon: <FaPinterest className="text-red-600 text-2xl" />,
  },
  { name: "reddit", icon: <FaReddit className="text-orange-500 text-2xl" /> },
  { name: "twitch", icon: <FaTwitch className="text-purple-600 text-2xl" /> },
  { name: "email", icon: <FaEnvelope className="text-gray-600 text-2xl" /> }, // البريد الإلكتروني
  { name: "x", icon: <FaXTwitter className="text-black text-2xl" /> }, // منصة X (تويتر سابقًا)
  { name: "website", icon: <FaGlobe className="text-gray-600 text-2xl" /> }, // أيقونة افتراضية للمواقع
];

export default function SocialMediaSettings() {
  const dispatch = useDispatch();
  const { socialMediaList, lastUpdated } = useSelector(
    (state: RootState) => state.socialMedia
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<SocialMedia | null>(null);
  const [newSocialMedia, setNewSocialMedia] = useState({ icon: "", link: "" });
  const { t } = useLanguage();
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/admin/socials");
        if (response.data.success) {
          dispatch(fetchSocialMediaSuccess(response.data.data));
        }
      } catch (error) {
        console.error("حدث خطأ في جلب بيانات السوشيال ميديا:", error);
      } finally {
        setLoading(false);
      }
    };
    const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 دقائق

    // التحقق مما إذا كان يجب جلب البيانات أم لا
    const currentTime = Date.now();
    if (currentTime - lastUpdated >= UPDATE_INTERVAL) {
      fetchSocialMedia();
    }
  }, [dispatch, lastUpdated]);
  // دالة لتحديد الأيقونة بناءً على الاسم
  const getIcon = (iconName: string) => {
    const selectedIcon = iconOptions.find((option) => option.name === iconName);
    return selectedIcon ? (
      selectedIcon.icon
    ) : (
      <FaGlobe className="text-gray-600 text-2xl" />
    );
  };

  // فتح و إغلاق الـ Modal
  const handleOpen = (socialMedia?: SocialMedia) => {
    if (socialMedia) {
      setEditing(socialMedia);
      setNewSocialMedia({ icon: socialMedia.icon, link: socialMedia.link });
    } else {
      setEditing(null);
      setNewSocialMedia({ icon: "", link: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // تحديث بيانات النموذج
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewSocialMedia({ ...newSocialMedia, [e.target.name]: e.target.value });
  };

  // إرسال البيانات إلى API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (editing) {
        response = await axiosInstance.put(
          `/admin/socials/${editing.id}`,
          newSocialMedia
        );
      } else {
        response = await axiosInstance.post("/admin/socials", newSocialMedia);
      }

      if (response.data.success) {
        const updatedList = editing
          ? socialMediaList.map((item) =>
              item.id === editing.id ? response.data.data : item
            )
          : [...socialMediaList, response.data.data];

        dispatch(fetchSocialMediaSuccess(updatedList));
        handleClose();
      }
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ وسيلة التواصل:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/admin/socials/${id}`);
      dispatch(
        fetchSocialMediaSuccess(
          socialMediaList.filter((item) => item.id !== id)
        )
      );
    } catch (error) {
      console.error("حدث خطأ أثناء حذف وسيلة التواصل:", error);
    }
  };

  return (
    <Box className="p-6 bg-white">
      <Typography variant="h5" className="font-bold mb-4 text-center">
        {t("socialMidia")}
      </Typography>

      <button
        onClick={() => handleOpen()}
        className="button_outline  py-2 px-3"
      >
        + {t("Add_New_Social")}
      </button>

      <div className="space-y-4 mt-5 e-w-full">
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : socialMediaList.length > 0 ? (
          socialMediaList.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-400 w-full md:w-1/2 gap-4"
            >
              {getIcon(item.icon)}
              <a
                href={
                  item.link.startsWith("http")
                    ? item.link
                    : `https://${item.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {item.link}
              </a>
              <div className="actions flex items-center justify-end w-full gap-3">
                {" "}
                <IconButton onClick={() => handleOpen(item)}>
                  <FaEdit className="text-yellow-600 text-xl" />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <FaTrash className="text-red-500 text-xl" />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <Typography className="text-gray-500 text-center">
            {t("No_Social_Media_Found")}
          </Typography>
        )}
      </div>

      {/* الـ Modal لإضافة وسيلة جديدة */}
      <Dialog open={open} onClose={handleClose}>
        <Box className="p-6 w-96 bg-white dark:bg-gray-800 rounded-md">
          <Typography variant="h6" className="font-bold mb-4">
            {editing ? t("Edit_Social") : t("Add_New_Social")}
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              select
              fullWidth
              label={t("Choose_Icon")}
              name="icon"
              value={newSocialMedia.icon}
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#008080", // تغيير لون التسمية عند الفوكس
                  },
                },
              }}
            >
              {iconOptions.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.icon} <span className="ml-2">{option.name}</span>
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label={t("Enter_The_Link")}
              name="link"
              value={newSocialMedia.link}
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#008080", // تغيير لون التسمية عند الفوكس
                  },
                },
              }}
            />
            <div className="flex justify-start gap-4 mt-4">
              <button className="button_outline  py-2 px-3">
                {editing ? t("Save") : t("Add")}
              </button>
              <button className="button_bordered  py-2 px-3">
                {t("Close")}
              </button>
            </div>
          </form>
        </Box>
      </Dialog>
    </Box>
  );
}
