import { Playfair_Display, Montserrat } from "next/font/google"
import localFont from "next/font/local"

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-playfair",
})

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-montserrat",
})

export const ztFormom = localFont({
  src: "../public/fonts/ZTFormom-Regular.woff2",
  display: "swap",
  variable: "--font-zt-formom",
})

