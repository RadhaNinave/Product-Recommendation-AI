import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function History() {
  const [history, setHistory] = useState([]);
  const [filterRating, setFilterRating] = useState('All Ratings');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    setHistory(saved);
  }, []);

  const filteredHistory = history.map(chat => {
    if (filterRating === 'All Ratings') return chat;
    const ratingTarget = parseInt(filterRating.split(' ')[0]);
    // Keep chat if ANY bot message matches the rating
    const hasRating = chat.messages.some(m => m.sender === 'bot' && m.rating === ratingTarget);
    return hasRating ? chat : null;
  }).filter(Boolean);

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Previous Suggestions</h2>
      
      <div className="max-w-4xl mx-auto mb-6">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-2">Filter by rating</label>
        <select 
          value={filterRating} 
          onChange={(e) => setFilterRating(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-800 dark:text-white"
        >
          <option>All Ratings</option>
          <option>1 Star</option>
          <option>2 Stars</option>
          <option>3 Stars</option>
          <option>4 Stars</option>
          <option>5 Stars</option>
        </select>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {filteredHistory.length === 0 ? (
          <p className="text-center text-gray-500">No history found.</p>
        ) : (
          filteredHistory.map((chat) => (
            <div key={chat.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
               <div className="bg-purple-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-purple-800 dark:text-gray-200 flex justify-between">
                 <span>Conversation from {new Date(chat.date).toLocaleDateString()}</span>
               </div>
               <div className="p-4 space-y-4">
                 {chat.messages.map((msg, i) => (
                   <div key={i} className={`p-3 rounded flex gap-4 ${msg.sender === 'user' ? 'bg-gray-50 dark:bg-gray-700' : 'bg-purple-50 dark:bg-purple-900/30'}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                         {msg.sender === 'user' ? 'You' : 'AI'}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">{msg.sender === 'user' ? 'You' : 'Product Recommendation AI'}</div>
                        <div className="mt-1 text-gray-700 dark:text-gray-300">{msg.text}</div>
                        {msg.rating > 0 && (
                          <div className="flex gap-1 mt-2">
                            {[...Array(msg.rating)].map((_, idx) => <Star key={idx} size={14} className="fill-yellow-400 text-yellow-400" />)}
                          </div>
                        )}
                        {msg.feedbackText && (
                          <div className="mt-2 text-sm italic text-gray-500">Feedback: {msg.feedbackText}</div>
                        )}
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
