import { useContext } from 'react'
import { ChatContext } from '../service/ChatContext'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import CreateChatButton from './CreateChatButton'

function Sidebar() {
    const chats = useContext(ChatContext)

    return (
        <aside className='w-full bg-gray-800 rounded-md p-4 flex flex-col gap-2'>
            <div className="w-full flex gap-2 justify-between pb-2">
                <h1 className='text-2xl font-bold text-blue-300 text-left'>
                    My GPT
                </h1>

                <CreateChatButton />
            </div>

            { chats?.data.map((chat) => (
                <div key={chat.id} className="w-full flex justify-between items-center gap-2">
                    <Link to={`/${chat.id}`}>
                        { chat.name }
                    </Link>

                    <Button danger onClick={() => chats.deleteChat(chat.id ?? '')}>
                        X
                    </Button>
                </div>
            )) }
        </aside>
    )
}

export default Sidebar
