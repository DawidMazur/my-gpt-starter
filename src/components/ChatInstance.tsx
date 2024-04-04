import { useParams } from "react-router-dom"
import BaseLayout from "./BaseLayout"
import { useContext } from "react"
import { ChatContext } from "../service/ChatContext"
import ChatView from "./ChatView"


function ChatInstance() {
    const { chatId } = useParams()

    const chats = useContext(ChatContext)

    const chat = chats?.getChatById(chatId ?? "")

    if(!chat) {
        return (
            <BaseLayout>
                <div className="flex-1 flex justify-center items-center text-3xl font-bold">
                    Chat with this id doesn't exists
                </div>
            </BaseLayout>
        )
    }
    
    return (
        <BaseLayout>
            <div className="w-full px-4 flex-1 flex flex-col">
                <ChatView chat={chat} />
            </div>
        </BaseLayout>
    )
}

export default ChatInstance
