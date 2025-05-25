import { useLanguage } from "@/context/LanguageContext";
import { BlogUser } from "@/Types/adminTypes";
interface PostCardProps {
  post: BlogUser;
}
export default function Card({ post }: PostCardProps) {
  const { t } = useLanguage();
  const viewBlog = (post) => {
    const blog = JSON.stringify(post);
    localStorage.setItem("blog", blog);
    window.location.replace("blog/details");
  };
  const isNew = () => {
    const createdAtDate = new Date(post.created_at);
    const now = new Date();
    const diffInMs = now.getTime() - createdAtDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  const info = isNew() ? "New" : "old";
  return (
    <div className="box w-[350px] h-[400px] flex flex-col p-3">
      {/* الصورة */}
      <div className="plog_image w-full h-[200px] flex items-center justify-center">
        <img
          src={post.image}
          alt="plog"
          className="w-full h-full object-cover"
        />
      </div>

      {/* المحتوى */}
      <div className="content flex flex-col justify-between flex-1 overflow-hidden">
        <div className="top-content flex flex-col gap-[10px] overflow-hidden">
          <div
            className={`info flex rounded-full mt-1 items-center justify-center w-[50px] h-[25px] ${
              info === "New"
                ? "bg-red-200 text-red-800"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            {info}
          </div>

          <h3 className="text-black text-lg font-bold line-clamp-1">
            {post.title}
          </h3>

          <p className="text-sm text-gray-700 line-clamp-3">
            {post.description}
          </p>
        </div>

        <button
          onClick={() => viewBlog(post)}
          className="text-blue-500 text-sm underline mt-2 self-start"
        >
          {t("Read More")}
        </button>
      </div>
    </div>
  );
}
