import React, { useContext, useState } from 'react'
import { ChatType } from '../type/ChatType'
import { ChatContext } from '../service/ChatContext'
import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'
import { generateChatReponse } from '../service/ChatGPTProvider'

function ChatView({ chat }: { chat: ChatType }) {

    const [message, setMessage] = useState("")

    const [newResponseFromChat, setNewResponseFromChat] = useState("")

    const chats = useContext(ChatContext)
    
    const sendMessage = async () => {
        chat.messages.push({
            content: message,
            role: "user"
        })

        setMessage("")

        await generateChatReponse(
            chat.messages,
            setNewResponseFromChat,
            (message: string) => {
                chat.messages.push({
                    role: "assistant",
                    content: message,
                })

                chats?.updateChat(chat)

                setNewResponseFromChat("")
            }
        )
    }

    return (
        <div className='w-full flex flex-col justify-between flex-1'>
            <div className="w-full flex-1 pb-6 max-h-[calc(100vh-15rem)] overflow-auto h-full">
                <div className="w-full flex flex-col gap-2">
                    {chat.messages.map((message, index) => (
                        <div key={index} className={
                            "w-max max-w-full rounded-md p-2  "
                            + (message.role == "user"
                                ? "bg-blue-900 ml-auto"
                                : "bg-gray-700")
                        } dangerouslySetInnerHTML={{
                            __html: message.content
                        }}></div>
                    ))}

                    {newResponseFromChat && (
                        <div className={"w-max max-w-full rounded-md p-2  bg-gray-700"} dangerouslySetInnerHTML={{
                            __html: newResponseFromChat
                        }}></div>
                    )}
                </div>
            </div>

            <TextArea placeholder='Your message...' className='text-xl' rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />

            <Button className='mt-2 text-xl font-bold' onClick={sendMessage}>
                Send
            </Button>
        </div>
    )
}

export default ChatView
