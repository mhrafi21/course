import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSignupMutation } from "@/redux/baseApi";
import { toast } from "sonner";
import { IUser } from "@/interface";
import { InputField } from "../form/InputField";

export default function Registration() {
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
        toast("Registration successful!");
      } else {
        toast(result.message);
      }
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        (error as { data?: { message?: string } }).data?.message !==
          "Invalid ID"
      ) {
        toast.error("User is already registered!");
      } else {
        toast("Username is already used, try a different one!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
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
            <Button size="lg" type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
