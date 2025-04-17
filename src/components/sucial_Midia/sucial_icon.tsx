import axiosInstance from "@/utils/axiosInstance";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
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

export default function Sucial_icon() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socialMediaList, setsocialMediaList] = useState<any[]>([]);
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
    { name: "x", icon: <FaXTwitter className="text-black text-2xl" /> },
    { name: "website", icon: <Globe className="text-gray-600 text-2xl" /> },
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get("/customer/socials");
        setsocialMediaList(response.data.data);
      } catch (error) {
        console.error("فشل جلب الخدمات", error);
      }
    };
    fetchServices();
  }, []);
  const getIcon = (iconName: string) => {
    const selectedIcon = iconOptions.find((option) => option.name === iconName);
    return selectedIcon ? (
      selectedIcon.icon
    ) : (
      <Globe className="text-gray-600 text-2xl" />
    );
  };
  return (
    <div className="social  w-full md:w-1/3 flex items-center  gap-[10px]">
      {socialMediaList.map((item) => (
        <div key={item.id} className="flex items-center ">
          <a
            href={
              item.link.startsWith("http") ? item.link : `https://${item.link}`
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
  );
}
