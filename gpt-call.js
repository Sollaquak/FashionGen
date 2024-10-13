import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openAIClient = new OpenAI();

const genDescription = async (input_url) => {
    const chatCompletion = await openAIClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You will solely provide the short description of clothing items."
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Provide ONE possible search-term query for the following clothing item (ex. plain white tshirt): "
                    },
                    {
                        type: "image_url",
                        image_url: 
                        {   url: input_url,
                            detail: "low"
                        }
                    }
                ]
            }
        ],
        max_tokens: 200,
    });

    return chatCompletion.choices[0].message.content;
};

// Make sure to use 'await' in an async function to resolve the promise.
const callGPT = async (url) => {
    const result = await genDescription(url);
    console.log("desription from gpt-call.js", result);
    return result;
};

export {
    callGPT
}
