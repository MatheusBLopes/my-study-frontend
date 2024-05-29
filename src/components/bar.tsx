import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6 dark:bg-gray-900 dark:border-gray-800 bg-gray-950">
      <Link className="flex items-center gap-2" to="/">
        <span className="text-lg font-semibold">My Study</span>
      </Link>
    </header>
  )
}