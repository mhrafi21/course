import { Button } from "@/components/ui/button";
import React from "react";

const CallToAction = () => {
  return (
    <div>
      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container">
        <h2 className="text-3xl font-bold">
          Start Your Learning Journey Today
        </h2>
        <p className="text-lg mt-2">
          Join thousands of students and start achieving your goals.
        </p>
        <Button className="mt-6 bg-white text-blue-600 hover:bg-gray-200">
          Get Started
        </Button>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
