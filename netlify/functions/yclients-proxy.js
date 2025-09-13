exports.handler = async (event, context) => {
    // Разрешаем только POST запросы
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Добавляем CORS заголовки
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Обрабатываем preflight запросы
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const requestData = JSON.parse(event.body);
        
        // Выполняем запрос к YClients API
        const response = await fetch(requestData.url, {
            method: requestData.method,
            headers: requestData.headers,
            body: JSON.stringify(requestData.body)
        });

        const result = await response.json();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: response.ok,
                status_code: response.status,
                data: result
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};
