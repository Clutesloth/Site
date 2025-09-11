import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Phone, 
  Users, 
  Search, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  XCircle,
  Target,
  Award
} from "lucide-react";

const Services = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getIcon = (iconName) => {
    const icons = {
      phone: Phone,
      users: Users,
      search: Search
    };
    const IconComponent = icons[iconName] || Phone;
    return <IconComponent className="h-8 w-8" />;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "from-blue-500 to-blue-600",
        hover: "from-blue-600 to-blue-700",
        text: "text-blue-600",
        bgLight: "bg-blue-50",
        border: "border-blue-200"
      },
      green: {
        bg: "from-green-500 to-green-600", 
        hover: "from-green-600 to-green-700",
        text: "text-green-600",
        bgLight: "bg-green-50",
        border: "border-green-200"
      },
      purple: {
        bg: "from-purple-500 to-purple-600",
        hover: "from-purple-600 to-purple-700", 
        text: "text-purple-600",
        bgLight: "bg-purple-50",
        border: "border-purple-200"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-blue-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Наши решения для{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              вашего роста
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Три мощных инструмента для увеличения прибыли вашего салона красоты
          </p>
        </motion.div>

        <div className="space-y-24">
          {data?.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getIcon = (iconName) => {
    const icons = {
      phone: Phone,
      users: Users,
      search: Search
    };
    const IconComponent = icons[iconName] || Phone;
    return <IconComponent className="h-8 w-8" />;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "from-blue-500 to-blue-600",
        hover: "from-blue-600 to-blue-700",
        text: "text-blue-600",
        bgLight: "bg-blue-50",
        border: "border-blue-200"
      },
      green: {
        bg: "from-green-500 to-green-600", 
        hover: "from-green-600 to-green-700",
        text: "text-green-600",
        bgLight: "bg-green-50",
        border: "border-green-200"
      },
      purple: {
        bg: "from-purple-500 to-purple-600",
        hover: "from-purple-600 to-purple-700", 
        text: "text-purple-600",
        bgLight: "bg-purple-50",
        border: "border-purple-200"
      }
    };
    return colors[color] || colors.blue;
  };
  
  const colorClasses = getColorClasses(service.color);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`grid lg:grid-cols-2 gap-12 items-center ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
        <div className="space-y-8">
          <div>
            <div className={`inline-flex p-3 rounded-2xl ${colorClasses.bgLight} mb-6`}>
              <div className={`${colorClasses.text}`}>
                {getIcon(service.icon)}
              </div>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {service.title}
            </h3>
            <p className={`text-xl ${colorClasses.text} font-semibold mb-4`}>
              {service.subtitle}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Stats highlight */}
          <div className={`bg-gradient-to-r ${colorClasses.bg} p-6 rounded-2xl text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{service.stats.main}</div>
                <div className="text-sm opacity-90">{service.stats.description}</div>
              </div>
              <TrendingUp className="h-12 w-12 opacity-80" />
            </div>
          </div>

          {/* Example calculation for calls bot */}
          {service.id === 1 && service.example && (
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Представьте ситуацию:
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>• Ваша услуга стоит <span className="font-bold">{service.example.price}</span></p>
                  <p>• Администраторы пропустили <span className="font-bold">{service.example.calls} звонков</span> от новых клиентов</p>
                  <p className="text-red-600 font-bold text-lg">
                    Результат — минус {service.example.loss} выручки 💸
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Problems */}
            <Card className="border-red-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-red-700 mb-4 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Проблемы, которые решает:
                </h4>
                <ul className="space-y-2">
                  {service.problems?.map((problem, idx) => (
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
                  Что делает бот:
                </h4>
                <ul className="space-y-2">
                  {service.features?.map((feature, idx) => (
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
                  {service.benefits?.map((benefit, idx) => (
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
                  {service.target?.map((target, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Special deliverables for audit service */}
          {service.deliverables && (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-purple-700 mb-4">
                  По итогам аудита вы получите:
                </h4>
                <ul className="space-y-3">
                  {service.deliverables.map((item, idx) => (
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
              Подключить {service.title.toLowerCase()}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={index % 2 === 1 ? "lg:order-1" : ""}
      >
        <div className="relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-auto rounded-3xl shadow-2xl"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${colorClasses.bg} opacity-10 rounded-3xl`}></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Services;