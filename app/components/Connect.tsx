import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter, FaEnvelope, FaLock } from 'react-icons/fa'

export default function Connect() {
  const socialLinks = [
    { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/howvidhant' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com/@mightyxmind' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/vidhant-gurav-564389220' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/GuravVidhant' },
    { name: 'Email', icon: FaEnvelope, url: 'mailto:whyvidhant@gmail.com' },
  ]

  return (
    <motion.section 
      className="bg-dark-blue bg-opacity-80 py-8 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-6">
          <FaLock className="text-gold text-2xl mr-2" />
          <h2 className="font-heading text-3xl font-bold text-center text-gold">Connect With Me</h2>
        </div>
        <ul className="flex justify-center items-center gap-6 md:gap-8">
          {socialLinks.map((link, index) => (
            <motion.li 
              key={link.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative">
                  <div className="text-3xl text-gold group-hover:text-text-gold transition-colors duration-300">
                    <link.icon />
                  </div>
                  <motion.div 
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gold text-dark-blue px-2 py-1 rounded text-xs whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}

