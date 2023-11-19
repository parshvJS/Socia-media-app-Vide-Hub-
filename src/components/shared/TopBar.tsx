import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/React-Query/querysAndMutation'

const TopBar = () => {
    const {mutate:signOut,isSuccess}=useSignOutAccount()
const navigate=useNavigate()
useEffect(()=>{
    console.log('h');
    
    if(isSuccess){
navigate('/login')
    }

},[isSuccess])
  return (
    <section className='topbar'>
        <div className="flex-between py-4 px-5">
            <Link to='/'>
                <img 
                src="src\assests\logo.svg"
                alt="vibe Hub Logo"
                width={130}
                height={325} />
            </Link>

            <div className="flex gap-4">
               <Button variant='ghost'
               className='shad-button-ghost'
               onClick={()=>signOut()}>
                <img src="src\assests\Logout.png" width={30} height={50} alt="" />
                </Button>
            </div>
        </div>
    </section>
    )
}

export default TopBar