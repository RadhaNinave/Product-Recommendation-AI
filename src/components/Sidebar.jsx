import React from "react";
import { Link } from "react-router-dom";
import { PlusSquare, MessageSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-purple-100 dark:bg-gray-800 flex flex-col items-center py-6 shadow-md border-r border-purple-200 dark:border-gray-700">
      <Link
        to="/"
        className="w-11/12 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg shadow p-3 mb-4 flex items-center justify-between font-medium text-gray-800 dark:text-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-white min-w-[2rem]">
            <MessageSquare size={16} />
          </div>
          {/* Added a space before the <br/> so Cypress reads it correctly */}
          <span className="text-sm leading-tight">
            Want new <br /> suggestion?
          </span>
        </div>
        <PlusSquare
          size={20}
          className="text-gray-600 dark:text-gray-300 flex-shrink-0"
        />
      </Link>
      <Link
        to="/history"
        className="w-11/12 text-center py-2 bg-purple-200 dark:bg-purple-900 rounded-lg text-purple-900 dark:text-purple-100 font-semibold shadow-sm hover:bg-purple-300 dark:hover:bg-purple-800 transition-colors"
      >
        Previous Suggestions
      </Link>
    </div>
  );
}
