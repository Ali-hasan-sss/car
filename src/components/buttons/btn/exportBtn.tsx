export default function ExportBtn() {
  return (
    <div
      className="w-[40px] h-[40px] btn p-2 hover:bg-secondary1"
      onClick={() => {
        console.log("export");
      }}
    >
      <img src="/images/export.png" alt="ex" />
    </div>
  );
}
