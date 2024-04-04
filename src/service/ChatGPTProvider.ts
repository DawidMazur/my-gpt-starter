import { MessageType } from "../type/ChatType";

export const generateChatReponse = async (
    messages: MessageType[],
    setResponse: (message: string) => void,
    onEnd: (message: string) => void,
) => {
    const lastMessage = messages[messages.length - 1]

    let responseMessage = "";
    
    if(lastMessage.role != "user" || lastMessage.content.length == 0) {
        return
    }

    try {
        const url = import.meta.env.VITE_OPENAI_API_URL;
        const key = import.meta.env.VITE_OPENAI_API_KEY;
        
        const response = await fetch(url,  {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${key}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 500,
                stream: true,
            })
        })

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        if (!reader) {
            throw new Error('No reader')
        }

        while(true) {
            const { done, value } = await reader.read();

            // console.log(value);

            if(done) {
                break;
            }

            const chunk = decoder.decode(value)
            const lines = chunk.split("\n")
            const parsedLines = lines
                .map(line => line.replace(/^data: /, "").trim())
                .filter(line => line !== "" && line !== "[DONE]")
                .map(line => JSON.parse(line))
            console.log(parsedLines)

            for(const parsedLine of parsedLines) {
                const { choices } = parsedLine;
                const { delta } = choices[0];
                const { content } = delta;

                if(content) {
                    responseMessage += content.replace(/\n/g, '<br>')
                    // console.log(responseMessage)
                    setResponse(responseMessage)
                }
            }
        }

    } catch(error) {
        console.error("Error: ", error);
        responseMessage = "Error";
    } finally {
        onEnd(responseMessage)
    }
}