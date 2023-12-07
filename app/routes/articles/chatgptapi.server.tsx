import axios from "axios";
import OpenAI from "openai";
const openai = new OpenAI();

const API_KEY = process.env.BING_API_KEY;


async function completeContent(description : string) {
    // console.log(description)
    const summary = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 2048,
        prompt: `This is a framented sentence: ${description},
                please give just the completed the sentence, thank you.`
    });
    console.log(summary.choices[0].text)
    return summary.choices[0].text;
}


export default async function fetchTopArticlesInCategory(category : string) {
    const API_ENDPOINT = `https://api.bing.microsoft.com/v7.0/news/search?q=${category}&count=6&mkt=en-US`;

    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
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