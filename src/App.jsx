import {Suspense} from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "@/config/router.jsx";
import PageLoader from "@/components/Loaders/PageLoader.jsx";

function App() {
  console.log(JSON.parse("[1, 2, 3]"))

  return (
      <div className='dark text-foreground bg-background flex flex-col h-[100dvh]'>
        <Suspense children={<PageLoader/>}>
          <RouterProvider router={router}/>
        </Suspense>
      </div>
  )
}

export default App
