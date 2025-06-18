"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, Variants, easeOut, easeInOut } from "framer-motion"
import { Play, ExternalLink, Instagram } from "lucide-react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"

type PortfolioItem = {
  id: number
  videoId?: string
  postId?: string
  type: "youtube" | "instagram"
  title: string
  description: string
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    videoId: "Bea3sHnuQcQ",
    type: "youtube",
    title: "Dynamic Visualization Explainer",
    description: "An engaging explainer video showcasing dynamic data visualization techniques.",
  },
  {
    id: 2,
    videoId: "XDOTe_gsDyw",
    type: "youtube",
    title: "Manifestation Blueprint Edit",
    description: "A motivational video edit exploring the concept of manifestation and personal growth.",
  },
  {
    id: 3,
    postId: "C-NiI64yZsT",
    type: "instagram",
    title: "A Day in TEDx (cinematic)",
    description: "A cinematic recap of an inspiring day at a TEDx event.",
  },
  {
    id: 4,
    postId: "DByd-yky9-c",
    type: "instagram",
    title: "My Dream Bike (cinematic)",
    description: "A visually stunning showcase of a dream bicycle, captured in cinematic style.",
  },
  {
    id: 5,
    postId: "DCYuKgFyx3L",
    type: "instagram",
    title: "Travel",
    description: "An immersive travel montage featuring breathtaking landscapes and cultural experiences.",
  },
  {
    id: 6,
    postId: "C-xnhK2q-jX",
    type: "instagram",
    title: "Flashy Edit",
    description: "A high-energy, flashy edit showcasing advanced video editing techniques.",
  },
]

const gradients = [
  "bg-gradient-to-br from-purple-600 to-blue-500",
  "bg-gradient-to-br from-pink-500 to-orange-400",
  "bg-gradient-to-br from-green-400 to-blue-500",
  "bg-gradient-to-br from-yellow-400 to-red-500",
]

const YouTubeThumbnail = ({
  videoId,
  title,
  onLoad,
  onError,
}: {
  videoId: string
  title: string
  onLoad: () => void
  onError: () => void
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <Image
      src={thumbnailUrl || "/placeholder.svg"}
      alt={`${title} thumbnail`}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onLoadingComplete={onLoad}
      onError={onError}
    />
  )
}

const InstagramPlaceholder = ({ gradientClass }: { gradientClass: string }) => {
  useEffect(() => {
    // Preconnect to Instagram for better performance
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = "https://www.instagram.com"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center ${gradientClass}`}
      role="img"
      aria-label="Instagram content placeholder"
    >
      <Instagram className="w-16 h-16 text-white/80 mb-4" />
      <div className="bg-black/30 px-4 py-2 rounded-full">
        <span className="text-white font-medium">View on Instagram</span>
      </div>
    </div>
  )
}

const PortfolioItem = ({
  item,
  isHovered,
  onHover,
}: {
  item: PortfolioItem
  isHovered: boolean
  onHover: (id: number | null) => void
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const gradientClass = useMemo(
    () => (item.type === "instagram" ? gradients[(item.id - 1) % gradients.length] : ""),
    [item.id, item.type],
  )

  const href =
    item.type === "youtube"
      ? `https://www.youtube.com/watch?v=${item.videoId}`
      : `https://www.instagram.com/reel/${item.postId}/`

  useEffect(() => {
    if (item.type === "instagram") setIsLoading(false)
  }, [item.type])

  return (
    <motion.div
      className="portfolio-item relative overflow-hidden rounded-lg bg-gold bg-opacity-10 h-full transform-gpu"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: easeInOut }}
    >
      <div className="absolute top-3 right-3 z-20 bg-dark-blue/80 rounded-full p-1.5">
        {item.type === "youtube" ? <Play className="w-5 h-5 text-gold" /> : <Instagram className="w-5 h-5 text-gold" />}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full relative aspect-video ${gradientClass}`}
        aria-label={`View ${item.title} on ${item.type}`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-blue">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {item.type === "youtube" ? (
          <YouTubeThumbnail
            videoId={item.videoId!}
            title={item.title}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageError(true)
              setIsLoading(false)
            }}
          />
        ) : (
          <InstagramPlaceholder gradientClass={gradientClass} />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-blue/90" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {item.type === "youtube" ? (
            <Play className="text-white w-16 h-16" />
          ) : (
            <ExternalLink className="text-white w-16 h-16" />
          )}
        </div>
      </a>

      <div className="p-4">
        <h3 className="text-gold font-heading text-xl mb-2 line-clamp-1">{item.title}</h3>
        <p className="text-text-gold text-sm line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const memoizedItems = useMemo(() => portfolioItems, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: easeOut },
    },
  }

  return (
    <motion.section
      id="my-work"
      className="mb-20"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      ref={ref}
    >
      <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center text-gold">My Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6">
        {memoizedItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants} className="h-full">
            <PortfolioItem item={item} isHovered={hoveredItem === item.id} onHover={setHoveredItem} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}