import {Spinner} from "@nextui-org/react";

const Loader = () => {
  return (
      <Spinner className='w-20 h-20 flex justify-center items-center' size='lg' color="warning" />
  );
};

export default Loader;