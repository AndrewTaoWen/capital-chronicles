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
                    provider: article.provider
                };
            }));
            
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}