import {Suspense} from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "@/config/router.jsx";
import PageLoader from "@/components/Loaders/PageLoader.jsx";
import AuthProvider from "@/config/authProvider.jsx";

function App() {
  return (
      <div className='dark text-foreground bg-background flex flex-col h-[100dvh]'>
        <Suspense children={<PageLoader/>}>
          <AuthProvider>
            <RouterProvider router={router}/>
          </AuthProvider>
        </Suspense>
      </div>
  )
}

export default App
