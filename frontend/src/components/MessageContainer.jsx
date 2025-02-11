import Messages from "./Messages"
import SendInput from "./SendInput"


const MessageContainer = () => {
    return (
        <div className='md:min-w-[550px] flex flex-col'>

            <div
                // onClick={() => selectedUserHandler(user)}
                // className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}
                className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2"
            >
                {/* <div className={`avatar ${isOnline ? 'online' : ''}`}> */}
                <div className='avatar online' >
                    <div className='w-12 rounded-full'>
                        <img
                            //  src={user?.profilePhoto}
                            src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="user-profile" />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>
                            {/* {user?.fullName} */}
                            userfullname
                        </p>
                    </div>
                </div>
            </div>
            <Messages />
            <SendInput />
        </div>
    )
}

export default MessageContainer
