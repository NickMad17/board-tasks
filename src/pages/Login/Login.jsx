import {Button, Card, Checkbox, Input} from "@nextui-org/react";
import {password} from "@/config/staticData.js";
import UserSelect from "@/components/UserSelect/UserSelect.jsx";
import {useEffect, useState} from "react";
import {vizhener} from "@/api/test.js";
import {getUsers} from "@/api/getUsers.js";
import Error from "@/components/Error.jsx";
import PageLayout from "@/components/PageLayout.jsx";


const Login = () => {
  const [yourPassword, setYourPassword] = useState(null)
  const [key, setKey] = useState(null)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data)
    })
  }, []);

  const submit = () => {
    if (key && yourPassword) {
      const controller = vizhener.encryption("en", yourPassword, key)
      if (controller === password) {
        //Todo тут обработка
      }
    }
  }


  return (
      <>
        {(users && typeof users !== "string") ?
            (
                <div className='overflow-y-auto w-full h-full flex justify-center items-center'>
                  <Card className='max-sm:w-full max-sm:h-full max-sm:bg-background p-8 flex flex-col gap-5'>
                    <h2 className='text-center text-2xl'>Вход</h2>
                    <div>
                      <p className='text-lg pb-2'>Кто вы</p>
                      <UserSelect items={users}/>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <p className='text-lg pb-2'>Введите пароль и ключ</p>
                      <Input errorMessage='Неверный ключ пароль' onChange={(e) => setYourPassword(e.target.value)}
                             type='text'
                             label='Пароль' variant='bordered'/>
                      <Input errorMessage='неверный ключ или пароль' onChange={(e) => setKey(e.target.value)}
                             type='text'
                             label='Ключ' size='sm' variant='bordered'/>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <Checkbox/>
                      <p>Согласны ли вы приносить пользу проекту ?</p>
                    </div>
                    <Button onPress={submit} color='success' size='lg' className='mt-3'>Войти</Button>
                    <Button variant='ghost' color='warning'>Хотите присоединится к команде?</Button>
                  </Card>
                </div>
            ) : (
                <PageLayout>
                  <div className='flex h-full justify-center pb-10'>
                    <Error/>
                  </div>
                </PageLayout>
            )
        }
      </>
  );
};

export default Login;