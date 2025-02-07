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
      <div className="flex flex-col items-center w-[250px] h-[250px] bg-white shadow-md rounded-lg border p-[20px] justify-between">
        <img src={image} alt="service" />
        <h2>{title}</h2>
        <button
          onClick={isActive ? hideDetails : showDetails}
          className={`flex items-center justify-center gap-1  border rounded p-2 px-3 ${
            isActive
              ? "bg-primary1 text-blue-50"
              : "border-primary1 text-primary1 hover:bg-primary1 hover:text-blue-50"
          }`}
        >
          {isActive ? "Hide Details" : "Show Details"}
          <img src="images/arrowDowen.png" alt="icon" />
        </button>
      </div>
    </>
  );
}
