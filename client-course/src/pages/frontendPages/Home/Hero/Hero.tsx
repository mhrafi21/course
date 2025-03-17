
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section 
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: "url('../../../../assets/images/forgot.svg')" }}>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Animated Title */}
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold text-white leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Master New Skills, <br /> 
          <span className="text-primary">Anytime, Anywhere.</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-lg text-gray-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Discover top-rated courses and start your learning journey with world-class instructors.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="mt-8 flex justify-center flex-col lg:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Button className="px-8 py-3 text-lg bg-white text-primary rounded-full shadow-md hover:bg-gray-100">
            Explore Courses
          </Button>
          <Button className="px-8 py-3 text-lg bg-secondary text-white rounded-full shadow-md hover:bg-secondary/90">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
