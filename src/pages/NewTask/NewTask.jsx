import {useNavigate, useParams} from "react-router-dom";
import PageLayout from "@/components/PageLayout.jsx";
import {Button, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {selectTaskStatuses, selectTaskTypes} from "@/config/staticData.js";
import {useEffect, useState} from "react";
import {getUsers} from "@/api/getUsers.js";
import {setTask} from "@/api/setTask.js";

const NewTask = () => {
  const type = useParams().type
  const [users, setUsers] = useState(null)
  const [typeColor, setTypeColor] = useState(null)
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  // данные задачи
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState(type === 'notStatus' ? null : type)
  const [userId, setUserId] = useState(null)
  const [description, setDescription] = useState('')
  const [types, setTypes] = useState(null)

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data)
    })
  }, []);

  const getColor = () => {
    return status ? selectTaskStatuses.filter(el => el.value === status)[0]?.color : ''
  }

  const isValidText = (text) => {
    return text.length > 0
  }

  const createTask = () => {
    const task = {
      title,
      status,
      description,
      assigned_id: userId,
      isAssigned : !!userId,
      types: [types],
    }

    if (status && isValidText(title) && types) {
      console.log(task)
      setTask(task).then(
          (data) => {
            if (!data) {
              navigate('/')
            }
            setError(data)
            return data
          }
      )
    } else {
      setError('Поле должно быть заполнено');
      console.log('error', task)
    }
  }

  return (
      <PageLayout>
        <div className='w-full flex flex-col gap-8 mt-5'>
          <div className='flex flex-wrap gap-3 justify-between items-end'>
            <div className='flex flex-col gap-4 max-md:w-full'>
              <p className='font-[400] text-lg ml-1'>Название задачи</p>
              <Input
                  errorMessage={isValidText(title) ? '': error}
                  value={title}
                  isClearable
                  onValueChange={setTitle}
                  onClear={() => setTitle("")}
                  size='lg'
                  variant='underlined'
                  color={getColor()}
                  className={`w-[350px] max-md:w-full text-${getColor()}`}
                  placeholder='Введите название'
              />
            </div>
            <>
              <Select
                  errorMessage={status ? '': error}
                  label="Статус задачи"
                  placeholder="Выберите статус задачи"
                  className="max-w-sm "
                  defaultSelectedKeys={status ? [status] : ''}
                  color={getColor()}
              >
                {selectTaskStatuses?.map((status) => {
                  return <SelectItem onPress={() => setStatus(status.value)} key={status.value}
                                     value={status.value}>{status.label}</SelectItem>
                })}
              </Select>
            </>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-[400] text-lg ml-1'>Описание задачи</p>
            <Textarea
                value={description}
                onValueChange={setDescription}
                color={getColor()}
                placeholder='Введите описание задачи'
                classNames={{
                  input: "resize-y min-h-[40px]",
                }}
            />
          </div>
          <div className='flex gap-3 flex-wrap'>
            <Select
                label="Выберете Тип задачи"
                placeholder="Выберите статус задачи"
                className="max-w-sm "
                variant='bordered'
                color={typeColor}
                errorMessage={types ? '': error}
            >
              {selectTaskTypes?.map((type) => {
                return <SelectItem onPress={() => {
                  setTypeColor(type.color)
                  setTypes(type.value)
                }} key={type.value}
                                   value={type.value}>{type.label}</SelectItem>
              })}
            </Select>
            {users && (
                <Select
                    label="Выберете ответственного за задачу"
                    placeholder="Выбирите ответственного"
                    className="max-w-sm "
                    variant='bordered'
                    color={getColor()}
                >
                  {typeof users !== 'string' && users?.map((user) => {
                    return <SelectItem
                        onPress={() => setUserId(user.id)}
                        key={user.id}
                        value={user.id}
                    >
                      {user.name}
                    </SelectItem>
                  })}
                </Select>
            )}
          </div>
          {(error && error !== 'Поле должно быть заполнено') && <p className='text-red-600 text-lg'>{error}</p>}
          <div className="flex mt-5 gap-3">
            <Button onPress={createTask} className='w-24 text-md' color={getColor() || 'default'}>Создать</Button>
            <Button onPress={() => navigate('/')} variant='ghost'
                    className='border-red-600 text-red-600'>Отмена</Button>
          </div>
        </div>
      </PageLayout>
  );
};

export default NewTask;