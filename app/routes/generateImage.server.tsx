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

    const body = {
        model: "dall-e-3",
        description,
        n: numImages,
        size: "1024x1024",
    };

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
          });
        console.log(response);
    } catch (error) {
        console.error('Error generating images:', error);
    }
}