import {useEffect, useState} from "react";
import {getUser} from "@/api/getUser.js";
import {Avatar, Spacer, Spinner} from "@nextui-org/react";
import Loader from "@/components/Loaders/Loader.jsx";
import {baseImageUrl} from "@/config/supabase.js";

const UserAssignedTask = ({data}) => {
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

    if (!data?.isAssigned) {
      setLoading(false)
    }
  }, []);

  return (
      <div className='w-full flex items-center gap-4 overflow-x-auto line'>
        {loading ? <Spinner color="warning" size='md' className='w-full flex  ml-3'/>
            :
            (
            <>
              {typeof assigned !== 'string' && assigned?.map(assigned => {
                return (
                    <div key={assigned.id} className="flex items-center gap-2 mb-10">
                      <Avatar src={`${baseImageUrl}/avatars/${assigned.id}.jpg`} size="lg" />
                      <p className='text-2xl'>{assigned.name}</p>
                    </div>
                )
              })}
              {typeof assigned === 'string' && <p className='text-red-600 pl-3 text-lg font-[600]'>{assigned}</p>}
            </>
        )}
        {
            !data?.isAssigned && (
                <div className="flex items-center gap-2 mb-10">
                  <Avatar size="sm"/>
                  <p>никто не назначен</p>
                </div>

            )
        }
      </div>
  );
};

export default UserAssignedTask;