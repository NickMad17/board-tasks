const TaskWrapper = ({children}) => {
  return (
      <div className='flex-none w-[300px] max-h-[250px] max-sm:w-[225px] mx-5'>
        {children}
      </div>
  );
};

export default TaskWrapper;