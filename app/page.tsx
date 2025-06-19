"use client"

import Header from "./components/Header"
import About from "./components/About"
import Portfolio from "./components/Portfolio"
import Connect from "./components/Connect"
import Footer from "./components/Footer"
import { playfair, montserrat, ztFormom } from "./fonts"

export default function Home() {
  return (
    <div className={`${playfair.variable} ${montserrat.variable} ${ztFormom.variable} min-h-screen bg-dark-blue text-white`}>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <About />
        <Portfolio />
      </main>
      <Connect />
      <Footer />
    </div>
  )
}