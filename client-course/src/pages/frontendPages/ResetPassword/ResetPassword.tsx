import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import LoginImg from "../../../assets/images/forgot.svg";
import { InputField } from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/redux/baseApi";
import { isErrored } from "stream";

const ResetPassword: React.FC = () => {
  const [resetUserPassword, { isLoading }] =
    useResetPasswordMutation(undefined);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  if (!token) {
    navigate("/forgot-password");
    return null;
  }

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      
    const result = (await resetUserPassword({
      resetToken: token,
      ...data,
    }).unwrap()) as {
      statusCode: boolean;
      success: true;
      message: string;
      data: any;
    };
    console.log(result);
    if (result.success) {
      toast.success(`${result.message}`);
      setTimeout(()=>{
        navigate("/login")
      },3000)
    }else{
      console.log(result.message);
    }
    
    } catch (error: any) {
     console.log(error.data.message)
      toast.error(`${error.data.message}`)
    }

  };

  return (
    <div className="container flex flex-col items-center justify-center md:flex-row min-h-screen ">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
      >
        <img src={LoginImg} alt="Reset Password" />
      </motion.div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 md:p-6 p-0">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="overflow-hidden rounded-none border-none shadow-none">
            <CardHeader className="text-center py-6">
              <CardTitle className="text-3xl font-bold">
                Reset Password
              </CardTitle>
              <CardDescription>Enter your new password</CardDescription>
            </CardHeader>
            <CardContent className="md:p-6 p-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                  id="password"
                  label="New Password"
                  type="password"
                  register={register}
                  errors={errors}
                  watch={watch}
                />
                <InputField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  register={register}
                  errors={errors}
                  watch={watch}
                />
                {isLoading ? (
                  <Button className="w-full" size={"lg"}>Reseting...</Button>
                ) : (
                  <Button size="lg" type="submit" className="w-full">
                    Reset Password
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
