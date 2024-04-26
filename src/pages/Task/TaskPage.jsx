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
  const [loading, setLoading] = useState(null)
  const taskId = useParams().id
  const [task, setTask] = useState(null)
  const [status, setStatus] = useState(null)
  const [description, setDescription] = useState(null)
  const [users, setUsers] = useState(null)
  const [isRedact, setRedact] = useState(false)

  const getStatusColor = () => {
    return status === 'pending' ? 'secondary' : status === 'progress' ? 'warning' : status === 'review' ? 'danger' : status === 'success' ? 'success' : 'default'
  }

  const update = () => {
    setLoading(true)
    getTask(taskId).then((data) => {
      setTask(data[0])
      setStatus(data?.at(0)?.status)
      setDescription(data?.at(0)?.description)
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
    console.log(state)
    updateTask(task.id, [{[field]: state}])
  }

  const setRedOption = () => {
    if (isRedact) {
      updateFiled('description', description)
      setRedact(!isRedact)
    } else {
      setRedact(!isRedact)
    }
  }

  return (
      <PageLayout>
        {!loading && task ? (
            <>
              <Card className={`max-md:mx-0 mx-10 p-5 border overflow-auto border-${getStatusColor()}`}>
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

                    {isRedact ? <div className='my-5'><UserSelect items={users} valueItem={task?.assigned_id}/></div>
                        : <UserAssignedTask data={task}/>}


                  </div>

                  {isRedact ?
                      <Textarea value={description} onInput={e => setDescription(e.target.value)} key={task.id}/> :
                      <pre className='overflow-x-auto p-5 line w-full border-l'
                           key={task.id}>{description}</pre>}

                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Button onPress={setRedOption}
                          color={isRedact ? 'success' : 'default'}
                  >{isRedact ? 'Ок' : 'Редактировать'}</Button>

                  <Button onClick={(e) => {
                    e.stopPropagation()
                    onOpen()
                  }}
                          variant='ghost' color='danger'
                  >
                    Удалить задачу
                  </Button>
                </div>
              </Card>

              <Modal className='bg-foreground text-background' backdrop='blur' isOpen={isOpen}
                     onOpenChange={onOpenChange} isDismissable={true}
                     isKeyboardDismissDisabled={false}>
                <ModalContent>
                  {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Удалить?</ModalHeader>
                        <ModalBody>
                          <p className='w-full overflow-x-auto line'>
                            Вы хотите удалить задачу: <span className=' text-primary font-medium '>{data.title}</span>
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
            </>
        ) : (
            <div className='w-full h-full flex justify-center items-center'><Loader/></div>
        )}
      </PageLayout>
  );
};

export default TaskPage;