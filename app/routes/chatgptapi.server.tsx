import axios from "axios";
import OpenAI from "openai";

const bingApiKey = process.env.BING_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: openaiApiKey });

async function completeContent(description : string) {
    // console.log(description)
    const summary = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 2048,
        prompt: `This is a framented sentence: ${description},
                please give just the completed the sentence and nothing else, thank you.`
    });
    console.log(summary.choices[0].text)
    return summary.choices[0].text;
}


export default async function fetchTopArticlesInCategory(category : string, numArticles : number) {
    console.log("API Key:", process.env.OPENAI_API_KEY);

    const API_ENDPOINT = `https://api.bing.microsoft.com/v7.0/news/search?q=${category}&count=${numArticles}&mkt=en-US`;

    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'Ocp-Apim-Subscription-Key': bingApiKey
            }
        });

        if (response.data && response.data.value && response.data.value.length > 0) {
            return Promise.all(response.data.value.map(async (article : any) => {
                const completedDescription = await completeContent(article.description);
                return {
                    id: article.id,
                    title: article.name,
                    link: article.url,
                    description: completedDescription,
                    provider: article.provider,
                    images: {
                           created: 1702245926,
                           data: [
                             { // placeholder
                               revised_prompt: "Visualize a bustling financial cityscape in the western region of India, filled with gleaming skyscrapers and futuristic architecture. Sustainable elements such as solar panels, wind turbines, and green rooftops are integrated into buildings. Display an influx of investments, represented by gold coins raining from the sky towards the city. In the backdrop, a large 2070 sign hovers, symbolising the country's goal of reaching net-zero emissions by that year. The city is representative of a center for global sustainable finance.",
                               url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-fDto3oBkSGOXz664l4gfhJc8/user-6rIgL4HZIgusvPGmoDEi1PFK/img-XhdVJ72iygET3TACgO62YA8r.png?st=2023-12-10T21%3A05%3A26Z&se=2023-12-10T23%3A05%3A26Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-09T23%3A13%3A38Z&ske=2023-12-10T23%3A13%3A38Z&sks=b&skv=2021-08-06&sig=4u%2BhZ5Z5Du/6FnzP/FmqRRmQ5PKVfdwSMEjFBuyxWsM%3D'
                             }
                           ]
                         }
                };
            }));
            
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}