import Link from 'next/link';

export default function Header() {
  return (
    <header className="glass-panel sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold gradient-text tracking-tight hover:opacity-80 transition-opacity">
              ElectraGuide
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <Link href="/guide" className="hover:text-primary transition-colors font-medium">Step-by-Step Guide</Link>
            <Link href="/timeline" className="hover:text-primary transition-colors font-medium">Timeline</Link>
            <Link href="/faq" className="hover:text-primary transition-colors font-medium">FAQ</Link>
          </nav>
          <div className="flex items-center space-x-4">
             <button aria-label="Toggle High Contrast" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors tooltip" title="Accessibility Mode">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM10 16V4a6 6 0 110 12z" />
                </svg>
             </button>
          </div>
        </div>
      </div>
    </header>
  );
}
