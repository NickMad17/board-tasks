import {useParams} from "react-router-dom";
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
  useDisclosure
} from "@nextui-org/react";
import Loader from "@/components/Loaders/Loader.jsx";
import PageLayout from "@/components/PageLayout.jsx";
import UserAssignedTask from "@/components/UserAssignedTask.jsx";

const TaskPage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loading, setLoading] = useState(null)
  const taskId = useParams().id
  const [task, setTask] = useState(null)

  const getStatusColor = (t) => {
    return  t.status === 'pending' ? 'secondary' : t.status === 'progress' ? 'warning' : t.status === 'review' ? 'danger' : t.status === 'success' ? 'success' : 'default'
  }

  useEffect(() => {
    setLoading(true)
    getTask(taskId).then((data) => {
      setTask(data)
      setLoading(false)
    })
  }, []);
  return (
      <PageLayout>
        {!loading && task?.at(0) ? (
            <>
              <Card className={`max-md:mx-0 mx-10 p-5 border overflow-auto border-${getStatusColor(task[0])}`}>
                {task?.map(t => {
                  return (
                      <div key={t.id + 3}>
                        <div className="mb-10 flex flex-wrap gap-5 justify-between items-center">
                          <h2
                              className={`text-3xl font-[500] text-${getStatusColor(t)}`}
                          >
                            {t.title}
                          </h2>
                          {t.types?.map(type => {
                            if (type === "programmer") {
                              return <Chip key={type} size='lg' color="primary" variant="bordered">Программист</Chip>
                            }
                            if (type === "engineer") {
                              return <Chip key={type} size='lg' color="warning" variant="bordered">Инженер</Chip>
                            }
                          })}
                        </div>

                        <UserAssignedTask data={t}/>

                        <pre className={'overflow-x-auto p-5 line w-full border-l'} key={t.id}>{t.description}</pre>
                      </div>
                  )
                })}
                <div className="flex justify-end mt-4 gap-2">
                  <Button>Редактировать</Button>

                  <Button onClick={(e) => {
                    e.stopPropagation()
                    onOpen()
                  }} className=''
                          variant='ghost' color='danger'
                  >
                    Удалить задачу
                  </Button>
                </div>
              </Card>

              <Modal className='bg-foreground text-background' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true}
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
                          <Button color="danger" variant="light" onPress={onClose}>
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