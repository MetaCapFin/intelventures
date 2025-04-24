"use client";

import { useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import Image from 'next/image';

interface DropdownProps {
  label: string;
  menu: string;
  dropdownOpen: string | null;
  handleDropdownClick: (menu: string) => void;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ label, menu, dropdownOpen, handleDropdownClick, children }) => (
  <div className="relative dropdown">
    <a href="#" className="hover:underline flex items-center" onClick={() => handleDropdownClick(menu)} aria-expanded={dropdownOpen === menu} aria-controls={`${menu}Menu`} aria-label={`Toggle ${label} menu`}>
      {label} <span className="ml-2">▼</span>
    </a>
    {dropdownOpen === menu && (
      <div id={`${menu}Menu`} className="dropdown-menu absolute top-full left-0 mt-2 bg-opacity-80 text-white rounded shadow-lg transition-opacity duration-300">
        {children}
      </div>
    )}
  </div>
);

const Home: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleDropdownClick = useCallback((menu: string) => {
    setDropdownOpen((prev) => (prev === menu ? null : menu));
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.dropdown')) {
      setDropdownOpen(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const dropdownItems = useMemo(() => (
    <>
      <a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50">Meet the Team</a>
      <a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50">What We Do</a>
    </>
  ), []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 pb-10 gap-8 sm:p-10 font-[var(--font-geist-sans)] text-white">
      <header className="header-container fixed top-0 left-0 w-full p-4 bg-gradient-to-b from-black via-black to-transparent z-50 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-center">IntelVentures Retail Automation</h1>
          <nav className="flex gap-4">
            <Dropdown label="About Us" menu="aboutUs" dropdownOpen={dropdownOpen} handleDropdownClick={handleDropdownClick}>
              {dropdownItems}
            </Dropdown>
            <Dropdown label="Contact Us" menu="contactUs" dropdownOpen={dropdownOpen} handleDropdownClick={handleDropdownClick}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50">Email Us</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50">Schedule a Meeting</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50">Give us a Call</a>
            </Dropdown>
            <Dropdown label="Partnerships" menu="partnerships" dropdownOpen={dropdownOpen} handleDropdownClick={handleDropdownClick}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50">Partners</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50">Projects</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200 hover:bg-opacity-50">Become a Partner</a>
            </Dropdown>
          </nav>
        </div>
        <Image
          src="/intelventureslogo.png"
          alt="Logo"
          width={80}
          height={80}
          priority
          className="ml-auto"
        />
      </header>
      <section className="intro-us-section relative flex justify-center items-center w-full p-4 mt-20">
        <div className="section-container flex flex-col items-center">
          <div className="image-container relative">
            <Image
              src="/spacetree.png"
              alt="Space Tree"
              width={600}
              height={400}
              loading="lazy"
            />
            <div className="radial-gradient-overlay absolute inset-0"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
              <h3 className="font-bold">Connecting Your Business for Peak Performance</h3>
              <br></br>
              <p>Integration and optimization for operational and sales processes, sales and communication funnels</p>
            </div>
          </div>
        </div>
      </section>
      <main className="flex flex-col items-center gap-8 pb-40"> {/* Increased bottom padding */}
        <section className="about-us-section section-container-transparent flex flex-col items-center gap-4">
        <h2 className="font-bold">About Us</h2>
          <div className="flex gap-8">
            <div className="section-container flex flex-col items-start glowing-border rounded-lg">
              <h3>Meet the Team</h3>
              <p>Details about the team...</p>
            </div>
            <div className="section-container flex flex-col items-end glowing-border rounded-lg">
              <h3>What We Do</h3>
              <p>Details about what we do...</p>
            </div>
          </div>
        </section>
        <section className="contact-us-section section-container-transparent flex flex-col items-center gap-4">
          <h2 className="font-bold">Contact Us</h2>
          <div className="flex gap-8">
          <div className="section-container flex flex-col items-start glowing-border rounded-lg">
              <h3>Schedule a Meeting</h3>
              <p>CALENDLY WIDGET HERE</p>
            </div>
            <div className="section-container flex flex-col items-start glowing-border rounded-lg">
              <h3>Reach Out</h3>
              <p>PHONE: XXX XXX XXXX</p>
              <p>Email: XXXX@XXXX.com</p>
            </div>
          </div>
        </section>
        <section className="partnerships-section section-container-transparent flex flex-col items-center gap-4">
          <h2 className="font-bold">Partnerships</h2>
          <div className="flex gap-8">
          <div className="section-container flex flex-col items-start glowing-border rounded-lg">
              <h3>Partners</h3>
              <p>LIST OF PARTNERS HERE</p>
            </div>
            <div className="section-container flex flex-col items-start glowing-border rounded-lg">
              <h3>Projects</h3>
              <p>LIST OF PROJECTS HERE</p>
            </div>
            <div className="section-container flex flex-col items-start glowing-border rounded-lg">
              <h3>Become a Partner</h3>
              <p>REGISTRATION FORM HERE</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer-container fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black to-transparent z-50 flex justify-between items-center">
        <nav className="flex gap-4">
          <a href="#" className="hover:underline flex items-center">
            About Us <span className="ml-2">▼</span>
          </a>
          <a href="#" className="hover:underline flex items-center">
            Contact Us <span className="ml-2">▼</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
