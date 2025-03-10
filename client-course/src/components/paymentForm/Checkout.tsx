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
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreatePaymentMutation } from "@/redux/baseApi";
import { useAuth } from "@/hooks/useAuth";

const CheckoutPage = () => {
  const [createPayment] = useCreatePaymentMutation(undefined);
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const uId = searchParams.get("uId");
  const cId = searchParams.get("cId");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.username,
      email: user?.email,
      address: "asd",
      city: "asf",
      zipCode: "adsf",
      cardNumber: "adf",
      expiryDate: "ad",
      cvv: "ad",
    },
  });

  const onSubmit = async (data) => {
    if (!stripe || !elements) return;
    try {
      const {data} = await createPayment({ userId: uId, courseId: cId });
      // console.log(data.data.clientSecret)
      const resStripe = await stripe.confirmCardPayment(data?.data?.clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
  
      });

      if (resStripe.error) {
        toast.error(resStripe.error.message);
        return;
      } else {
        toast.success("Order placed successfully!");
        navigate(`/order-confirmation`);
        return;
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to place order", error);
    }
  };

  return (
    <div className="container min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-lg border-none">
          <CardHeader className="text-center py-6">
            <CardTitle className="text-3xl font-bold">Checkout</CardTitle>
            <CardDescription>Complete your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputField
                id="fullName"
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
                id="address"
                label="Address"
                register={register}
                errors={errors}
              />
              <InputField
                id="city"
                label="City"
                register={register}
                errors={errors}
              />
              <InputField
                id="zipCode"
                label="Zip Code"
                type="text"
                register={register}
                errors={errors}
              />
              <CardElement className="border p-2 rounded" />
              <Button size="lg" type="submit" className="w-full">
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
