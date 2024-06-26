import {Card, Chip} from "@nextui-org/react";
import {Link} from "react-router-dom";
import UserAssigned from "@/components/UserAssigned.jsx";

const TaskCard = ({data, type}) => {

  return (
      <Link to={`/task/${data.id}`}>
        <Card
            className={`relative cursor-pointer text-wrap w-full h-full flex gap-2 flex-col justify-between p-6 my-5 border border-${type}`}>
          <>

            <div className="w-full flex gap-2 overflow-x-auto px-1 line">
              {data?.types?.map(type => {
                if (type === "urgent") {
                  return <Chip key={type} size='lg' className='max-md:text-sm' color="danger" variant="bordered">Срочная</Chip>
                }
                if (type === "important") {
                  return <Chip key={type} size='lg' className='max-md:text-sm' color="warning" variant="bordered">Важаная</Chip>
                }
                if (type === "not-an-urgent") {
                  return <Chip key={type} size='lg' className='max-md:text-sm' color="primary" variant="bordered">Несрочная</Chip>
                }
              })}
            </div>
            <div className="h-[50%] flex flex-col justify-center items-center overflow-y-auto line">
              <h3 className='font-mono font-[600] text-xl linex'>{data?.title}</h3>
            </div>
            <UserAssigned data={data}/>
          </>

        </Card>
      </Link>

  );
};

export default TaskCard;