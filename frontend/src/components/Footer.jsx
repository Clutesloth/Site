import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_salon-optimizer/artifacts/e34f2f9c_%D0%9B%D0%BE%D0%B3%D0%BE%20%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B5%20%D0%B3%D0%BE%D1%80.png"
                alt="StataBots"
                className="h-8"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Автоматизация YCLIENTS для роста прибыли салонов красоты. 
              Помогаем бизнесу увеличивать выручку через современные боты и аналитику.
            </p>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                <span className="font-semibold text-white">5+ лет</span> опыта в сфере красоты
              </p>
              <p className="text-gray-400 text-sm">
                <span className="font-semibold text-white">1000+</span> довольных клиентов
              </p>
              <p className="text-gray-400 text-sm">
                <span className="font-semibold text-white">25-40%</span> рост прибыли
              </p>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold">Наши услуги</h3>
            <div className="space-y-4">
              <div className="group cursor-pointer">
                <h4 className="font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                  Бот "Пропущенные звонки"
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  Контроль каждого звонка для увеличения записей на 30%
                </p>
              </div>
              <div className="group cursor-pointer">
                <h4 className="font-medium text-green-400 group-hover:text-green-300 transition-colors">
                  Бот "Показатели сотрудников"
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  Мотивация персонала через рейтинги и статистику
                </p>
              </div>
              <div className="group cursor-pointer">
                <h4 className="font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                  Аудит филиала YCLIENTS
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  Комплексный анализ для максимального роста
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold">Свяжитесь с нами</h3>
            <div className="space-y-4">
              <motion.a
                href="https://t.me/chmarket_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Telegram бот</div>
                  <div className="text-sm opacity-75">@chmarket_bot</div>
                </div>
              </motion.a>

              <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-6 rounded-2xl border border-blue-800/30">
                <h4 className="font-semibold text-blue-400 mb-3">
                  🚀 Начните прямо сейчас
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  3 дня бесплатного тестирования всех возможностей
                </p>
                <motion.button
                  onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Подключить бесплатно
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 StataBots. Все права защищены.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a 
              href="https://disk.yandex.ru/i/T1AHhAkiY6_Imw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
            >
              Политика конфиденциальности
            </a>
            <a 
              href="https://disk.yandex.ru/i/Hr69Ud4rjlw16Q"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer"
            >
              Публичная оферта
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;