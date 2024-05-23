/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uTzeE5VimgE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function App() {
  return (
    <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">
      <main className="container mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Card Title 1</h3>
            <p className="text-gray-400 mb-4">
              This is a description of the first card. It provides more details about the content or purpose of the
              card.
            </p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Card Title 2</h3>
            <p className="text-gray-400 mb-4">
              This is a description of the second card. It provides more details about the content or purpose of the
              card.
            </p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Card Title 3</h3>
            <p className="text-gray-400 mb-4">
              This is a description of the third card. It provides more details about the content or purpose of the
              card.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
