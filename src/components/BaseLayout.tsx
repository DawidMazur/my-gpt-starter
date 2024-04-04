import Sidebar from "./Sidebar"

function BaseLayout({children} : {children: React.ReactNode}) {
    return (
        <div className="w-full grid grid-cols-12 p-2 min-h-screen">
            <div className="col-span-3 flex">
                <Sidebar />
            </div>

            <div className="col-span-9 flex flex-col">
                {children}
            </div>
        </div>
    )
}

export default BaseLayout
