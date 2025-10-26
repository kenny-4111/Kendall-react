import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-white text-gray-600 py-6 border-t border-gray-200 mt-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <span className="text-sm">© 2025 Kendall. All rights reserved.</span>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="#" className="hover:text-blue-500 transition">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-blue-500 transition">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
