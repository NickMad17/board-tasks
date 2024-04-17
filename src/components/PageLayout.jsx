import Header from "@/components/Header/Header.jsx";

const PageLayout = ({children}) => {
  return (
      <div className='h-full flex flex-col'>
        <Header/>
        <div className='pt-4 pb-10 px-5 grow overflow-auto line'>
          {children}
        </div>
      </div>
  );
};

export default PageLayout;