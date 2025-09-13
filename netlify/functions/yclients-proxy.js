exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ success: false, error: 'Request body is required' })
            };
        }

        const requestData = JSON.parse(event.body);
        
        if (!requestData.url || !requestData.method) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ success: false, error: 'URL and method are required' })
            };
        }

        const response = await fetch(requestData.url, {
            method: requestData.method,
            headers: requestData.headers || {},
            body: requestData.body ? JSON.stringify(requestData.body) : undefined
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
                error: error.message || 'Internal server error'
            })
        };
    }
};
