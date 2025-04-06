export function Footer() {
  return (
    <footer className="py-10 bg-black border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              CVS GenAI Platform
            </h3>
            <p className="text-gray-500 mt-1">Developed by CVS Charan</p>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CVS GenAI Platform. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
