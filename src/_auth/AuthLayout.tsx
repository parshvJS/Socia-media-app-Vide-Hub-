import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

const AuthLayout = () => {
  //   const isAuth = false;
  //   const navigate = useNavigate();

  //   return (
  //    <>
  //     <p></p>
  //   {
  //     isAuth ? (
  //       <>
  //         <Outlet />
  //       </>
  //     ) : null;
  //   }
  //    </>

  // );




  //code 


  const isAuth = false

  return (
    <>
      {!isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className='flex   flex-1 justify-center items-center flex-col py-10 '>
            <Outlet />
          </section>

          <img src="src\assests\side-img.svg" alt="" className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' />
        </>
      )}
    </>

  );
}

export default AuthLayout