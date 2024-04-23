import {Button, Card, Checkbox, Input, Select, SelectItem} from "@nextui-org/react";
import {selectTaskStatuses, selectUsers} from "@/config/staticData.js";

const Login = () => {
  return (
      <div className='w-full h-full flex justify-center items-center'>
        <Card className='max-sm:w-full max-sm:h-full max-sm:bg-background p-8 flex flex-col gap-5'>
          <h2 className='text-center text-2xl'>Вход</h2>
          <div>
            <p className='text-lg pb-2'>Кто вы</p>
            <Select
                label="Кто ты из членов команды?"
                className="max-w-sm "
                color='default'
                variant='flat'
            >
              {selectUsers?.map((user) => {
                console.log(user,'user')
                return <SelectItem key={user.id}
                                   value={user.id}>{user.name}</SelectItem>
              })}
            </Select>
          </div>
          <div>
            <p className='text-lg pb-2'>Введите пароль</p>
            <Input type='password' variant='bordered'/>
          </div>
          <div className='flex gap-1 items-center'>
            <Checkbox/>
            <p>Согласны ли вы приносить пользу проекту ?</p>
          </div>
          <Button color='success' size='lg' className='mt-3'>Войти</Button>
          <Button variant='ghost'  color='warning' >Хотите присоединится к команде?</Button>
        </Card>
      </div>
  );
};

export default Login;