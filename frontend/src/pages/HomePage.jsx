import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ServicesWithCalculator from "../components/ServicesWithCalculator";
import StatsInfographic from "../components/StatsInfographic";
import TestPeriod from "../components/TestPeriod";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import SupportButtons from "../components/SupportButtons";
import AnimatedBackground from "../components/AnimatedBackground";
import { mockData } from "../data/mock";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Имитируем загрузку данных
    setTimeout(() => {
      setData(mockData);
    }, 100);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>StataBots - Автоматизация бизнеса для роста прибыли</title>
        <meta name="description" content="Боты для салонов красоты, которые увеличивают выручку на 25-40% через контроль звонков и мотивацию персонала" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      {/* YCLIENTS Integration Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
const YCLIENTS_CONFIG = {
    applicationIds: [18082, 19111],
    partnerToken: '78jguc295wwryg723f4j',
    installUrl: 'https://api.yclients.com/marketplace/partner/callback',
    proxyUrl: 'http://91.107.122.62/yclients-proxy.php',
    webhookUrl: 'http://91.107.122.62/yclients-proxy.php?webhook=1',
    debugMode: true,
    telegramBotUsername: 'chmarket_bot'
};

class YClientsIntegration {
    constructor() {
        this.salonId = null;
        this.init();
    }

    async init() {
        try {
            console.log('YCLIENTS Integration starting...');
            
            const credentials = this.getCredentialsFromUrl();
            
            if (!credentials.salon_id) {
                console.log('Нет salon_id в URL - ожидание пользователя');
                return;
            }
            
            this.salonId = credentials.salon_id;
            
            console.log('Найдены данные:', {
                salon_id: credentials.salon_id,
                action: credentials.action || 'install',
                has_api_key: !!credentials.api_key
            });
            
            this.updateTelegramLink(credentials.salon_id);
            
            if (this.isAlreadySent(credentials.salon_id, credentials.action)) {
                console.log('Данные уже отправлены в этой сессии');
                return;
            }
            
            await this.delay(1000);
            await this.sendViaProxy(credentials);
            
        } catch (error) {
            console.error('Ошибка интеграции:', error.message);
        }
    }

    getCredentialsFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        
        let salon_id = urlParams.get('salon_id') || 
                      urlParams.get('company_id') || 
                      urlParams.get('salonId');
        
        if (!salon_id) {
            console.log('Анализируем все параметры URL...');
            
            for (const [key, value] of urlParams.entries()) {
                console.log(\`\${key}: \${value}\`);
            }
            
            const salon0 = urlParams.get('salon_ids[0]');
            if (salon0) {
                salon_id = salon0;
                console.log(\`Найден salon_id в массиве: \${salon_id}\`);
            }
            
            const userData = urlParams.get('user_data');
            if (userData && !salon_id) {
                try {
                    const decodedData = atob(userData);
                    const userInfo = JSON.parse(decodedData);
                    console.log('Данные пользователя:', userInfo);
                    
                    if (userInfo.salon_id) {
                        salon_id = userInfo.salon_id;
                        console.log(\`Найден salon_id в user_data: \${salon_id}\`);
                    }
                } catch (e) {
                    console.log('Ошибка декодирования user_data:', e);
                }
            }
        }
        
        const action = urlParams.get('action') || 'install';
        const api_key = urlParams.get('api_key') || null;
        
        return { salon_id, action, api_key };
    }

    async sendViaProxy(credentials) {
        try {
            console.log('Отправляем через прокси...');
            
            const url = 'https://api.yclients.com/marketplace/partner/callback';
            
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': \`Bearer \${YCLIENTS_CONFIG.partnerToken}\`,
                'Accept': 'application/vnd.api.v2+json'
            };

            for (const applicationId of YCLIENTS_CONFIG.applicationIds) {
                const requestData = {
                    salon_id: parseInt(credentials.salon_id),
                    application_id: applicationId
                };

                if (credentials.action !== 'redirect') {
                    requestData.webhook_urls = [YCLIENTS_CONFIG.webhookUrl];
                }

                const proxyData = {
                    url: url,
                    method: 'POST',
                    headers: headers,
                    body: requestData
                };

                console.log(\`Данные для прокси (app_id: \${applicationId}):\`, {
                    url: url,
                    salon_id: requestData.salon_id,
                    application_id: requestData.application_id
                });

                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 15000);

                    const response = await fetch(YCLIENTS_CONFIG.proxyUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(proxyData),
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (response.ok) {
                        const result = await response.json();
                        console.log(\`Ответ от прокси (app_id: \${applicationId}):\`, result);

                        if (result.success || result.status_code === 201 || result.status_code === 301) {
                            console.log(\`Запрос для app_id \${applicationId} выполнен успешно!\`);
                        } else if (result.status_code === 403) {
                            console.log(\`Приложение \${applicationId} уже установлено (403)\`);
                        } else {
                            console.log(\`Ошибка от YClients для app_id \${applicationId}:\`, result);
                        }
                    } else {
                        console.log(\`Ошибка HTTP для app_id \${applicationId}:\`, response.status);
                    }
                } catch (error) {
                    if (error.name === 'AbortError') {
                        console.log(\`Timeout запроса для app_id \${applicationId}\`);
                    } else {
                        console.log(\`Ошибка при отправке для app_id \${applicationId}:\`, error.message);
                    }
                }
            }

            this.markAsSent(credentials.salon_id, credentials.action);
            return true;

        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Timeout запроса');
            } else {
                console.log('Ошибка при отправке:', error.message);
            }
            return false;
        }
    }

    updateTelegramLink(salonId) {
        try {
            const telegramLink = this.generateTelegramLink(salonId);
            console.log('Ссылка на Telegram бота:', telegramLink);
            
            const possibleSelectors = [
                '#telegram-button',
                '.telegram-button', 
                'a[href*="t.me/chmarket_bot"]',
                'a[href*="chmarket_bot"]',
                '[data-telegram]',
                '.bot-link',
                '#bot-link'
            ];
            
            let updated = false;
            
            possibleSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (element.tagName === 'A') {
                        element.href = telegramLink;
                        updated = true;
                        console.log(\`Обновлена ссылка для: \${selector}\`);
                    }
                });
            });
            
            if (!updated) {
                this.findAndUpdateTelegramLinksByText(telegramLink);
            }
            
            window.telegramBotLink = telegramLink;
            
        } catch (error) {
            console.error('Ошибка при обновлении ссылки на Telegram:', error);
        }
    }

    generateTelegramLink(salonId) {
        if (!salonId) {
            return \`https://t.me/\${YCLIENTS_CONFIG.telegramBotUsername}\`;
        }
        return \`https://t.me/\${YCLIENTS_CONFIG.telegramBotUsername}?start=salon_\${salonId}\`;
    }

    findAndUpdateTelegramLinksByText(telegramLink) {
        try {
            const allLinks = document.querySelectorAll('a');
            
            allLinks.forEach(link => {
                const href = link.href || '';
                const text = link.textContent || '';
                
                if (href.includes('t.me/chmarket_bot') || 
                    href.includes('chmarket_bot') ||
                    text.toLowerCase().includes('бот') ||
                    text.toLowerCase().includes('telegram')) {
                    
                    link.href = telegramLink;
                    console.log(\`Обновлена ссылка: "\${text}"\`);
                }
            });
            
        } catch (error) {
            console.error('Ошибка при поиске ссылок:', error);
        }
    }

    isAlreadySent(salonId, action) {
        const sentKey = \`yclients_sent_\${salonId}_\${action}\`;
        const lastSent = sessionStorage.getItem(sentKey);
        if (!lastSent) return false;
        
        const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
        return parseInt(lastSent) > tenMinutesAgo;
    }

    markAsSent(salonId, action) {
        const sentKey = \`yclients_sent_\${salonId}_\${action}\`;
        sessionStorage.setItem(sentKey, Date.now().toString());
        console.log(\`Отмечено как отправленное: \${sentKey}\`);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getTelegramLink() {
        return this.generateTelegramLink(this.salonId);
    }
}

let yclientsIntegration = null;

document.addEventListener('DOMContentLoaded', function() {
    yclientsIntegration = new YClientsIntegration();
    window.yclientsIntegration = yclientsIntegration;
});

window.testYClients = {
    install: (salonId) => {
        const url = new URL(window.location);
        url.searchParams.set('salon_id', salonId);
        url.searchParams.set('action', 'install');
        window.location.href = url.toString();
    },
    clear: () => {
        sessionStorage.clear();
        localStorage.clear();
        console.log('Кэш очищен');
    },
    getTelegramLink: () => {
        if (yclientsIntegration) {
            const link = yclientsIntegration.getTelegramLink();
            console.log('Текущая ссылка на бота:', link);
            return link;
        }
        return null;
    },
    manualTest: (salonId, action = 'install') => {
        console.log(\`Ручное тестирование: salon_id=\${salonId}, action=\${action}\`);
        const credentials = { salon_id: salonId, action: action };
        
        if (yclientsIntegration) {
            yclientsIntegration.sendViaProxy(credentials).then(success => {
                console.log('Тест результат:', success ? 'Успех' : 'Ошибка');
            });
        }
    }
};

console.log('YClients Integration v9.0 (Fixed URL) loaded');
        `
      }} />
      
      <Header />
      <Hero data={data.hero} />
      <ServicesWithCalculator data={data.services} />
      <StatsInfographic />
      <TestPeriod data={data.testPeriod} />
      <ContactForm />
      <Footer />
      <SupportButtons />
    </div>
  );
};

export default HomePage;