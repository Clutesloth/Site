import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating circles */}
      <motion.div
        className="absolute w-4 h-4 bg-blue-200 rounded-full opacity-20"
        animate={{
          x: [0, 100, 200, 100, 0],
          y: [0, 150, 100, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: "10%", left: "10%" }}
      />
      
      <motion.div
        className="absolute w-6 h-6 bg-cyan-300 rounded-full opacity-15"
        animate={{
          x: [0, -80, -150, -80, 0],
          y: [0, 80, 120, 160, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
        style={{ top: "20%", right: "15%" }}
      />

      <motion.div
        className="absolute w-3 h-3 bg-purple-200 rounded-full opacity-25"
        animate={{
          x: [0, 120, 80, 160, 0],
          y: [0, -60, -100, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          delay: 5
        }}
        style={{ bottom: "30%", left: "20%" }}
      />

      <motion.div
        className="absolute w-5 h-5 bg-indigo-200 rounded-full opacity-20"
        animate={{
          x: [0, -100, -50, -150, 0],
          y: [0, 100, 180, 120, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
          delay: 8
        }}
        style={{ top: "60%", right: "25%" }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute w-8 h-8 border border-blue-300 opacity-15 rotate-45"
        animate={{
          rotate: [45, 135, 225, 315, 45],
          x: [0, 60, 120, 60, 0],
          y: [0, -80, -40, -120, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: "15%", left: "70%" }}
      />

      <motion.div
        className="absolute w-6 h-6 border-2 border-green-300 opacity-20"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 0.8, 1],
          x: [0, -70, -140, -70, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
          delay: 3
        }}
        style={{ bottom: "20%", right: "10%" }}
      />

      {/* Subtle gradient blobs */}
      <motion.div
        className="absolute w-32 h-32 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-10 blur-2xl"
        animate={{
          scale: [1, 1.3, 0.8, 1.1, 1],
          x: [0, 50, -30, 70, 0],
          y: [0, -40, 60, -20, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
        style={{ top: "40%", left: "5%" }}
      />

      <motion.div
        className="absolute w-24 h-24 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-12 blur-xl"
        animate={{
          scale: [1, 0.7, 1.2, 0.9, 1],
          x: [0, -60, -120, -30, 0],
          y: [0, 70, 20, 90, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
          delay: 7
        }}
        style={{ top: "70%", right: "30%" }}
      />

      {/* Tiny dots pattern */}
      <motion.div
        className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30"
        animate={{
          x: [0, 200, 100, 300, 0],
          y: [0, -50, -100, -25, 0],
          opacity: [0.3, 0.1, 0.4, 0.2, 0.3]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          delay: 4
        }}
        style={{ top: "50%", left: "40%" }}
      />

      <motion.div
        className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-25"
        animate={{
          x: [0, -150, -80, -200, 0],
          y: [0, 80, 140, 60, 0],
          opacity: [0.25, 0.4, 0.1, 0.35, 0.25]
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
          delay: 6
        }}
        style={{ top: "25%", right: "45%" }}
      />

      {/* Wave-like lines */}
      <motion.div
        className="absolute w-16 h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-20"
        animate={{
          rotate: [0, 15, -15, 30, 0],
          x: [0, 100, 50, 150, 0],
          y: [0, -30, 30, -60, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ bottom: "40%", left: "60%" }}
      />

      <motion.div
        className="absolute w-12 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-15"
        animate={{
          rotate: [0, -20, 20, -10, 0],
          x: [0, -80, -40, -120, 0],
          y: [0, 40, 80, 20, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
          delay: 9
        }}
        style={{ top: "80%", left: "30%" }}
      />
    </div>
  );
};

export default AnimatedBackground;