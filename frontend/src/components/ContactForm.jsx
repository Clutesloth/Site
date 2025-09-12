import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { 
  User, 
  Phone, 
  Building, 
  MessageCircle, 
  Send,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: "",
    comment: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Пожалуйста, укажите ваше имя");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Пожалуйста, укажите номер телефона");
      return false;
    }
    if (!formData.businessName.trim()) {
      toast.error("Пожалуйста, укажите название вашего салона");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Netlify Forms submission
      const formData = new FormData(e.target);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            phone: "",
            businessName: "",
            comment: ""
          });
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Ошибка отправки формы');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Произошла ошибка при отправке. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-white via-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Готовы увеличить прибыль своего салона?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами для бесплатной консультации и настройки боте под ваш бизнес
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12">
              {!isSubmitted ? (
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        Ваше имя *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Введите ваше имя"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-blue-600" />
                        Номер телефона *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Business Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-gray-700 font-medium flex items-center">
                      <Building className="h-4 w-4 mr-2 text-blue-600" />
                      Название салона/точки *
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      type="text"
                      placeholder="Введите название вашего салона"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Comment Field */}
                  <div className="space-y-2">
                    <Label htmlFor="comment" className="text-gray-700 font-medium flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2 text-blue-600" />
                      Дополнительная информация (опционально)
                    </Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      placeholder="Расскажите о ваших потребностях, количестве сотрудников, особенностях бизнеса..."
                      value={formData.comment}
                      onChange={handleInputChange}
                      rows={4}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-4"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Отправляем...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Связаться со мной
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    * Обязательные поля для заполнения
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Заявка успешно отправлена!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Мы получили вашу заявку и свяжемся с вами в течение 1 часа для обсуждения деталей.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800 font-medium">
                      📞 Или напишите нам прямо сейчас в Telegram: 
                      <a 
                        href="https://t.me/chmarket_bot" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1 underline hover:text-blue-600"
                      >
                        @chmarket_bot
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-12 text-center"
        >
          <div className="bg-white/60 p-6 rounded-xl">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Бесплатная консультация</h4>
            <p className="text-gray-600 text-sm">Обсудим ваши потребности и подберем оптимальное решение</p>
          </div>

          <div className="bg-white/60 p-6 rounded-xl">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Быстрый ответ</h4>
            <p className="text-gray-600 text-sm">Свяжемся с вами в течение 1 часа в рабочее время</p>
          </div>

          <div className="bg-white/60 p-6 rounded-xl">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Send className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Персональный подход</h4>
            <p className="text-gray-600 text-sm">Настроим боты специально под ваш салон и бизнес-процессы</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;