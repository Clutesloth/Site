import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Clock, DollarSign } from "lucide-react";

const StatsInfographic = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      icon: TrendingUp,
      value: "25-40%",
      label: "Рост прибыли",
      description: "Средний рост выручки наших клиентов",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      value: "1000+",
      label: "Довольных клиентов",
      description: "Салонов уже используют наши решения",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      value: "4+ часа",
      label: "Экономии времени",
      description: "Ежедневно на автоматизации процессов",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: DollarSign,
      value: "5+ лет",
      label: "Опыта на рынке",
      description: "Глубокая экспертиза в сфере красоты",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            📈 Результаты в цифрах
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Данные, которые говорят сами за себя
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}></div>
              
              <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 text-center group-hover:-translate-y-2">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-6`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>

                {/* Animated progress bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                  className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mt-4 mx-auto opacity-60`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional animated elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-3xl border border-blue-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🚀 Присоединяйтесь к успешным салонам!
            </h3>
            <p className="text-gray-600 mb-6">
              Более 1000 салонов уже автоматизировали свой бизнес с нашими решениями
            </p>
            <motion.button
              onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Начать бесплатное тестирование
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsInfographic;