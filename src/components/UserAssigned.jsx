import {useEffect, useState} from "react";
import {getUser} from "@/api/getUser.js";
import {Avatar, Spacer, Spinner} from "@nextui-org/react";
import Loader from "@/components/Loaders/Loader.jsx";

const UserAssigned = ({data}) => {
  const [assigned, setAssigned] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    setLoading(true)
    if (data?.assigned_id) {
      getUser(data?.assigned_id).then(user => {
        setAssigned(user)
        setLoading(false)
      })
    }
  }, []);

  return (
      <div className='w-full flex items-center gap-4 overflow-x-auto line'>
        {loading ? <Spinner color="warning" size='md' className='w-full flex justify-center'/>
            :
            (
            <>
              {typeof assigned !== 'string' && assigned?.map(assigned => {
                return (
                    <div key={assigned.id} className="flex items-center gap-2">
                      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="sm"/>
                      <p>{assigned.name}</p>
                    </div>
                )
              })}
              {typeof assigned === 'string' && <p className='text-red-600 pl-3 text-lg font-[600]'>{assigned}</p>}
            </>
        )}
      </div>
  );
};

export default UserAssigned;