import {Button, Card} from "@nextui-org/react";
import {Link} from "react-router-dom";
import PageLayout from "@/components/PageLayout.jsx";
import TaskCard from "@/components/TaskCard/TaskCard.jsx";
import TaskWrapper from "@/components/TaskCard/TaskWrapper.jsx";
import TaskTitle from "@/components/TaskCard/TaskTitle.jsx";
import {Suspense, useEffect, useState} from "react";
import {getTasks} from "@/api/getTasks.js";
import Loader from "@/components/Loaders/Loader.jsx";
import Error from "@/components/Error.jsx";

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
        <div className='flex h-full justify-center pb-3'>
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
                          <Link to='/new-task/pending'>
                            <Button variant='light'
                                    className='w-full h-10 flex items-center justify-center text-xl mt-4'>+</Button>
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
                          <Link to='/new-task/progress'>
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
                          <Link to='/new-task/review'>
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
                        </TaskWrapper>
                      </div>
                  )
                  :
                  (
                     <Error/>
                  )}
        </div>
      </PageLayout>
  );
};

export default HomePage;