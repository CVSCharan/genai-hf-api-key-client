import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Routes that should display the detailed footer
  const detailedFooterRoutes = ["/", "/about", "/features", "/docs"];
  const showDetailedFooter = detailedFooterRoutes.includes(pathname);

  // Simple footer for other routes
  if (!showDetailedFooter) {
    return (
      <footer className="py-4 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-0">
              © {new Date().getFullYear()} CVS GenAI Platform
            </div>
            <div className="text-xs text-gray-500 flex space-x-4">
              <Link
                href="/privacy"
                className="hover:text-purple-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-purple-400 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Detailed footer for main routes
  return (
    <footer className="py-8 sm:py-10 bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-3">
              CVS GenAI Platform
            </h3>
            <p className="text-gray-400 text-sm">
              Leveraging AI to create powerful, intuitive solutions for modern
              challenges.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/CVSCharan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/charan-cvs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:cvstechsolutions@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-0">
            © {new Date().getFullYear()} CVS GenAI Platform. All rights
            reserved.
          </div>
          <div className="text-xs text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-purple-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link
              href="/terms"
              className="hover:text-purple-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
