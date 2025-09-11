import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import TestPeriod from "../components/TestPeriod";
import Footer from "../components/Footer";
import { mockData } from "../data/mock";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Имитируем загрузку данных
    setTimeout(() => {
      setData(mockData);
    }, 100);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero data={data.hero} />
      <Services data={data.services} />
      <TestPeriod data={data.testPeriod} />
      <Footer />
    </div>
  );
};

export default HomePage;