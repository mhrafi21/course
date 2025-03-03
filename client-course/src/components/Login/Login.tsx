import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginMutation } from "@/redux/baseApi";
import { toast } from "sonner";
import { IUser } from "@/interface";
import { InputField } from "../form/InputField";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/features/Auth/authSlice";

export default function Login() {
  const dispatch = useAppDispatch()
  const [loginUser] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<IUser, "email" | "password">>({
    defaultValues: {
      email: "rafi71078@gmail.com",
      password: "rafi6440",
    },
  });

  const onSubmit = async (data: Pick<IUser, "email" | "password">) => {
    try {
      const result = await loginUser(data).unwrap();

      if (result.success) {
        dispatch(setToken(result.data));
        toast.success("Login successful!");
       
        // save to the redux store via peristor
      }
    } catch {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-lg bg-white rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Login</CardTitle>
          <p className="text-sm text-gray-500">Enter your credentials to continue</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <Button size="lg" type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
