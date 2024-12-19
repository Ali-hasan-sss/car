import "./style.css";
export default function Contact() {
  return (
    <div
      className="bg-white  flex flex-col md:flex-row items-center md:justify-between"
      style={{ overflow: "hidden" }}
    >
      <form className="w-full md:w-1/2 p-5 m-2">
        <div className="header py-2 mb-3">
          <h1 className="title">Suggestion</h1>
        </div>
        <div className="heading mb-5">
          <h3 className="des">Let’s start with your name & email</h3>
        </div>
        <div className="form-group mb-4">
          <label className="block mb-2 text-sm font-medium">
            Enter your name
          </label>
          <input
            type="text"
            className="w-full border p-[12px] focus:outline-none"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block mb-2 text-sm font-medium">
            Enter your mobile number
          </label>
          <input
            type="text"
            className="w-full border p-[12px] focus:outline-none"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block mb-2 text-sm font-medium">
            Enter your email
          </label>
          <div className="flex items-center border">
            <img
              src="/images/email-icon.png"
              className="w-[20px] h-[16px]  ml-2"
              alt="email icon"
            />
            <input
              type="email"
              className="w-full p-[12px] focus:outline-none"
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <label className="block mb-2 text-sm font-medium">
            Enter your message
          </label>
          <textarea className="w-full border p-[12px] focus:outline-none" />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="start-btn px-5 py-3 mt-1">
            Send
          </button>
        </div>
      </form>

      <div className="hidden md:block">
        <img
          src="/images/contact.png"
          alt="contact"
          style={{ width: "600px" }}
        />
      </div>
    </div>
  );
}
