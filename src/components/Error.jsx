import {Button} from "@nextui-org/react";
import {Link} from "react-router-dom";

const Error = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const video = [
    'tyunsmol-argue.mp4',
    'chinese-the-rock.mp4',
    'cat.mp4',
    'bob-the-builder-fix-it.mp4',
    'cry-about-it-minecraft.mp4'
  ]


  return (
      <div className=' h-full pt-12 flex flex-col gap-5 text-center  line'>
        <p className='font-[500] text-2xl text-red-600'>ОЙ, КАЖЕТСЯ ЧТО-ТО ПОШЛО НЕ ТАК</p>
        <video className='h-56' src={`./video/${video[getRandomInt(video.length)]}`} type="video/mp4" autoPlay={true}
               loop={true}/>
        <Button variant='ghost' className='border border-red-600 text-red-600 mt-7'
                onClick={() => location.reload()}

        >
          Reload
        </Button>
        <Link to='/'>
          <Button variant='ghost' className='border border-warning text-warning w-full'>Go to Home</Button>
        </Link>
      </div>
  );
};

export default Error;