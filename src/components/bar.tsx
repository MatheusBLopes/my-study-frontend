import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <header className="flex items-center justify-center h-16 px-4 md:px-6 dark:bg-gray-900 dark:border-gray-800 bg-gray-950 text-gray-50">
      <nav className="hidden md:flex items-center gap-6">
        <Link className="text-lg font-medium text-gray-300 hover:underline underline-offset-4" to={"/"}>
          Flashcards
        </Link>
        <Link className="text-lg font-medium text-gray-300 hover:underline underline-offset-4" to={"/"}>
          Quizzes
        </Link>
      </nav>
    </header>
  )
}