import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSignupMutation } from "@/redux/baseApi";
import { toast } from "sonner";
import { IUser } from "@/interface";
import { InputField } from "../form/InputField";
import { motion } from "framer-motion";
import singUpImg from "../../assets/images/login.svg";
import { useNavigate } from "react-router";
import { Input } from "../ui/input";
export default function Registration() {
  const navigate = useNavigate();
  const [signUpUser] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IUser>({
    defaultValues: {
      username: "Mahdi Hasan",
      email: "rafi71078@gmail.com",
      password: "rafi6440",
      confirmPassword: "rafi6440",
      role: "student",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      const result = await signUpUser(data).unwrap();
      if (result.success) {
        toast.success("Registration successful!");
      } else {
        toast.error(result.message);
      }
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        (error as { data?: { message?: string } }).data?.message !==
          "Invalid ID"
      ) {
        toast.error("User is already registered!");
      } else {
        toast.error("Username is already used, try a different one!");
      }
    }
  };

  return (
    <div className="container">
      <div >
        <div className="flex flex-col justify-center items-center md:flex-row min-h-screen">
          <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hidden md:flex md:w-1/2 bg-cover bg-center">
            <img src={singUpImg} alt="img not found" />
          </motion.div>
          <div className="flex flex-col justify-center items-center w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full max-w-lg"
            >
              <Card className="bg-white shadow-none border-none overflow-hidden">
                <CardHeader className="text-center py-6">
                  <CardTitle className="text-3xl font-bold ">
                    Create an Account
                  </CardTitle>
                  <CardDescription className="text-sm ">
                    Join as an Instructor or Student
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 md:p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <InputField
                      id="username"
                      label="Full Name"
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      id="email"
                      label="Email Address"
                      type="email"
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      id="password"
                      label="Password"
                      type="password"
                      register={register}
                      errors={errors}
                    />
                    <InputField
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      register={register}
                      errors={errors}
                      watch={watch}
                    />

                    {/* Role Selection */}
                    <div>
                      <Label className="font-medium">
                        Select Role
                      </Label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            value="student"
                            {...register("role", {
                              required: "Role is required",
                            })}
                            className="accent-indigo-600"
                          />
                          <CardDescription className="text-gray-700">Student</CardDescription>
                        </label>
                        <label className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            value="instructor"
                            {...register("role", {
                              required: "Role is required",
                            })}
                            className="accent-indigo-600"
                          />
                          <CardDescription className="text-gray-700">Instructor</CardDescription>
                        </label>
                      </div>
                      {errors.role && (
                        <CardDescription className="text-red-500 text-sm">
                          {errors.role.message}
                        </CardDescription>
                      )}
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-center">
                     <div>
                     <Input
                        type="checkbox"
                        id="agree"
                        {...register("agreeToTerms", {
                          required: "You must agree to the terms",
                        })}
                        className="accent-indigo-600 h-3"
                      />
                     </div>
                      <Label htmlFor="agree" className="text-sm text-gray-700">
                       <CardDescription>
                       I agree to the{" "}
                        <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                          Terms and Conditions
                        </span>
                       </CardDescription>
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <CardDescription className="text-red-500 text-sm">
                        {errors.agreeToTerms.message}
                      </CardDescription>
                    )}

                    {/* Submit Button */}
                    <Button size="lg" type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </form>
                   {/* Sign Up Link */}
              <CardDescription className="text-center  mt-4">
                Already have an account?{" "}
                <span
                  className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login here
                </span>
              </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
