import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Rocket, 
  CheckCircle, 
  Clock, 
  Users, 
  Headphones, 
  BookOpen 
} from "lucide-react";

const TestPeriod = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="test-period" 
      className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-cyan-300 opacity-20 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-300 opacity-15 rounded-full blur-md"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
            <Rocket className="h-12 w-12 text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {data?.title || "🚀 Тестовый период"}
          </h2>
          
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {data?.description || "Чтобы запустить пробный доступ, нажмите на кнопку \"Подключить\", далее в боте - «Связаться с менеджером». Всё максимально просто 👌"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl text-center">
                    <div className="text-3xl font-bold">{data?.duration || "3"}</div>
                    <div className="text-sm opacity-90">дня бесплатно</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Что включено в тестовый период:
                </h3>

                <div className="space-y-4">
                  {(data?.features || [
                    "Полный доступ ко всем функциям",
                    "Персональная настройка под ваш филиал", 
                    "Техническая поддержка 24/7",
                    "Обучение команды работе с ботами"
                  ]).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="bg-green-100 p-2 rounded-full">
                        {index === 0 && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {index === 1 && <Users className="h-5 w-5 text-green-600" />}
                        {index === 2 && <Headphones className="h-5 w-5 text-green-600" />}
                        {index === 3 && <BookOpen className="h-5 w-5 text-green-600" />}
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Как начать тестирование?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Нажмите "Подключить"</h4>
                    <p className="text-blue-100 text-sm">Кнопка перенаправит вас в наш Telegram-бот</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Свяжитесь с менеджером</h4>
                    <p className="text-blue-100 text-sm">В боте выберите "Связаться с менеджером"</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Начинайте тестировать</h4>
                    <p className="text-blue-100 text-sm">Получите полный доступ на 3 дня бесплатно</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center"
            >
              <Button
                onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
                className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto"
                size="lg"
              >
                <Rocket className="h-6 w-6 mr-2" />
                Начать бесплатный тест
              </Button>
            </motion.div>

            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-white" />
                <span className="text-white font-semibold">Важно знать:</span>
              </div>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li>• Никаких скрытых платежей или обязательств</li>
                <li>• Можете отменить в любое время</li>
                <li>• Полная техническая поддержка во время теста</li>
                <li>• Персональные консультации по настройке</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Готовы увеличить прибыль вашего салона?
            </h3>
            <p className="text-blue-100 mb-6">
              Более 1000+ салонов уже используют наши решения для роста бизнеса
            </p>
            <Button
              onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
              className="bg-gradient-to-r from-white to-blue-50 text-blue-600 hover:from-blue-50 hover:to-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Подключить прямо сейчас
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestPeriod;