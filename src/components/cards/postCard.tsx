"use client";

// import { useLanguage } from "@/context/LanguageContext";
import { BlogUser } from "@/Types/adminTypes";
import { useRouter } from "next/navigation";
import React from "react";

interface PostCardProps {
  post: BlogUser;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // const { t } = useLanguage();
  const router = useRouter();
  const viewBlog = (post) => {
    const blog = JSON.stringify(post);
    localStorage.setItem("blog", blog);
    router.push("blog/details");
  };
  return (
    <div>
      <img
        className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
        src={post.image}
        alt={post.title}
      />

      <div className="mt-8">
        <h1 className="mt-4 text-xl font-semibold text-gray-800 ">
          {post.title}
        </h1>

        <p className="mt-2 text-gray-500 ">{post.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm text-gray-500 ">
              {new Date(post.created_at).toLocaleDateString("ar-EG")}
            </p>
          </div>

          <button
            onClick={() => viewBlog(post)}
            className="text-blue-500 text-sm underline mt-2"
          >
            عرض المقال
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
