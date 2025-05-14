import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import ImageUploader from "@/components/uploders/Uploader/ImageUploader";
import LoadingBTN from "../loading/loadingBTN";
import { ServiceBlogFormProps } from "@/Types/adminTypes";
import { CircleCheckIcon } from "lucide-react";

export default function ServiceBlogForm({
  handleSubmit,
  isNew,
  loading,
  formData,
  onChange,
  onClose,
}: ServiceBlogFormProps) {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formState, setFormState] = useState(formData);

  useEffect(() => {
    setFormState(formData);
  }, [formData]);

  const steps = [t("Arabic_Info"), t("English_Info"), t("Upload_Images")];

  // التحقق من صحة الحقول قبل السماح بالانتقال للخطوة التالية
  const validateStep = () => {
    if (activeStep === 0) {
      return (
        formState.title.ar && formState.description.ar && formState.body.ar
      );
    }
    if (activeStep === 1) {
      return (
        formState.title.en && formState.description.en && formState.body.en
      );
    }
    if (activeStep === 2) {
      return formState.image && formState.images.length > 0;
    }
    return false;
  };

  return (
    <div className="max-w-lg py-4 px-5 w-full">
      <div className="flex w-full items-center justify-around mb-4 gap-1">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
                activeStep === index
                  ? "bg-primary1 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => {
                if (completedSteps.includes(index) || index === activeStep) {
                  setActiveStep(index);
                }
              }}
            >
              {completedSteps.includes(index) ? (
                <CircleCheckIcon className="text-white" />
              ) : (
                index + 1
              )}
            </div>
            <h2>{label}</h2>
          </div>
        ))}
      </div>

      {/* محتوى كل خطوة */}
      <div className="mt-2 space-y-3">
        {activeStep === 0 && (
          <div className="flex flex-col gap-4">
            <TextField
              label={t("title_ar")}
              value={formState.title.ar}
              onChange={(e) =>
                onChange({
                  ...formState,
                  title: { ...formState.title, ar: e.target.value },
                })
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008080", // تغيير لون الإطار عند الفوكس
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#008080", // تغيير لون التسمية عند الفوكس
                  },
                },
              }}
            />
            <TextField
              label={t("desc_ar")}
              value={formState.description.ar}
              onChange={(e) =>
                onChange({
                  ...formState,
                  description: { ...formState.description, ar: e.target.value },
                })
              }
              fullWidth
              multiline
              rows={1}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008080",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#008080",
                  },
                },
              }}
            />
            <TextField
              label={t("Body_ar")}
              value={formState.body.ar}
              onChange={(e) =>
                onChange({
                  ...formState,
                  body: { ...formState.body, ar: e.target.value },
                })
              }
              fullWidth
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008080",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#008080",
                  },
                },
              }}
            />
          </div>
        )}

        {activeStep === 1 && (
          <div className="flex flex-col gap-4">
            <TextField
              label={t("title_en")}
              value={formState.title.en}
              onChange={(e) =>
                onChange({
                  ...formState,
                  title: { ...formState.title, en: e.target.value },
                })
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008080",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#008080",
                  },
                },
              }}
            />
            <TextField
              label={t("desc_en")}
              value={formState.description.en}
              onChange={(e) =>
                onChange({
                  ...formState,
                  description: { ...formState.description, en: e.target.value },
                })
              }
              fullWidth
              multiline
              rows={1}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008080",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#008080",
                  },
                },
              }}
            />
            <TextField
              label={t("Body_en")}
              value={formState.body.en}
              onChange={(e) =>
                onChange({
                  ...formState,
                  body: { ...formState.body, en: e.target.value },
                })
              }
              fullWidth
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#008080",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#008080",
                  },
                },
              }}
            />
          </div>
        )}

        {activeStep === 2 && (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold mb-2">{t("Upload_Main_Image")}</h3>
              <ImageUploader
                onImagesUpload={(images) =>
                  onChange({ ...formState, image: images[0] })
                }
                multiple={false}
                initialImages={formData.image ? [formData.image] : []}
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                {t("Upload_Additional_Images")}
              </h3>
              <ImageUploader
                onImagesUpload={(images) => onChange({ ...formState, images })}
                initialImages={formData.images}
                multiple
              />
            </div>
          </div>
        )}
      </div>

      {/* أزرار التحكم */}
      <div className="flex justify-between mt-6">
        <button onClick={onClose} className="button_close w-[100px] ">
          {t("Close")}
        </button>
        <button
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => prev - 1)}
          className={`button_bordered w-[100px] ${
            activeStep === 0 ? "disabled" : ""
          }`}
        >
          {t("Back")}
        </button>

        {activeStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="button_outline flex items-center justify-center py-2 w-[100px]"
          >
            {loading ? <LoadingBTN /> : isNew ? t("Add") : t("Save")}
          </button>
        ) : (
          <button
            onClick={() => {
              if (validateStep()) {
                setCompletedSteps([...completedSteps, activeStep]);
                setActiveStep((prev) => prev + 1);
              }
            }}
            className={`button_outline w-[100px] py-2 ${
              !validateStep() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!validateStep()}
          >
            {t("Next")}
          </button>
        )}
      </div>
    </div>
  );
}
