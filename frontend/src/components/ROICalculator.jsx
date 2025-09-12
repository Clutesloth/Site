import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Calculator, TrendingUp, AlertTriangle } from "lucide-react";

const ROICalculator = () => {
  const [servicePrice, setServicePrice] = useState(1500);
  const [missedCalls, setMissedCalls] = useState(10);
  const [totalLoss, setTotalLoss] = useState(15000);

  useEffect(() => {
    setTotalLoss(servicePrice * missedCalls);
  }, [servicePrice, missedCalls]);

  const monthlyLoss = totalLoss;
  const yearlyLoss = monthlyLoss * 12;
  const botCost = 990; // примерная стоимость бота в месяц
  const monthlySavings = monthlyLoss * 0.7; // предполагаем, что бот сохранит 70% от потерь
  const roi = ((monthlySavings - botCost) / botCost) * 100;

  return (
    <section id="roi-calculator" className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-cyan-300 opacity-20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-300 opacity-15 rounded-full blur-md"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
            <Calculator className="h-12 w-12 text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            🧮 Калькулятор ROI
          </h2>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Рассчитайте, сколько денег вы теряете из-за пропущенных звонков
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Calculator Input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Введите ваши данные:
                </h3>

                <div className="space-y-6">
                  {/* Service Price */}
                  <div className="space-y-2">
                    <Label htmlFor="service-price" className="text-gray-700 font-medium">
                      Средняя стоимость услуги (₽)
                    </Label>
                    <Input
                      id="service-price"
                      type="number"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(Number(e.target.value))}
                      className="h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      min="0"
                      step="100"
                    />
                  </div>

                  {/* Missed Calls Slider */}
                  <div className="space-y-4">
                    <Label htmlFor="missed-calls" className="text-gray-700 font-medium">
                      Пропущенные звонки в месяц: {missedCalls}
                    </Label>
                    <div className="relative">
                      <input
                        id="missed-calls"
                        type="range"
                        min="1"
                        max="50"
                        value={missedCalls}
                        onChange={(e) => setMissedCalls(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>1</span>
                        <span>25</span>
                        <span>50</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div className="grid grid-cols-3 gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setServicePrice(800); setMissedCalls(5)}}
                      className="text-xs"
                    >
                      Маленький салон
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setServicePrice(1500); setMissedCalls(10)}}
                      className="text-xs"
                    >
                      Средний салон
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setServicePrice(2500); setMissedCalls(20)}}
                      className="text-xs"
                    >
                      Большой салон
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Loss Card */}
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">💸 Ваши потери</h3>
                  <AlertTriangle className="h-8 w-8 opacity-80" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>В месяц:</span>
                    <span className="text-2xl font-bold">{monthlyLoss.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>В год:</span>
                    <span className="text-3xl font-bold">{yearlyLoss.toLocaleString()} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Card */}
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">💰 С нашим решением Вы сохраните</h3>
                  <TrendingUp className="h-8 w-8 opacity-80" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>В месяц:</span>
                    <span className="text-2xl font-bold">{Math.round(monthlySavings).toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ROI:</span>
                    <span className="text-3xl font-bold">{Math.round(roi)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-bold text-white mb-4">
                  Готовы перестать терять деньги?
                </h4>
                <Button
                  onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  Подключить бот за 3 минуты
                </Button>
                <p className="text-blue-100 text-sm mt-3">
                  3 дня бесплатного тестирования
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
};

export default ROICalculator;