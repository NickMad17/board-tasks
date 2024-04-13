import {Button, Checkbox, Input, Spinner} from "@nextui-org/react";
import {Suspense} from "react";

function App() {

  return (
      <div className='dark min-h-[100dvh] min-w-[100dvw] flex justify-center items-center text-foreground bg-background'>
        <Suspense children={<Spinner className='w-20 h-20'size='lg' color="warning" />}>

        </Suspense>
      </div>
  )
}

export default App
