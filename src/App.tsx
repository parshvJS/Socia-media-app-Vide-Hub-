import { Routes, Route } from 'react-router-dom'
import SignupForm from './_auth/forms/SignupForm'
import LoginForm from './_auth/forms/LoginForm'
import Home  from './_root/Pages'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"


function App() {

  return (
    <main className='flex h-screen'>
      <Routes>

        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/signin' element={<SignupForm />} />
          <Route path='/login' element={<LoginForm />} />
        </Route>


        {/* private routes  */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

      <Toaster/>
    </main>



  )
}

export default App
