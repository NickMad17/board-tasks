const TaskTitle = ({children, className}) => {
  return (
      <h2 className={`text-2xl text-foreground font-light ${className}  h-16 flex items-center justify-center rounded`}>{children}</h2>
  );
};

export default TaskTitle;