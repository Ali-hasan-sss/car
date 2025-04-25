import EmailInput from "@/components/inputs/EmailInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import React from "react";

interface Company_step2 {
  formData: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Company_step2: React.FC<Company_step2> = ({
  formData,
  errors,
  onInputChange,
}) => {
  return (
    <div className="w-full">
      <EmailInput
        value={formData.email}
        error={errors.email}
        onChange={onInputChange}
      />
      <PasswordInput
        Forgot_password={false}
        value={formData.password}
        onChange={onInputChange}
        error={errors.password}
      />
    </div>
  );
};

export default Company_step2;
