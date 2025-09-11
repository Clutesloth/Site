import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Search, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  XCircle,
  Target,
  Award
} from "lucide-react";

const AuditService = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;

  const colorClasses = {
    bg: "from-purple-500 to-purple-600",
    hover: "from-purple-600 to-purple-700",
    text: "text-purple-600",
    bgLight: "bg-purple-50",
    border: "border-purple-200"
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div>
            <div className="space-y-8">
              <div>
                <div className={`inline-flex p-3 rounded-2xl ${colorClasses.bgLight} mb-6`}>
                  <div className={`${colorClasses.text}`}>
                    <Search className="h-8 w-8" />
                  </div>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {data.title}
                </h2>
                <p className={`text-xl ${colorClasses.text} font-semibold mb-4`}>
                  {data.subtitle}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Stats highlight */}
              <div className={`bg-gradient-to-r ${colorClasses.bg} p-6 rounded-2xl text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{data.stats.main}</div>
                    <div className="text-sm opacity-90">{data.stats.description}</div>
                  </div>
                  <Shield className="h-12 w-12 opacity-80" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Problems */}
                <Card className="border-red-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-red-700 mb-4 flex items-center">
                      <XCircle className="h-5 w-5 mr-2" />
                      Проблемы, которые решает:
                    </h4>
                    <ul className="space-y-2">
                      {data.problems?.map((problem, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card className={`${colorClasses.border}`}>
                  <CardContent className="p-6">
                    <h4 className={`font-semibold ${colorClasses.text} mb-4 flex items-center`}>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Что включает аудит:
                    </h4>
                    <ul className="space-y-2">
                      {data.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className={`h-4 w-4 ${colorClasses.text} mt-0.5 flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Benefits */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-green-700 mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Ваши выгоды:
                    </h4>
                    <ul className="space-y-2">
                      {data.benefits?.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Target audience */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-blue-700 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Кому подходит:
                    </h4>
                    <ul className="space-y-2">
                      {data.target?.map((target, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{target}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Deliverables */}
              {data.deliverables && (
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-purple-700 mb-4">
                      По итогам аудита вы получите:
                    </h4>
                    <ul className="space-y-3">
                      {data.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Shield className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => window.open('https://t.me/chmarket_bot', '_blank')}
                  className={`w-full sm:w-auto bg-gradient-to-r ${colorClasses.bg} hover:${colorClasses.hover} text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl`}
                  size="lg"
                >
                  Заказать аудит филиала
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${colorClasses.bg} opacity-10 rounded-3xl`}></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditService;