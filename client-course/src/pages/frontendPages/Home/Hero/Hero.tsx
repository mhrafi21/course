import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import React from "react";

const Hero: React.FunctionComponent = () => {
  return (

      
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <div className="container">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-4">
          Elevate Your Learning
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-lg max-w-2xl">
          Master new skills with interactive courses and hands-on projects.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button className="mt-6 px-6 py-3 text-lg bg-white text-blue-500">Start Learning</Button>
        </motion.div>
            </div>
      </section>

  );
}

export default Hero;