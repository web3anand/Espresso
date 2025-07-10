import SearchBar from '../components/SearchBar'
import ThemeToggle from '../components/ThemeToggle'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8 p-4 text-center">
      <ThemeToggle />
      <h1 className="text-4xl font-bold">Espresso Yaps Analytics</h1>
      <p className="text-lg">Tokenized attention for X at a glance</p>
      <SearchBar />
      <p>
        Built by <a href="https://github.com/yourname" className="underline">Your Name</a>
      </p>
      <Footer />
    </div>
  )
}
