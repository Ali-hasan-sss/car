import PasswordInput from "@/components/inputs/PasswordInput";
import React from "react";

interface Personal_step2 {
  formData: {
    password: string;
  };
  errors: {
    password?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Personal_step2: React.FC<Personal_step2> = ({
  formData,
  errors,
  onInputChange,
}) => {
  return (
    <div className="w-full">
      <PasswordInput
        Forgot_password={false}
        value={formData.password}
        onChange={onInputChange}
        error={errors.password}
      />
    </div>
  );
};

export default Personal_step2;
