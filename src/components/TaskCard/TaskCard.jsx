import {Card, Chip} from "@nextui-org/react";
import {Link} from "react-router-dom";
import UserAssigned from "@/components/UserAssigned.jsx";

const TaskCard = ({data, type}) => {

  return (
      <Link to={`task/${data.id}`}>
        <Card
            className={`relative cursor-pointer text-wrap w-full h-full flex gap-2 flex-col justify-between p-6 my-5 border border-${type}`}>
          <>

            <div className="w-full flex gap-2 overflow-x-auto px-1 line">
              {data?.types?.map(type => {
                if (type === "programmer") {
                  return <Chip key={type} size='lg' color="primary" variant="bordered">Программирование</Chip>
                }
                if (type === "engineer") {
                  return <Chip key={type} size='lg' color="warning" variant="bordered">Инженеринг</Chip>
                }
              })}
            </div>
            <div className="h-[50%] flex flex-col justify-center items-center overflow-y-auto">
              <h3 className='font-mono font-[600] text-xl'>{data?.title}</h3>
            </div>
            <UserAssigned data={data}/>
          </>

        </Card>
      </Link>

  );
};

export default TaskCard;