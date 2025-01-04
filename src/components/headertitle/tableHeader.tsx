import { FaPlus } from "react-icons/fa";

interface TableHeaderProps {
  title: string;
  des: string;
}
export default function TableHeader({ title, des }: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="headind flex flex-col items-start p-[16px] ">
        <h2 className="title"> {title}</h2>
        <p className="heading_des text-gray-400">{des}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex btn text-gray-600 items-center hover:bg-red-400 hover:text-gray-50 justify-center gap-1">
          <img
            src="/images/trash.png"
            width={14}
            alt="trash"
            className="mb-1"
          />{" "}
          Delete
        </div>

        <div className="flex btn text-gray-600 items-center hover:bg-primary1 hover:text-gray-50 gap-1">
          <img
            src="/images/filter.png"
            className="mb-1"
            width={14}
            alt="filter"
          />{" "}
          Filter
        </div>
        <div className="flex border text-gray-600 hover:bg-primary1 hover:text-gray-50 btn items-center gap-1">
          <img
            src="/images/dowenload.png"
            className="mb-1"
            width={14}
            alt="dowenload"
          ></img>{" "}
          Exports
        </div>
        <div className="flex border bg-primary1 text-gray-50 hover:text-gray-900 btn items-center gap-1">
          <FaPlus className="text-sm" /> Add New Auction Car
        </div>
      </div>
    </div>
  );
}
