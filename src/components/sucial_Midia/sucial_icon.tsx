import { useLanguage } from "@/context/LanguageContext";
import { fetchSocialMediaSuccess } from "@/store/Reducers/socialMediaReducer";
import { RootState } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";
import { Globe } from "lucide-react";
import { useEffect } from "react";
import {
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaSnapchatGhost,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

export default function Sucial_icon() {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const { socialMediaList, lastUpdated } = useSelector(
    (state: RootState) => state.socialMedia
  );
  const iconOptions = [
    {
      name: "facebook",
      icon: <FaFacebook className="text-blue-600 text-2xl" />,
    },
    { name: "twitter", icon: <FaTwitter className="text-blue-400 text-2xl" /> },
    {
      name: "instagram",
      icon: <FaInstagram className="text-pink-500 text-2xl" />,
    },
    {
      name: "linkedin",
      icon: <FaLinkedin className="text-blue-700 text-2xl" />,
    },
    {
      name: "telegram",
      icon: <FaTelegram className="text-blue-500 text-2xl" />,
    },
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
    {
      name: "discord",
      icon: <FaDiscord className="text-indigo-500 text-2xl" />,
    },
    {
      name: "pinterest",
      icon: <FaPinterest className="text-red-600 text-2xl" />,
    },
    { name: "reddit", icon: <FaReddit className="text-orange-500 text-2xl" /> },
    { name: "twitch", icon: <FaTwitch className="text-purple-600 text-2xl" /> },
    { name: "email", icon: <FaEnvelope className="text-gray-600 text-2xl" /> },
    { name: "x", icon: <FaXTwitter className="text-white text-2xl" /> },
    { name: "website", icon: <Globe className="text-gray-600 text-2xl" /> },
  ];

  const emailItem = socialMediaList.find((item) => item.icon === "email");
  const phoneItem = socialMediaList.find((item) => item.icon === "phone");
  const addressItem = socialMediaList.find((item) => item.icon === "address");

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await axiosInstance.get("/customer/socials");
        if (response.data.success) {
          dispatch(fetchSocialMediaSuccess(response.data.data));
        }
      } catch (error) {
        console.error("حدث خطأ في جلب بيانات السوشيال ميديا:", error);
      }
    };
    const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 دقائق

    const currentTime = Date.now();
    if (currentTime - lastUpdated >= UPDATE_INTERVAL) {
      fetchSocialMedia();
    }
  }, [dispatch, lastUpdated]);

  const getIcon = (iconName: string) => {
    const selectedIcon = iconOptions.find((option) => option.name === iconName);
    return selectedIcon ? (
      selectedIcon.icon
    ) : (
      <Globe className="text-gray-600 text-2xl" />
    );
  };
  return (
    <>
      <div className="address flex flex-col gap-[5px]">
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#FFFFFF",
          }}
        >
          {t("Address")}:
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#FFFFFF",
          }}
        >
          {addressItem?.link}
        </p>
      </div>
      <div className="contact flex flex-col gap-[5px]">
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#FFFFFF",
          }}
        >
          {t("contact")}:
        </p>
        {phoneItem && (
          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            {phoneItem.link}
          </p>
        )}
        <p
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#FFFFFF",
          }}
        >
          {emailItem?.link}
        </p>
      </div>
      <div className="social  w-full md:w-1/3 flex items-center  gap-[10px]">
        {socialMediaList
          .filter(
            (item) =>
              item.icon && !["email", "address", "phone"].includes(item.icon)
          )
          .map((item, index) => (
            <div key={index} className="flex items-center ">
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
                {getIcon(item.icon)}
              </a>
            </div>
          ))}
      </div>
    </>
  );
}
