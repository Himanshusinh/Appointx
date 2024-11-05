import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input";
import { SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // Add this line
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRegisterButton = () => {
    navigate('/select');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className='flex justify-between items-center xs:gap-12'>
      <h1 className='text-xl font-bold text-[#0058E5] lg:w-[30%]'>
        Appoint<span className='text-primarytext'>X</span>
      </h1>
      
      <div className='flex xs:flex xs:flex-row xs:justify-between gap-2 lg:w-[60%]'>
        <div className='flex bg-white rounded-full border items-center'>
          <SearchIcon className="lg:h-6 lg:w-6 xs:h-4 ml-4 " />
          <Input 
            type="search" 
            placeholder="search service..." 
            className="xs:w-32 focus-visible:ring-0 focus-visible:ring-offset-0 lg:w-64 mx-3 border-0 h-8 font-semibold bg-white" 
          />
        </div>

        {user ? (
          <div className="relative">
            <img 
              src={user.photoURL || "/path/to/default-profile.jpg"} 
              alt="Profile" 
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowMenu(!showMenu)} // Toggle menu
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-4">
                <ul>
                  <li className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => navigate('/dashboard')}>Dashboard</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => {/* Handle theme change */}}>Theme</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-100" onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Button 
            className="border border-[#0058E5] bg-[#0058E5] hover:text-[#0058E5] hover:bg-white hover:border hover:border-[#0058E5]" 
            onClick={handleRegisterButton}
          >
            Register
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;