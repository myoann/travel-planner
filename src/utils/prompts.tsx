import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const getCountryDetailsWithOpenAI = async (
  countryName: string,
  countryCode: string,
) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Give me a brief summary of what should be know about the country named ${countryName} (${countryCode}). It should be concise and informative for a traveler application`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return chatCompletion.choices[0].message.content;
};

export const findSuitableCountryWithOpenAI = async (content: string) => {
  const prompt = `
  Based on the user's preferences described below, suggest the most suitable country for travel.
  Please provide the country code as a two-character uppercase abbreviation only.
  If the preferences are ambiguous, choose the best option.
  User's preferences: ${content}
  Response format: XX
`;

  try {
    let attempts = 0;
    let maxAttempts = 3;
    let countryCode = "";

    while (attempts < maxAttempts) {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      if (chatCompletion.choices[0].message.content) {
        countryCode = chatCompletion.choices[0].message.content.trim();

        // Validate the response to ensure it's a two-character country code
        if (/^[A-Z]{2}$/.test(countryCode)) {
          return countryCode;
        }
      }

      attempts++;
    }

    throw new Error(
      "Unable to get a valid two-character country code from OpenAI after multiple attempts",
    );
  } catch (error) {
    console.error("Error finding suitable country:", error);
    throw error;
  }
};
