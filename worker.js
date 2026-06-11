export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    try {
      const { image } = await request.json();
      const key = env.GEMINI_KEY;

      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: image
                  }
                },
                {
                  text: 'What is the exact brand and model name of this mobile phone? Reply with ONLY the device name, nothing else. Example: "iPhone 7" or "Samsung Galaxy A54". If you cannot identify it, reply with "unknown".'
                }
              ]
            }],
            generationConfig: { maxOutputTokens: 30 }
          })
        }
      );

      const data = await res.json();
      let result = '';

      if (data.candidates && data.candidates[0]) {
        result = data.candidates[0].content.parts[0].text.trim();
        if (result.toLowerCase() === 'unknown') result = '';
      }

      return new Response(JSON.stringify({ result }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};
