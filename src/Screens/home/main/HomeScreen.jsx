import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import MidSection from '../Components/MidSection';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';



function HomeScreen() {


  return (
    <motion.div className=''
     intial= {{width : 0}}
     animate ={{width : "100vw"}}
     exit = {{x: "-100vw", transition:{duration : 0.2}}}
     >
      <div className='px-4 md:px-20 py-4'>
        <Navbar/>
        <Hero/>
        <MidSection/>
      </div>
      <Footer/>
    </motion.div>
  )
}

export default HomeScreen
