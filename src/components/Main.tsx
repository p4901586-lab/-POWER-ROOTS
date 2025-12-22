import Header from "./Header"
import Hero from "./Hero"
import Problem from "./Problem"
import Benefits from "./Benefits"
import Trust from "./Trust"
import Story from "./Story"
import Reviews from "./Reviews"
import OrderForm from "./OrderForm"
import Footer from "./Footer"

export default function Main() {
  return (
    <div id="top" className="bg-black text-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <Problem />
        <Benefits />
        <Trust />
        <Story />
        <Reviews />
        <OrderForm />
        <Footer />
      </main>
    </div>
  )
}