// Available Gemini models with automatic fallback
const MODELS = ["gemini-2.5-flash", "gemini-3.5-flash"];

export const generateGeminiResponse = async ({
    prompt,
    apikey,
    user
}) => {
    if (!apikey) {
        throw new Error("Gemini API key is missing");
    }

    let lastError = null;

    for (const model of MODELS) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apikey}`;
            
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                    }
                })
            });

            if (!response.ok) {
                const status = response.status;
                const errText = await response.text();
                console.warn(`Gemini [${model}] returned status ${status}:`, errText.substring(0, 200));

                // 400 or 401: Invalid API Key
                if (status === 400 || status === 401) {
                    if (user) {
                        user.geminiStatus = "invalid";
                        await user.save().catch(() => {});
                    }
                    throw new Error("Invalid Gemini API key. Please check your key in Assistant Builder.");
                }

                // 429: Rate limit / Quota exceeded
                if (status === 429) {
                    if (user) {
                        user.geminiStatus = "quota_exceeded";
                        await user.save().catch(() => {});
                    }
                    // Try next model if available, otherwise report quota exceeded
                    lastError = new Error("Gemini quota or rate limit exceeded. Please wait a moment.");
                    continue;
                }

                // Other status codes (503, 500, etc.)
                lastError = new Error(`Gemini API error (${status})`);
                continue;
            }

            // Success
            if (user && user.geminiStatus !== "active") {
                user.geminiStatus = "active";
                await user.save().catch(() => {});
            }

            const data = await response.json();
            
            // Extract text across all candidate parts (including handling thoughts/signatures)
            const candidates = data.candidates || [];
            let text = "";

            for (const cand of candidates) {
                const parts = cand.content?.parts || [];
                for (const part of parts) {
                    if (part.text) {
                        text += part.text + " ";
                    }
                }
            }

            text = text.trim();

            if (!text) {
                lastError = new Error("No text response returned from Gemini AI");
                continue;
            }

            return text;

        } catch (err) {
            console.error(`Gemini Fetch Error on [${model}]:`, err.message);
            // If it's explicitly an invalid API key, fail immediately
            if (err.message.includes("Invalid Gemini API key")) {
                throw err;
            }
            lastError = err;
        }
    }

    // If all models failed, throw the last descriptive error
    throw lastError || new Error("Unable to get response from Gemini AI. Please try again.");
};