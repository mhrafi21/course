import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { IUser } from "@/interface";

interface InputFieldProps {
  id?: keyof IUser;
  label: string;
  type?: string;
  register?: any;
  errors?: any;
  watch?: any;
}

export const InputField: React.FC<InputFieldProps> = ({ id, label, type = "text", register, errors, watch }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div>
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
        <div className="relative">
          <Input
            
            id={id}
            type={type === "password" && showPassword ? "text" : type}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className="mt-1 pr-10 shadow-sm h-12"
            {...register(id, {
              required: `${label} is required`,
              ...(id === "password" && {
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              }),
              ...(id === "confirmPassword" && {
                validate: (value: string) => value === watch("password") || "Passwords do not match",
              }),
            })}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute top-3 right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
        </div>
        {id && errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
      </div>
    );
  };