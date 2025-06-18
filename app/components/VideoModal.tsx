import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface VideoModalProps {
  videoUrl: string
  onClose: () => void
}

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-white hover:text-gold transition-colors" onClick={onClose}>
          <X size={24} />
        </button>
        <video ref={videoRef} src={videoUrl} className="w-full" controls autoPlay playsInline />
      </div>
    </motion.div>
  )
}

