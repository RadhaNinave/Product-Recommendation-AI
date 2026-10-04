import React, { useState, useEffect } from 'react';
import staticData from '../data.json';
import { ThumbsUp, ThumbsDown, Star, Send, Save } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [feedbackState, setFeedbackState] = useState(null); // { index: number, type: 'up' | 'down', rating: number, text: string }

  const handleSend = (text) => {
    const query = text || input;
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: query }];
    
    // Simulate AI reply
    const lowerQuery = query.toLowerCase();
    let replyText = "Sorry, I did not understand your query!";
    
    // Simple mock logic
    for (const key in staticData) {
      if (lowerQuery.includes(key)) {
        replyText = staticData[key];
        break;
      }
    }

    newMessages.push({ sender: 'bot', text: replyText, rating: 0, feedbackText: '' });
    setMessages(newMessages);
    setInput('');
  };

  const handleSave = () => {
    if (messages.length === 0) return;
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    history.push({ id: Date.now(), date: new Date().toISOString(), messages });
    localStorage.setItem('chatHistory', JSON.stringify(history));
    alert('Conversation saved!');
  };

  const submitFeedback = (index, data) => {
    const updated = [...messages];
    updated[index] = { ...updated[index], ...data };
    setMessages(updated);
    setFeedbackState(null);
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
             <h2 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-100">Hi, Please tell me what you want?</h2>
             <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                {['Jeans', 'Smartphone', 'Laptop', 'T-Shirt'].map(item => (
                  <div key={item} onClick={() => handleSend(item)} className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                     <div className="font-bold text-gray-800 dark:text-gray-100">{item}</div>
                     <div className="text-sm text-gray-500">Get immediate AI generated response</div>
                  </div>
                ))}
             </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`p-4 rounded-lg shadow-sm w-full max-w-4xl mx-auto flex gap-4 ${msg.sender === 'user' ? 'bg-white dark:bg-gray-800' : 'bg-purple-50 dark:bg-purple-900'}`}>
              <div className="flex-shrink-0">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                   {msg.sender === 'user' ? 'You' : 'AI'}
                 </div>
              </div>
              <div className="flex-1 group relative">
                <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">{msg.sender === 'user' ? 'You' : 'Product Recommendation AI'}</div>
                <div className="mt-1 text-gray-700 dark:text-gray-300">{msg.text}</div>
                <div className="text-xs text-gray-400 mt-2">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                
                {msg.sender === 'bot' && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                     <button onClick={() => setFeedbackState({index: idx, type: 'up'})} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><ThumbsUp size={16}/></button>
                     <button onClick={() => setFeedbackState({index: idx, type: 'down'})} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><ThumbsDown size={16}/></button>
                  </div>
                )}
                
                {/* Inline Feedback UI based on state */}
                {feedbackState?.index === idx && (
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border dark:border-gray-600 shadow-sm">
                    {feedbackState.type === 'up' ? (
                      <div>
                        <p className="text-sm font-medium mb-2">Rate this response:</p>
                        <div className="flex gap-1 mb-2">
                           {[1,2,3,4,5].map(star => (
                             <Star key={star} size={20} className="cursor-pointer text-yellow-400 hover:fill-yellow-400" 
                               onClick={() => submitFeedback(idx, { rating: star })}/>
                           ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium mb-2">Provide Additional Feedback</p>
                        <textarea 
                          className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600 mb-2 text-sm"
                          rows="3"
                          id={`feedback-text-${idx}`}
                        ></textarea>
                        <button 
                          onClick={() => submitFeedback(idx, { feedbackText: document.getElementById(`feedback-text-${idx}`).value })}
                          className="px-4 py-1 bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-white rounded text-sm hover:bg-purple-300 dark:hover:bg-purple-600"
                        >Submit</button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Display submitted rating/feedback */}
                {msg.rating > 0 && (
                   <div className="flex gap-1 mt-2">
                     {[...Array(msg.rating)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                   </div>
                )}
                {msg.feedbackText && (
                  <div className="mt-2 text-sm italic text-gray-500">Feedback: {msg.feedbackText}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow items-center max-w-4xl w-full mx-auto">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Please tell me about your query!"
          className="flex-1 outline-none p-2 bg-transparent dark:text-white"
        />
        <button type="submit" onClick={() => handleSend()} className="px-6 py-2 bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-white font-medium rounded hover:bg-purple-300 dark:hover:bg-purple-600 transition">Ask</button>
        <button type="button" onClick={handleSave} className="px-6 py-2 border border-gray-300 dark:border-gray-600 font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">Save</button>
      </div>
    </div>
  );
}
