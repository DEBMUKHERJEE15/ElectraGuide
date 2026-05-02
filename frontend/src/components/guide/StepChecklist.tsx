"use client";
import { useState } from "react";

type Step = {
  id: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  { id: 'register', title: 'Register to Vote', description: 'Ensure your registration is up to date before the deadline.' },
  { id: 'research', title: 'Research Candidates', description: 'Use ElectraGuide to ask questions about candidate platforms.' },
  { id: 'locate', title: 'Find Polling Location', description: 'Identify your designated polling station or mail-in drop box.' },
  { id: 'vote', title: 'Cast Your Ballot', description: 'Be sure to bring required ID and vote early or on Election Day.' }
];

export default function StepChecklist() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="glass-panel p-6 rounded-xl w-full">
      <h2 className="text-xl font-bold mb-2">Your Election Progress</h2>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-6 mt-4">
        <div className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-gray-500 mb-6 text-right">{progress}% Completed</p>

      <ul className="space-y-3">
        {steps.map(step => (
          <li key={step.id}>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`step-${step.id}`}
                  type="checkbox"
                  checked={completedSteps.includes(step.id)}
                  onChange={() => toggleStep(step.id)}
                  className="w-5 h-5 bg-gray-100 border-gray-300 rounded text-primary focus:ring-primary focus:ring-2 dark:bg-gray-700 dark:border-gray-600 appearance-none flex items-center justify-center checked:bg-primary checked:border-transparent transition-all cursor-pointer relative"
                  style={{
                    backgroundImage: completedSteps.includes(step.id) ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")` : 'none'
                  }}
                  aria-label={`Mark ${step.title} as completed`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`step-${step.id}`} className={`font-medium ${completedSteps.includes(step.id) ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-300'} cursor-pointer transition-colors`}>
                  {step.title}
                </label>
                <p className={`${completedSteps.includes(step.id) ? 'text-gray-400 line-through' : 'text-gray-500 dark:text-gray-400'} text-xs mt-1 transition-colors`}>
                  {step.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
