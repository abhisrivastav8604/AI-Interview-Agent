// require('dotenv').config();
// const { GoogleGenAI } = require('@google/genai');
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// async function test() {
//     try {
//         const response = await ai.models.generateContent({
//             model: 'gemini-2.5-flash',
//             contents: 'say hello',
//         });
//         console.log(response.text);
//     } catch (e) {
//         console.log("FAIL", e.message);
//     }
// }
// test();
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 🔁 Retry wrapper
async function generateWithRetry(config, retries = 4, delay = 500) {
    try {
        return await ai.models.generateContent(config);
    } catch (e) {
        const status = e?.status;

        if ([429, 500, 502, 503, 504].includes(status) && retries > 0) {
            console.log(`Retrying... (${retries} left)`);

            await new Promise(res => setTimeout(res, delay));

            return generateWithRetry(config, retries - 1, delay * 2); // exponential backoff
        }

        throw e;
    }
}

async function test() {
    try {
        const response = await generateWithRetry({
            model: 'gemini-2.5-flash',
            contents: 'say hello',
        });

        console.log(response.text);

    } catch (e) {
        console.log("FAIL FINAL:", e.message);
    }
}

test();
