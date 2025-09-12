import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_salon-optimizer/artifacts/3b6d3rv3_6666.png"
              alt="StataBots"
              className="h-8"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection('roi-calculator')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Калькулятор
            </button>
            <button
              onClick={() => scrollToSection('test-period')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Тестовый период
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Связаться
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
              className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Подключить
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection('roi-calculator')}
                className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Калькулятор
              </button>
              <button
                onClick={() => scrollToSection('test-period')}
                className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Тестовый период
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Связаться
              </button>
              <Button 
                onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-full"
              >
                Подключить
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;