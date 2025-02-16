import { useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import OtherUser from "./OtherUser"

const OtherUsers = () => {

    useGetOtherUsers();

    const { otherUsers } = useSelector(store => store.user);
    if (!otherUsers) return; 

    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })

            }
        </div>
    )
}

export default OtherUsers



