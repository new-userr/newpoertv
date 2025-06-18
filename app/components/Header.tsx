import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'

export default function Header() {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="relative text-center px-5 md:px-10 z-10">
        <motion.h1 
          className="font-heading text-6xl md:text-8xl font-bold text-gold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Light's Portfolio
        </motion.h1>
        <motion.p 
          className="mt-5 text-lg md:text-xl thin-italic text-text-gold tracking-wide max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Turning ideas into jaw-dropping visuals
        </motion.p>
        <ScrollLink
          to="my-work"
          smooth={true}
          duration={1000}
          offset={-100}
        >
          <motion.button
            className="mt-12 font-heading bg-gold text-dark-blue font-bold text-xl px-12 py-4 rounded-full hover:bg-opacity-80 transition-all glow-effect"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.button>
        </ScrollLink>
      </div>
    </header>
  )
}

