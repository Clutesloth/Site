import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Calculator, TrendingUp, AlertTriangle, Zap, Target } from "lucide-react";

const ROICalculator = () => {
  const [servicePrice, setServicePrice] = useState(1500);
  const [missedCalls, setMissedCalls] = useState(10);
  const [totalLoss, setTotalLoss] = useState(15000);

  useEffect(() => {
    setTotalLoss(servicePrice * missedCalls);
  }, [servicePrice, missedCalls]);

  const monthlyLoss = totalLoss;
  const yearlyLoss = monthlyLoss * 12;
  const botCost = 2000; // обновленная стоимость бота в месяц
  const monthlySavings = monthlyLoss * 0.7; // предполагаем, что бот сохранит 70% от потерь
  const roi = ((monthlySavings - botCost) / botCost) * 100;

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-400 rounded-full opacity-15 blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400 rounded-full opacity-20 blur-xl animate-ping"></div>
        <div className="absolute bottom-1/4 left-3/4 w-20 h-20 bg-indigo-400 rounded-full opacity-10 blur-2xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <section id="roi-calculator" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-3xl mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Calculator className="h-16 w-16 text-white" />
            </motion.div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              🧮 Калькулятор экономии
            </h2>
            
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Узнайте, сколько денег вы теряете из-за пропущенных звонков и какую прибыль получите с нашим решением
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Calculator Input */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Target className="h-6 w-6 mr-3" />
                  Введите ваши данные
                </h3>

                <div className="space-y-8">
                  {/* Service Price */}
                  <div className="space-y-4">
                    <Label htmlFor="service-price" className="text-white font-medium text-lg">
                      Средняя стоимость услуги (₽)
                    </Label>
                    <Input
                      id="service-price"
                      type="number"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(Number(e.target.value))}
                      className="h-14 text-lg bg-white/20 border-white/30 focus:border-white focus:ring-white text-white placeholder:text-white/60"
                      min="0"
                      step="100"
                    />
                  </div>

                  {/* Missed Calls Slider */}
                  <div className="space-y-6">
                    <Label htmlFor="missed-calls" className="text-white font-medium text-lg">
                      Пропущенные звонки в месяц: <span className="text-yellow-300 font-bold text-xl">{missedCalls}</span>
                    </Label>
                    <div className="relative">
                      <input
                        id="missed-calls"
                        type="range"
                        min="1"
                        max="50"
                        value={missedCalls}
                        onChange={(e) => setMissedCalls(Number(e.target.value))}
                        className="w-full h-4 bg-white/20 rounded-lg appearance-none cursor-pointer slider-custom"
                      />
                      <div className="flex justify-between text-sm text-white/60 mt-2">
                        <span>1</span>
                        <span>25</span>
                        <span>50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Loss Card */}
              <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-lg border border-red-300/30 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <AlertTriangle className="h-8 w-8 mr-3 text-red-300" />
                    💸 Ваши потери без нашего решения
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-red-500/10 rounded-2xl border border-red-300/20">
                    <div className="text-sm text-red-200 mb-2">В месяц:</div>
                    <div className="text-3xl lg:text-4xl font-bold text-white">{monthlyLoss.toLocaleString()} ₽</div>
                  </div>
                  <div className="text-center p-6 bg-red-600/10 rounded-2xl border border-red-300/20">
                    <div className="text-sm text-red-200 mb-2">В год:</div>
                    <div className="text-3xl lg:text-4xl font-bold text-white">{yearlyLoss.toLocaleString()} ₽</div>
                  </div>
                </div>
              </div>

              {/* Savings Card */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-lg border border-green-300/30 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <Zap className="h-8 w-8 mr-3 text-green-300" />
                    💰 С нашим решением Вы сохраните
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-green-500/10 rounded-2xl border border-green-300/20">
                    <div className="text-sm text-green-200 mb-2">Экономия в месяц:</div>
                    <div className="text-3xl lg:text-4xl font-bold text-white">{Math.round(monthlySavings).toLocaleString()} ₽</div>
                  </div>
                  <div className="text-center p-6 bg-emerald-500/10 rounded-2xl border border-emerald-300/20">
                    <div className="text-sm text-emerald-200 mb-2">ROI:</div>
                    <div className="text-3xl lg:text-4xl font-bold text-white">{Math.round(roi)}%</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-lg border border-blue-300/30 rounded-3xl p-8 text-center shadow-2xl"
              >
                <h4 className="text-2xl font-bold text-white mb-4">
                  🚀 Готовы перестать терять деньги?
                </h4>
                <p className="text-blue-100 mb-6 text-lg">
                  Окупаемость нашего решения всего за {Math.round(botCost / (monthlySavings - botCost) * 30)} дней!
                </p>
                <Button
                  onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Подключить за 3 минуты
                </Button>
                <p className="text-blue-200 text-sm mt-4">
                  3 дня бесплатного тестирования • Никаких скрытых платежей
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-white/10">
              <p className="text-white/80 text-lg">
                <strong className="text-white">Расчет основан на:</strong> стоимости решения {botCost.toLocaleString()}₽/мес и эффективности 70% предотвращения потерь
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .slider-custom::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          border: 3px solid white;
        }
        
        .slider-custom::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .slider-custom::-webkit-slider-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default ROICalculator;