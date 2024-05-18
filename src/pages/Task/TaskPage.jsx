import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTask} from "@/api/getTask.js";
import {data} from "autoprefixer";
import {
  Button,
  Card,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem, Textarea,
  useDisclosure
} from "@nextui-org/react";
import Loader from "@/components/Loaders/Loader.jsx";
import PageLayout from "@/components/PageLayout.jsx";
import UserAssignedTask from "@/components/UserAssignedTask.jsx";
import {selectTaskStatusesOnBoard} from "@/config/staticData.js";
import {updateTask} from "@/api/updateTask.js";
import {deleteTask} from "@/api/deleteTask.js";
import {getUsers} from "@/api/getUsers.js";
import UserSelect from "@/components/UserSelect/UserSelect.jsx";

const TaskPage = () => {
  const navigate = useNavigate()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isDescription, setbullDescription] = useState(null)
  const [loading, setLoading] = useState(null)
  const taskId = useParams().id
  const [task, setTask] = useState(null)
  const [status, setStatus] = useState(null)
  const [description, setDescription] = useState(null)
  const [users, setUsers] = useState(null)
  const [user, setUser] = useState(null)
  const [isRedact, setRedact] = useState(false)
  const getStatusColor = () => {
    return status === 'pending' ? 'secondary' : status === 'progress' ? 'warning' : status === 'review' ? 'danger' : status === 'success' ? 'success' : 'default'
  }

  const update = () => {
    setLoading(true)
    getTask(taskId).then((data) => {
      setTask(data?.at(0))
      setStatus(data?.at(0)?.status)
      setDescription(data?.at(0)?.description)
      if (data.at(0)?.isAssigned) {
        setUser(data.at(0)?.assigned_id)
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    update()
    getUsers().then(data => {
      setUsers(data)
    })
  }, []);

  const updateFiled = (field, state) => {
    updateTask(task.id, [{[field]: state}])
  }

  const setRedOption = () => {
    if (isRedact) {
      console.log(user)
      updateFiled('description', description)
      updateFiled('assigned_id', user)
      setRedact(!isRedact)
    } else {
      setRedact(!isRedact)
    }
  }

  return (
      <PageLayout>
        {!loading && task ? (
            <>
              <div className='max-md:mx-0 mx-5 p-5 overflow-auto'>
                <div key={task.id + 3}>
                  <div className="mb-10 flex flex-wrap gap-5 justify-between items-center">
                    <h2
                        className={`text-3xl font-[500] text-${getStatusColor()}`}
                    >
                      {task.title}
                    </h2>
                    {task.types?.map(type => {
                      if (type === "programmer") {
                        return <Chip key={type} size='lg' color="primary" variant="bordered">Программист</Chip>
                      }
                      if (type === "engineer") {
                        return <Chip key={type} size='lg' color="warning" variant="bordered">Инженер</Chip>
                      }
                    })}
                  </div>

                  <div className="flex gap-8 flex-col">
                    <>
                      <Select
                          label="Статус задачи"
                          placeholder="Выберите статус задачи"
                          className="max-w-sm"
                          defaultSelectedKeys={[status]}
                          color={getStatusColor()}
                      >
                        {selectTaskStatusesOnBoard?.map((statuses) => {
                          return <SelectItem onPress={() => {
                            updateFiled('status', statuses.value)
                            setStatus(statuses.value)
                          }} key={statuses.value}
                                             value={statuses.value}>{statuses.label}</SelectItem>
                        })}
                      </Select>
                    </>

                    {isRedact ? <div className='my-5'><UserSelect color='' items={users} valueItem={user}
                                                                  setValue={setUser}/></div>
                        : <UserAssignedTask assigned_id={user}/>}


                  </div>

                  <div className='max-sm:flex flex-col'>
                    <Textarea value={description} onDoubleClick={() => console.log('dfdfdfdf')} disabled={!isRedact}
                              variant='bordered' color={getStatusColor()}
                              onInput={e => setDescription(e.target.value)}
                              key={task.id}>
                    </Textarea>
                    <Button
                        className='my-3'
                        variant='bordered'
                        color={getStatusColor()}
                        size='sm'
                        onClick={() => {
                          setbullDescription(true)
                          onOpen()
                        }}
                    >
                      Развернуть описание
                    </Button>
                  </div>

                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Button onPress={setRedOption}
                          color={isRedact ? 'success' : 'default'}
                  >{isRedact ? 'Ок' : 'Редактировать'}</Button>

                  <Button onClick={(e) => {
                    e.stopPropagation()
                    setbullDescription(false)
                    onOpen()
                  }}
                          variant='ghost' color='danger'
                  >
                    Удалить задачу
                  </Button>
                </div>
              </div>

              {isDescription ? (
                  <Modal className='bg-foreground text-background' backdrop='blur' isOpen={isOpen}
                         onOpenChange={onOpenChange} isDismissable={true}
                         isKeyboardDismissDisabled={false}
                         size='full'
                  >
                    <ModalContent>
                      <ModalHeader className="flex flex-col gap-1">Описание задачи</ModalHeader>
                      <ModalBody className='line overflow-y-auto'>
                        <p className='my-3'>
                          {description}
                        </p>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
              ) : (
                  <Modal className='bg-foreground text-background' backdrop='blur' isOpen={isOpen}
                         onOpenChange={onOpenChange} isDismissable={true}
                         isKeyboardDismissDisabled={false}>
                    <ModalContent>
                      {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">Вы хотите удалить задачу ?</ModalHeader>
                            <ModalBody>
                              <p className='w-full overflow-x-auto line'>
                                <p className='text-primary font-medium text-lg'>{task.title}</p>
                              </p>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="primary" onPress={onClose}>
                                Отмена
                              </Button>
                              <Button color="danger" variant="light" onPress={() => {
                                onClose()
                                deleteTask(task?.at(0).id).then(() => {
                                  navigate('/')
                                })
                              }}>
                                Удалить
                              </Button>
                            </ModalFooter>
                          </>
                      )}
                    </ModalContent>
                  </Modal>
              )}

            </>
        ) : (
            <div className='w-full h-full flex justify-center items-center'><Loader/></div>
        )}
      </PageLayout>
  );
};

export default TaskPage;