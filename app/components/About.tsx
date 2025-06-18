import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.section 
      ref={ref}
      className="mb-20 py-20"
      style={{ opacity, scale }}
    >
      <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-center text-gold">About Me</h2>
      <div className="bg-gold bg-opacity-5 p-8 rounded-lg shadow-lg backdrop-blur-sm">
        <p className="text-lg md:text-xl thin-italic text-text-gold tracking-wide leading-relaxed">
          I'm Vidhant Gurav (Light)—a visionary video editor turning ideas into jaw-dropping visuals. With two years of experience, I fuse cinematic flair with cutting-edge effects to create content that demands attention and leaves a lasting impact. For me, every frame is an opportunity to redefine storytelling and push creative boundaries. Let's make magic together.
        </p>
      </div>
    </motion.section>
  )
}

