import { ChevronDown, ChevronUp } from "lucide-react";

interface servic_boxProps {
  image: string;
  title: string;
  isActive: boolean;
  showDetails: () => void;
  hideDetails: () => void;
}

export default function Servic_box({
  image,
  title,
  isActive,
  showDetails,
  hideDetails,
}: servic_boxProps) {
  return (
    <>
      <div className="flex flex-col items-center w-[250px] h-[250px] bg-white shadow-md rounded-lg border ">
        <div className="w-full h-1/2 overflow-hidden rounded-t-lg flex items-center justify-center ">
          <img
            src={image}
            className=""
            alt="service"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="p-[20px] flex flex-col  items-center h-1/2 justify-between">
          <h2>{title}</h2>
          <button
            onClick={isActive ? hideDetails : showDetails}
            className={`flex items-center justify-center gap-1  border rounded p-2 px-3 ${
              isActive
                ? "bg-primary1 text-blue-50"
                : "border-primary1 text-primary1 hover:bg-secondary1"
            }`}
          >
            {isActive ? "Hide Details" : "Explore Service"}
            {isActive ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>
    </>
  );
}
