import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { TrendingUp, Shield, Zap, Phone } from "lucide-react";

const Hero = ({ data }) => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 sm:pt-20">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-4 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-8 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Автоматизация{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Вашего бизнеса
                </span>{" "}
                для роста прибыли
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-600 mt-4 sm:mt-6 leading-relaxed"
              >
                {data?.title || "Боты для салонов красоты, которые увеличивают выручку на 25-40% через контроль звонков и мотивацию персонала"}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
            >
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg leading-tight">Контроль работы персонала</span>
                </div>
              </div>
              
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg leading-tight">Рост продаж</span>
                </div>
              </div>
              
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  </div>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg leading-tight">Аудит системы</span>
                </div>
              </div>
              
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  </div>
                  <span className="text-gray-900 font-semibold text-sm sm:text-base lg:text-lg leading-tight">Автоматизация</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 touch-target"
                size="lg"
              >
                Подключить бесплатно
              </Button>
              
              <Button 
                onClick={scrollToServices}
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 touch-target"
                size="lg"
              >
                Узнать больше
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 sm:p-6 rounded-2xl border border-blue-200"
            >
              <p className="text-blue-800 text-base sm:text-lg font-semibold mb-2">
                🚀 3 дня бесплатного тестирования
              </p>
              <p className="text-blue-600 text-sm sm:text-base">
                Протестируйте все возможности без ограничений. Никаких скрытых платежей.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative z-10">
              <img
                src="https://customer-assets.emergentagent.com/job_salon-optimizer/artifacts/8lqeryhi_Slide%2016_9%20-%201.jpg"
                alt="StataBots Dashboard"
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl border-4 sm:border-8 border-white"
              />
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-blue-100 z-20"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Активен</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [20, -20, 20] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-blue-100 z-20"
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">+25% выручка</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;