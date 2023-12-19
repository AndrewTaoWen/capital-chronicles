import axios from "axios";
import OpenAI from "openai";

const bingApiKey = process.env.BING_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: openaiApiKey });

export default async function generateImages(description : string, numImages : number) {
    const headers = {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: `Here is the title of a news article followed by a short description: ${description}, 
            please provide me with images that can describe the news story`,
            n: 1,
            size: "512x512",
          });
        return response;
    } catch (error) {
        console.error('Error generating images:', error);
        return -1;
    }
}