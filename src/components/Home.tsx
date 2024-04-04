import BaseLayout from "./BaseLayout";


function Home() {
    return (
        <BaseLayout>
            <div className="flex-1 flex justify-center items-center text-3xl font-bold">
                Select or create new chat to start
            </div>
        </BaseLayout>
    )
}

export default Home
