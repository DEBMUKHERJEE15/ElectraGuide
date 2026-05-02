"use client";
import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  { question: "How do I register to vote?", answer: "You can register online, by mail, or in person at your local election office depending on your state." },
  { question: "What documents do I need to bring?", answer: "Many states require a photo ID. If you don't have one, some states allow you to sign an affidavit or use a utility bill." },
  { question: "Can I vote by mail?", answer: "Yes, many states allow absentee or no-excuse mail-in voting. Request your ballot early online." },
  { question: "Where is my polling place?", answer: "Your local election office assigns polling places. Use your state's voter portal to find the exact address." }
];

export default function FAQSearch() {
  const [query, setQuery] = useState("");

  const filtered = faqs.filter(f => 
    f.question.toLowerCase().includes(query.toLowerCase()) || 
    f.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="glass-panel p-6 rounded-xl w-full">
      <h2 className="text-xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
          placeholder="Search questions..." />
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map((faq, idx) => (
          <details key={idx} className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-gray-900 dark:text-white">
              <span>{faq.question}</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-gray-500 dark:text-gray-400 mt-2 px-4 pb-4 animate-fade-in group-open:animate-fade-in">
              {faq.answer}
            </p>
          </details>
        )) : (
          <p className="text-gray-500 text-center py-4">No matching questions found.</p>
        )}
      </div>
    </div>
  );
}
