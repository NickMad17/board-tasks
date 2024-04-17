import {Button} from "@nextui-org/react";
import PageLayout from "@/components/PageLayout.jsx";

const ErrorPage = () => {
  return (
      <PageLayout>
        <div className='flex h-full justify-center pb-10'>
          <div className=' h-full pt-12 flex flex-col gap-5 text-center  line'>
            <p className='font-[500] text-2xl text-red-600'>ОЙ, КАЖЕТСЯ ЧТО-ТО ПОШЛО НЕ ТАК</p>
            <p className='text-center'>Вставь сюда прикольную гивку</p>
            <Button variant='ghost' className='border border-red-600 text-red-600'
                    onClick={() => location.reload()}>Reload</Button>
          </div>
        </div>
      </PageLayout>
  );
};

export default ErrorPage;