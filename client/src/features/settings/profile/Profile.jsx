import UserInfo from "./UserInfo"
import Security from "./Security"
import DeleteUser from "./DeleteUser"

export default function Profile() {

  return (
    <div className="flex flex-col space-y-2 divide-y h-full my-6">
        <div className="flex items-start px-10 mb-10">
            <UserInfo />
        </div>
        <div className="p-10 flex items-start">
            <Security />
        </div>
        <DeleteUser />
    </div>
  )
}
