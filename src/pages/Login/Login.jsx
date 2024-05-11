import {Button, Card, Checkbox, Input} from "@nextui-org/react";
import {password} from "@/config/staticData.js";
import UserSelect from "@/components/UserSelect/UserSelect.jsx";
import {useEffect, useState} from "react";
import {vizhener} from "@/api/test.js";
import {getUsers} from "@/api/getUsers.js";
import Error from "@/components/Error.jsx";
import PageLayout from "@/components/PageLayout.jsx";
import Loader from "@/components/Loaders/Loader.jsx";
import {useNavigate, useNavigation} from "react-router-dom";
import {useAuth} from "@/hooks/authProvider.js";


const Login = () => {
  const push = useNavigate()
  const {setSession} = useAuth()

  const [loading, setLoading] = useState(false)
  const [yourPassword, setYourPassword] = useState('')
  const [key, setKey] = useState('')
  const [users, setUsers] = useState(null)
  const [user, setUser] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const [errorKey, setErrorKey] = useState(null)
  const [errorUser, setErrorUser] = useState(null)


  useEffect(() => {
    setLoading(true)
    getUsers().then(data => {
      setLoading(false)
      setUsers(data)
    })
  }, []);

  const isCyrillic = (text) => /[а-я]/i.test(text);

  const submit = () => {
    if (key && yourPassword && user) {
      const lang = isCyrillic(yourPassword) ? null : 'en'
      let controller
      if (lang === 'en') {
        controller = vizhener.encryption(lang, yourPassword, key)
      } else {
        controller = ''
      }
      console.log(controller, password)
      if (controller === password) {
        localStorage.setItem('userId', user + '_' + password)
        setSession(user + '_' + password)
        setTimeout(() => {
          push('/')
        })
      } else {
        setErrorKey('Неверный ключ')
        setErrorPassword('Неверный пароль')

      }
    } else {
      setErrorKey('')
      setErrorPassword('')
      setErrorUser(null)
      if (key === '') {
        setErrorKey('Заполните поле с ключом')
      }
      if (yourPassword === '') {
        setErrorPassword('Заполните поле с парольем')
      }
      if (!user) {
        setErrorUser('Выберите члена команды')
      }
    }
  }


  return (
      <>
        {loading ? <div className='flex h-full items-center justify-center'><Loader/>
        </div> : (users && typeof users !== "string") ?
            (
                <div className='overflow-y-auto w-full h-full flex justify-center items-center'>
                  <Card className='max-sm:w-full max-sm:h-full max-sm:bg-background p-8 flex flex-col gap-5'>
                    <h2 className='text-center text-2xl'>Вход</h2>
                    <div>
                      <p className='text-lg pb-2'>Кто вы</p>
                      <UserSelect items={users} valueItem={user} setValue={setUser} color={errorUser ? 'danger' : ''}/>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <p className='text-lg pb-2'>Введите пароль и ключ</p>
                      <Input
                          errorMessage={errorPassword}
                          onChange={(e) => setYourPassword(e.target.value)}
                          type='password'
                          label='Пароль' variant='bordered'/>
                      <Input
                          errorMessage={errorKey}
                          onChange={(e) => setKey(e.target.value)}
                          type='text'
                          label='Ключ' size='sm' variant='bordered'/>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <Checkbox/>
                      <p>Согласны ли вы приносить пользу проекту ?</p>
                    </div>
                    <Button onPress={submit} color='success' size='lg' className='mt-3'>Войти</Button>
                    <Button type='submit' variant='ghost' color='warning'><a href='https://t.me/YarcheTuch?start=Привет я бы хотел присоеиниться к вам)'>Хотите присоединится к команде?</a></Button>
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