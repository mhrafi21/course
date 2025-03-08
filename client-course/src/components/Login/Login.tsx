import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputField } from "../form/InputField";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useLoginMutation } from "@/redux/baseApi";
import { toast } from "sonner";
import LoginImg from "../../assets/images/login.svg";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/features/Auth/authSlice";

const Login = () => {
  // Use the useLoginMutation hook to get the login mutation
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUser] = useLoginMutation(undefined);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "12mhrafi@gmail.com",
      password: "rafi6440",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
     try {
      const result = (await loginUser(data).unwrap()) as {
        success: boolean;
        message: string;
        data: any;
        statusCode: number;
      };
      if (result.success) {
        toast.success(`${result.message}`);
        await dispatch(setToken(result.data))
        navigate(location?.state ? location?.state : "/")
      }else{
        console.log(result.message);
      }
     } catch (error: any) {    
     toast.error(`${error.data.message}`)
     }
  };

  return (
    <div>
      <div className="container">
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
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 md:p-6 p-0">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="overflow-hidden border-none shadow-none">
            <CardHeader className="text-center py-6">
              <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
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

                {/* Forgot Password Link */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Input
                        type="checkbox"
                        id="agree"
                        className=" h-3"
                      />
                    </div>
                    <Label htmlFor="agree" className="text-sm">
                      
                        Remember Me
                  
                    </Label>
                  </div>
                  <div className="text-right">
                    <span
                      className=" text-sm font-semibold cursor-pointer hover:underline"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot Password?
                    </span>
                  </div>
                </div>

                <Button size="lg" type="submit" className="w-full">
                  Login
                </Button>
              </form>

              {/* Social Login Buttons */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <CardDescription className="text-sm">OR</CardDescription>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
                <div className="mt-4 flex flex-col space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 transition"
                  >
                    <span></span> Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 transition"
                  >
                    <span></span> Continue with Facebook
                  </Button>
                </div>
              </div>
            </CardContent>

            {/* Sign Up Link */}
            <CardDescription className="flex mt-4 md:mt-0 gap-2 items-center justify-center">
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
      </div>
    </div>
  );
};

export default Login;

/*
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputField } from "../form/InputField";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { useLoginMutation } from "@/redux/baseApi";
import { toast } from "sonner";
import LoginImg from "../../assets/images/login.svg";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/features/Auth/authSlice";

const Login = () => {
  // Use the useLoginMutation hook to get the login mutation
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUser] = useLoginMutation(undefined);
  const [searchParams] = useSearchParams("");
  const state = searchParams.get("redirect");
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "12mhrafi@gmail.com",
      password: "rafi6440",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
     try {
      const result = (await loginUser(data).unwrap()) as {
        success: boolean;
        message: string;
        data: any;
        statusCode: number;
      };
      if (result.success) {
        toast.success(`${result.message}`);
        await dispatch(setToken(result.data))
        navigate(state ? state : "/")
      }else{
        console.log(result.message);
      }
     } catch (error: any) {    
     toast.error(`${error.data.message}`)
     }
  };

  return (
    <div>
      <div className="container">
      <div className="flex flex-col md:flex-row min-h-screen">

      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
      >
        <img src={LoginImg} alt="image not found" />
      </motion.div>


      <div className="flex flex-col justify-center items-center w-full md:w-1/2 md:p-6 p-0">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="overflow-hidden border-none shadow-none">
            <CardHeader className="text-center py-6">
              <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
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

              
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Input
                        type="checkbox"
                        id="agree"
                        className=" h-3"
                      />
                    </div>
                    <Label htmlFor="agree" className="text-sm">
                      
                        Remember Me
                  
                    </Label>
                  </div>
                  <div className="text-right">
                    <span
                      className=" text-sm font-semibold cursor-pointer hover:underline"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot Password?
                    </span>
                  </div>
                </div>

                <Button size="lg" type="submit" className="w-full">
                  Login
                </Button>
              </form>

           
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <CardDescription className="text-sm">OR</CardDescription>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
                <div className="mt-4 flex flex-col space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 transition"
                  >
                    <span></span> Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 transition"
                  >
                    <span></span> Continue with Facebook
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardDescription className="flex mt-4 md:mt-0 gap-2 items-center justify-center">
              Don't have an account?{" "}
              <span
                className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate(`/sign-up${location?.search}`)}
              >
                Sign up here
              </span>
            </CardDescription>
          </Card>
        </motion.div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Login;

*/ 
