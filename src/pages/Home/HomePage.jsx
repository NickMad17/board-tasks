import {Button, Card} from "@nextui-org/react";
import {Link} from "react-router-dom";
import PageLayout from "@/components/PageLayout.jsx";
import TaskCard from "@/components/TaskCard/TaskCard.jsx";
import TaskWrapper from "@/components/TaskCard/TaskWrapper.jsx";
import TaskTitle from "@/components/TaskCard/TaskTitle.jsx";
import {Suspense, useEffect, useState} from "react";
import {getTasks} from "@/api/getTasks.js";
import Loader from "@/components/Loaders/Loader.jsx";

const HomePage = () => {
  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(null)
  useEffect(() => {
    setLoading(true)
    getTasks().then((data) => {
      setTasks(data)
      setLoading(false)
    })
  }, []);

  return (
      <PageLayout>
        <div className='flex h-full justify-center pb-10'>
          {loading ?
              <div className='flex h-full items-center justify-center'><Loader/></div> : typeof tasks !== "string" ? (
                      <div className=' flex overflow-x-auto whitespace-no-wrap text-nowrap line'>
                        <TaskWrapper>
                          <TaskTitle className='bg-secondary'>В ожидании</TaskTitle>
                          {tasks?.map(task => {
                            if (task.status === "pending") {
                              return (
                                  <TaskCard key={task.id} data={task} type='secondary'/>
                              )
                            }
                          })
                          }
                          <Link to='/new-task'>
                            <Button variant='light'
                                    className='w-full h-10 flex items-center justify-center text-xl'>+</Button>
                          </Link>
                        </TaskWrapper>

                        <TaskWrapper>
                          <TaskTitle className='bg-warning'>В Работе</TaskTitle>
                          {tasks?.map(task => {
                            if (task.status === "progress") {
                              return (
                                  <TaskCard key={task.id} data={task} type='warning'/>
                              )
                            }
                          })
                          }
                          <Link to='/new-task'>
                            <Button variant='light'
                                    className='w-full h-10 flex items-center justify-center text-xl mt-4'>+</Button>
                          </Link>
                        </TaskWrapper>

                        <TaskWrapper>
                          <TaskTitle className='bg-danger'>На проверке</TaskTitle>
                          {tasks?.map(task => {
                            if (task.status === "review") {
                              return (
                                  <TaskCard key={task.id} data={task} type='danger'/>
                              )
                            }
                          })
                          }
                          <Link to='/new-task'>
                            <Button variant='light'
                                    className='w-full h-10 flex items-center justify-center text-xl mt-4'>+</Button>
                          </Link>
                        </TaskWrapper>

                        <TaskWrapper>
                          <TaskTitle className='bg-success'>Готово</TaskTitle>
                          {tasks?.map(task => {
                            if (task.status === "success") {
                              return (
                                  <TaskCard key={task.id} data={task} type='success'/>
                              )
                            }
                          })
                          }
                          <Link to='/new-task'>
                            <Button variant='light'
                                    className='h-10 w-full flex items-center justify-center text-xl mt-4'>+</Button>
                          </Link>
                        </TaskWrapper>
                      </div>
                  )
                  :
                  (
                      <div className=' h-full pt-12 flex flex-col gap-5 text-center  line'>
                        <p className='font-[500] text-2xl text-red-600'>ОЙ, КАЖЕТСЯ ЧТО-ТО ПОШЛО НЕ ТАК</p>
                        <p className='text-center'>Вставь сюда прикольную гивку</p>
                        <Button variant='ghost' className='border border-red-600 text-red-600' onClick={() => location.reload()}>Reload</Button>
                      </div>
                  )}
        </div>
      </PageLayout>
  );
};

export default HomePage;