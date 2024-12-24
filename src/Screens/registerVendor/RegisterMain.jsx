
import RegisterHeader from './RegisterHeader'
import RegisterInput from './RegisterInput'
import { motion } from 'framer-motion';

const RegisterMain = () => {
  return (
    <motion.div
    intial= {{width : 0}}
     animate ={{width : "100vw"}}
     exit = {{x: "-100vw", transition:{duration : 0.2}}}>
        <RegisterHeader />
        <RegisterInput />

    </motion.div>
  )
}

export default RegisterMain