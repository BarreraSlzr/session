import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import content from '../content.json';

export default function Navigation() {
  return (
    <nav className="sm:px-6 px-2 md:px-8 flex flex-wrap gap-8 border-2 border-b-0 border-brand-blue-800 bg-foreground" aria-label="Main Navigation">
      {content.navigation.map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
          className="flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          <ArrowUpRight className="h-4 w-4 rotate-45" />
          {item}
        </Link>
      ))}
    </nav>
  );
}