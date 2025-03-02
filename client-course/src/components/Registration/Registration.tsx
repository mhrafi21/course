import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FormData } from "@/interface";
import { Eye, EyeOff } from "lucide-react";
import { useSignupMutation } from "@/redux/baseApi";
import { toast } from "sonner";

export default function RegistrationPage() {
  const [signUpUser] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      username: "Mahdi Hasan",
      email: "rafi71078@gmail.com",
      password: "rafi6440",
      confirmPassword: "rafi6440",
      role: "student",
      agreeToTerms: false,
    },
  });
  const [role, setRole] = useState<"instructor" | "student">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signUpUser(data).unwrap();

      if (result.success) {
        toast("Registration successful!");
      } else {
        toast(result.message);
      }
    } catch (error) {
      if(error.data.message !== "Invalid ID"){
        toast.error('User is already registered!');
      }else if(error.data.message == "Invalid ID"){
        toast("User name is already used, try different!")
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
      <Card className="w-full max-w-lg bg-white rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create an Account
          </CardTitle>
          <p className="text-sm text-gray-500">
            Join as an Instructor or Student
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="username" className="font-medium">
                Full Name
              </Label>
              <Input
                id="username"
                placeholder="Enter your full name"
                className="mt-1"
                {...register("username", { required: "Name is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="mt-1 pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute top-3 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="mt-1 pr-10"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="absolute top-3 right-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label className="font-medium">Select Role</Label>
              <RadioGroup
                value={role}
                onValueChange={(value: string) =>
                  setRole(value as "instructor" | "student")
                }
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="student"
                    id="student"
                    className="peer hidden"
                  />
                  <Label
                    htmlFor="student"
                    className={cn(
                      "cursor-pointer px-4 py-2 rounded-lg text-gray-700 border transition-all",
                      role === "student"
                        ? "bg-indigo-500 text-white"
                        : "border-gray-300 bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="instructor"
                    id="instructor"
                    className="peer hidden"
                  />
                  <Label
                    htmlFor="instructor"
                    className={cn(
                      "cursor-pointer px-4 py-2 rounded-lg text-gray-700 border transition-all",
                      role === "instructor"
                        ? "bg-indigo-500 text-white"
                        : "border-gray-300 bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    Instructor
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agree"
                {...register("agreeToTerms", {
                  required: "You must agree to the terms",
                })}
              />
              <Label htmlFor="agree" className="text-sm text-gray-700">
                I agree to the Terms and Conditions
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">
                {errors.agreeToTerms.message}
              </p>
            )}

            <Button size={"lg"} type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
