import {useEffect, useState} from "react";
import {getUser} from "@/api/getUser.js";
import {Avatar, Spinner} from "@nextui-org/react";
import {fetchAvatar} from "@/api/fetchAvatar.js";
import {useAuth} from "@/hooks/authProvider.js";

const UserAssigned = ({data}) => {
  const [assigned, setAssigned] = useState(null)
  const [loading, setLoading] = useState(null)
  const [avatar, setAvatar] = useState(null)


  useEffect(() => {
    setLoading(true)
    if (data?.isAssigned) {
      getUser(data?.assigned_id).then(user => {
        setAssigned(user)
        setLoading(false)
        return user.at(0)
      }).then((user) => {
        return fetchAvatar(user.id)
      }).then(data => {
        setAvatar(data)
      })
    } else {
      console.log('fff')
      setLoading(false)
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
                          <Avatar src={avatar} size="sm"/>
                          <p>{assigned.name}</p>
                        </div>
                    )
                  })}
                  {typeof assigned === 'string' && <p className='text-red-600 pl-3 text-lg font-[600]'>{assigned}</p>}
                </>
            )}
        {
            !data?.isAssigned && (
                <div className="flex items-center gap-2">
                  <Avatar size="sm"/>
                  <p>никто не назначен</p>
                </div>
            )
        }
      </div>
  );
};

export default UserAssigned;