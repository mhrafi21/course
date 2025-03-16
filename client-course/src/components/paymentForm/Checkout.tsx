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
import { useCreateEnrollMutation, useCreatePaymentMutation } from "@/redux/baseApi";
import { useAuth } from "@/hooks/useAuth";

const CheckoutPage = () => {
  const [createPayment] = useCreatePaymentMutation(undefined);
  const [createEnrollment] = useCreateEnrollMutation(undefined);
  const {  user } = useAuth();
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

  const onSubmit = async (info: any) => {

    if (!stripe || !elements) return;
    console.log(info);
    try {
      const {data} = await createPayment({ userId: uId, courseId: cId });
      // console.log(data)
      const resStripe = await stripe.confirmCardPayment(data?.data?.clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      // enrolment api call
    


      if (resStripe.error) {
        toast.error(resStripe.error.message);
        return;
      } else {

        const enrollRes = await createEnrollment({ userId: user?.id, courseId: cId, paymentId: resStripe?.paymentIntent?.id }).unwrap();
        if (!enrollRes.success) {
          toast.error("Failed to enroll", enrollRes);
          return;
        }

        toast.success("Enrollment placed successfully!");
        navigate(`/order-confirmation`);
        return;
      }
    } catch (error: any) {
 console.error(error.data)
      toast.error(error?.data?.message || "Already Enrolled");
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
