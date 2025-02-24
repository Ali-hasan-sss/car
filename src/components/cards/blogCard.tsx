import { Blog } from "@/Types/blogsTypes";

export default function BlogCard({
  id,
  title,
  description,
  body,
  image,
  ondelete,
  onedit,
}: Blog) {
  return (
    <div className="flex flex-col w-[400px] h-[500px] bg-secondary1 items-center ">
      <img src={image} alt={title.en} className="w-full " />
      <div className="flex flex-1 w-full flex-col items-center">
        <div className="flex w-full flex-col items-start justify-start">
          {" "}
          <h1 className="text-text_title font-bold text-xl">{title.ar}</h1>
          <h1 className="text-text_title font-bold text-xl"> {title.en}</h1>
        </div>
        <div className="flex w-full items-start justify-start flex-col">
          {" "}
          <p className="text-text_des text-lg">{description.ar}</p>
          <p className="text-text_des text-lg">{description.en}</p>
        </div>
        <div className="flex w-full items-star justify-start flex-col">
          {" "}
          <p className="text-text_des text-lg">{body.ar}</p>
          <p className="text-text_des text-lg"> {body.en}</p>
        </div>
      </div>
      <div className="flex w-full items-center w-full p-5 gap-4 ">
        <div className="flex items-center justify-center w-[25px] h-[25px] bg-red-100 p-1 rounded-full overflow-hidden ">
          <button onClick={ondelete} aria-label="Delete">
            <img src="/images/redtrash.png" width={14} alt="trash" />
          </button>
        </div>

        <div className="flex items-center justify-center w-[25px] h-[25px] bg-blue-100 p-1 rounded-full overflow-hidden ">
          <a className=" " href={`/blogs/${id}`}>
            <img src="/images/eye.png" width={14} alt="eye" />
          </a>{" "}
        </div>

        <div className="flex items-center justify-center w-[25px] h-[25px] bg-yellow-100 p-1 rounded-full overflow-hidden ">
          <button onClick={onedit} className=" " aria-label="Edit">
            <img src="/images/edit.png" width={14} alt="ben" />
          </button>
        </div>
      </div>
    </div>
  );
}
