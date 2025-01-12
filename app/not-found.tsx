import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Header from './(internetfriends)/components/header';
import Navigation from './(internetfriends)/components/navigation';
import SocialLinks from './(internetfriends)/components/social-links';
import HeroText from './(internetfriends)/components/hero-text';
import CompanyInfo from './(internetfriends)/components/company-info';


const messages = [
  {
    main: "This page doesn’t exist... yet.",
    subtitle: "Maybe it's waiting for a business solution!"
  },
  {
    main: "Looks like this project went missing.",
    subtitle: "Time to bring in the project management tools!"
  },
  {
    main: "Oops! Lost in automation.",
    subtitle: "Let’s simplify that workflow and find your way."
  },
  {
    main: "Not here yet.",
    subtitle: "Could it be your next high-performance tool?"
  },
  {
    main: "Nothing to see here.",
    subtitle: "Let’s create something amazing instead!"
  },
  {
    main: "Page not found.",
    subtitle: "A great opportunity to explore business automation!"
  },
  {
    main: "Missing in action.",
    subtitle: "Maybe it’s busy creating creative solutions for you."
  },
  {
    main: "Content unavailable.",
    subtitle: "It might be waiting for distribution!"
  },
  {
    main: "This page is taking a creative break.",
    subtitle: "Let’s brainstorm your next big idea!"
  },
];

export default function NotFoundPage() {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <main>
      {/* Header */}
      <Header/>

      <HeroText>
          <h1 className="text-4xl font-bold mb-4 font-mono">404 - {randomMessage.main}</h1>
          <p className="text-lg mb-6">{randomMessage.subtitle}</p>
          <Link 
            href="/" 
            className="flex items-center gap-1 hover:opacity-70 transition-opacity">
              Go Home
              <ArrowUpRight className="h-4 w-4" />
          </Link>
      </HeroText>

      {/* Main Navigation */}
      <Navigation/>

      {/* Social Links */}
      <SocialLinks/>
      <CompanyInfo/>
    </main>
  );
};
