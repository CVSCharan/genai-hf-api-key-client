import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { SidebarProps } from "@/types/types";
import ChatHistoryItem from "./ChatHistoryItem";

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleSidebar,
  chatSessions,
  activeChat,
  selectChat,
  createNewChat,
  deleteChat,
}) => {
  const { user, logout } = useAuth();

  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push("/login"); // Redirect to login page after logout
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";

    const nameParts = user.name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 1).toUpperCase();
  };

  return (
    <>
      {/* Collapsed sidebar */}
      {isCollapsed && (
        <div className="w-16 border-r border-gray-800 bg-gray-900/70 backdrop-blur-sm relative z-10 flex flex-col items-center py-4">
          <button
            onClick={toggleSidebar}
            className="p-2 mb-6 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* New chat button */}
          <button
            onClick={createNewChat}
            className="p-2 mb-4 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          {/* Collapsed chat icons */}
          <div className="flex flex-col items-center space-y-4 mt-4 overflow-y-auto max-h-[60vh]">
            {chatSessions.slice(0, 5).map((chat) => (
              <button
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`p-2 rounded-md transition-all ${
                  activeChat?.id === chat.id
                    ? "bg-purple-600/20 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            ))}
          </div>

          {/* User icon at bottom */}
          <div className="mt-auto mb-4">
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user?.name || "User"}
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-2">
                <span className="text-white text-xs font-bold">
                  {getUserInitials()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expanded sidebar */}
      {!isCollapsed && (
        // Update the main sidebar container to remove any border-top
        <div
          className={`h-screen bg-gray-900/70 backdrop-blur-sm border-r border-gray-800 transition-all duration-300 flex flex-col ${
            isCollapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                CVS GenAI
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800/50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="p-4">
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={createNewChat}
                className="text-purple-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 p-1.5 rounded-full transition-all cursor-pointer"
                title="New Chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-400 text-sm font-medium">Recents</h2>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[60vh]">
              {chatSessions.slice(0, 5).map((chat) => (
                <ChatHistoryItem
                  key={chat.id}
                  chat={chat}
                  isActive={activeChat?.id === chat.id}
                  onClick={() => selectChat(chat.id)}
                  onDelete={() => deleteChat(chat.id)}
                />
              ))}
            </div>
          </div>

          {/* User profile section with user data from AuthContext */}
          <div className="mt-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user?.name || "User"}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-bold">
                      {getUserInitials()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-300">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.isAdmin ? "Admin" : user?.role || "User"}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                {/* Settings button */}
                <button
                  className="cursor-pointer p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-all"
                  title="Settings"
                  onClick={() => router.push("/settings")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </button>

                {/* Logout button */}
                <button
                  className="cursor-pointer p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800/50 rounded-md transition-all"
                  title="Logout"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
