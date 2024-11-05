import React from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input";
import { SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleRegisterButton = () => {
    navigate('/select');
  }

  return (
    <nav className='flex justify-between items-center xs:gap-12'>
      <h1 className='text-xl font-bold text-[#0058E5] lg:w-[30%]'>
        Appoint<span className='text-primarytext'>X</span>
      </h1>
      <div className='flex xs:flex xs:flex-row xs:justify-between gap-2 lg:w-[60%]'>
      <div className='flex bg-white rounded-full border  items-center'>
        <SearchIcon className="lg:h-6 lg:w-6 xs:h-4 ml-4 " />
        <Input type="search" placeholder="search service..." className="xs:w-32 focus-visible:ring-0  focus-visible:ring-offset-0 lg:w-64 mx-3  border-0 h-8 font-semibold bg-white" />
      </div>
        
          
        <Button className="border border-[#0058E5] bg-[#0058E5] hover:text-[#0058E5] hover:bg-white hover:border hover:border-[#0058E5]" onClick = {handleRegisterButton}>
          Register
        </Button>
      </div>
    </nav>
  )
}

export default Navbar;