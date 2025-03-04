import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField } from "../form/InputField";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useLoginMutation } from "@/redux/baseApi";
import { toast } from "sonner";
import LoginImg from "../../assets/images/login.svg"

const Login = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log("Login Data:", data);
    const result = (await loginUser(data).unwrap()) as {
      success: boolean;
      message: string;
      data: any;
      statusCode: number;
    };
    if (result.success) {
      toast.success(`${result.message}`);
    } else {
      console.error("Login failed:", result.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Image Section */}
      <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="hidden md:flex md:w-1/2 bg-cover bg-center" 
      >
        <img src={LoginImg} alt="image not found" />
      </motion.div>

      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-lg"
        >
          <Card className=" overflow-hidden border-none shadow-none">
            <CardHeader className="text-center py-6">
              <CardTitle className="text-3xl font-bold">
                Welcome Back
              </CardTitle>
              <CardDescription>Login to continue</CardDescription>
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
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  register={register}
                  errors={errors}
                />
                <Button
                  size={"lg"}
                  type="submit"
                  className="w-full"
                >
                  Login
                </Button>
              </form>

              {/* Social Login Buttons */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="text-gray-500 text-sm">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
                <div className="mt-4 flex flex-col space-y-3">
                  <Button size={"lg"} className="w-full bg-white text-black border hover:bg-white flex items-center justify-center gap-2 transition">
                    <span></span> Continue with Google
                  </Button>
                  <Button size={"lg"} className="w-full bg-white text-black border hover:bg-white flex items-center justify-center gap-2 transition">
                    <span></span> Continue with Facebook
                  </Button>
                </div>
              </div>

            
            </CardContent>
              {/* Sign Up Link */}
              <CardDescription className="flex gap-2 items-center justify-center">
                Don't have an account?{" "}
                <span
                  className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign up here
                </span>
              </CardDescription>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
