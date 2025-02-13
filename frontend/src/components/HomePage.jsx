import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar"


const HomePage = () => {
  return (
    <div
      className="flex rounded-lg overflow-hidden sm:h-[450px] md:[550px] 
       bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-100">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default HomePage
