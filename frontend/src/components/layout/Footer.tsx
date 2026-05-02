import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ElectraGuide. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm flex-wrap justify-center">
             <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
             <Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility Statement</Link>
        </div>
      </div>
    </footer>
  );
}
