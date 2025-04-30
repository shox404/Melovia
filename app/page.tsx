import { SearchForm } from "@/components/search-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-purple-700 to-pink-600 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">Melovia</h1>
          <p className="text-white text-center mt-2 opacity-90">
            Find lyrics for your favorite songs powered by Genius
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <SearchForm />

          <div className="mt-12 text-center text-gray-600">
            <p className="mb-4">Search for any song to find lyrics and information</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-2">Search</h3>
                <p className="text-sm">Find songs by title or artist</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-2">Discover</h3>
                <p className="text-sm">Get detailed song information</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-2">Connect</h3>
                <p className="text-sm">Link directly to official lyrics</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Powered by Genius API. This site does not store any lyrics.</p>
          <p className="mt-2">© {new Date().getFullYear()} Melovia</p>
        </div>
      </footer>
    </div>
  )
}
