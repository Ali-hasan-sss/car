import { useState } from "react";
import FullTextInput from "./full_text_inbut";
import Btn_outlin from "../buttons/btn/outline_btn";

export default function VIN_input() {
  const [vin, setVin] = useState("");
  return (
    <div className="flex flex-col w-full items-start">
      <label htmlFor="1" className="text-lg text-text_title">
        VIN*
      </label>
      <div className="flex w-full items-center ">
        <FullTextInput
          id="1"
          value={vin}
          placeHolder="Enter"
          onChange={(e) => setVin(e.target.value)}
        />
        <Btn_outlin
          className="w-[200px]"
          label="Get info by VIN"
          onClick={() => {
            console.log(vin);
          }}
        ></Btn_outlin>
      </div>
    </div>
  );
}
