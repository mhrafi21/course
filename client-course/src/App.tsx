import { RouterProvider } from "react-router";
import router from "./Routes/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </>
  );
}

export default App;
