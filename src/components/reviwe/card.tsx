interface Review {
  rate: number;
  des: string;
  user: { name: string; company: string; avatar: string };
}

export default function Card({ rate, des, user }: Review) {
  return (
    <div
      className="bg-white shadow-md rounded-lg border overflow-hidden flex flex-col"
      style={{
        width: "350px",
        height: "200px",
      }}
    >
      {/* الشريط العلوي */}
      <div
        className="header-bar flex justify-start items-center px-4 py-2"
        style={{
          height: "40px",
        }}
      >
        {/* ايقونات النجوم */}
        <div className="flex">
          {Array(rate)
            .fill(0)
            .map((_, index) => (
              <img
                key={index}
                src="images/star.png"
                alt="Star Icon"
                style={{
                  height: "15px",
                  width: "15px",
                  marginRight: "2px",
                }}
              />
            ))}
        </div>
      </div>

      {/* الوصف */}
      <div
        className="description text-sm px-4 py-2 flex-1 overflow-y-auto"
        style={{
          maxHeight: "100px", // يحدد ارتفاع الوصف مع التمرير الحر إذا زاد المحتوى
        }}
      >
        <p className="text-gray-500">{des}</p>
      </div>

      {/* المستخدم */}
      <div className="user-info flex items-center gap-4 px-4 py-4 mt-auto">
        <div className="avatar flex items-center justify-center w-[40px] h-[40px] rounded-full overflow-hidden">
          <img src={user.avatar} alt="Avatar" />
        </div>
        <div className="text-sm">
          <p className="font-semibold text-gray-700">Name: {user.name}</p>
          <p className="text-gray-500">company: {user.company}</p>
        </div>
      </div>
    </div>
  );
}