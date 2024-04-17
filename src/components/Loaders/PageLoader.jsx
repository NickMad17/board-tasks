import {Spinner} from "@nextui-org/react";

const PageLoader = () => {
  return (
      <Spinner className='w-20 h-20 min-h-[100dvh] min-w-[100dvw]  flex justify-center items-center' size='lg' color="warning" />
  );
};

export default PageLoader;