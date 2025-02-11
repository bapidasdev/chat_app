import { useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import OtherUser from "./OtherUser"


const OtherUsers = () => {

    useGetOtherUsers();

    const { otherUsers } = useSelector(store => store.user);

    if (!Array.isArray(otherUsers)) return null;

    console.log(otherUsers, "otherUsers");


    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })

            }
        </div>
    )
}

export default OtherUsers



