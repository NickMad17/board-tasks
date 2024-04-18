import PageLayout from "@/components/PageLayout.jsx";
import Error from "@/components/Error.jsx";

const ErrorPage = () => {
  return (
      <PageLayout>
        <div className='flex h-full justify-center pb-10'>
          <Error/>
        </div>
      </PageLayout>
  );
};

export default ErrorPage;