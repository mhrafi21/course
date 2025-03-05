import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import ForgotImg from "../../../assets/images/forgot.svg";
import { InputField } from "@/components/form/InputField";
import { useForgotPasswordMutation } from "@/redux/baseApi";

const ForgotPassword = () => {
  const [sendFogotPasswordLink, {isLoading}] = useForgotPasswordMutation(undefined);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    
    try {
          
    const result = await sendFogotPasswordLink(data).unwrap() as {statusCode: boolean, success: boolean, message: string, data: any};
    
    if (result.success) {
      toast.success("Password reset link sent to your email.");
    } else {
      toast.error("User not found. Please check your email address.");
    }
    } catch (error: any) {
      toast.error(`${error.data.message}`)
    }

  };


  return (
    <div className="container flex flex-col md:flex-row min-h-screen">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
      >
        <img src={ForgotImg} alt="Forgot Password" />
      </motion.div>

      {/* Forgot Password Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="overflow-hidden border-none shadow-none">
            <CardHeader className="text-center py-6">
              <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>
              <CardDescription>Enter your email to receive a reset link.</CardDescription>
            </CardHeader>
            <CardContent className="md:p-6 p-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  register={register}
                  errors={errors}
                />
                {
                  isLoading ? <Button className="w-full " size={"lg"}>
                    Sending...
                  </Button>:

                <Button size="lg" type="submit" className="w-full">
                  Send Reset Link
                </Button>
                }
              </form>
              <CardDescription className="flex mt-4 gap-2 items-center justify-center">
                Remember your password? 
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
  );
};

export default ForgotPassword;
