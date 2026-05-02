import ChatBox from '@/components/chat/ChatBox';
import ElectionTimeline from '@/components/timeline/ElectionTimeline';
import StepChecklist from '@/components/guide/StepChecklist';
import FAQSearch from '@/components/guide/FAQSearch';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 flex flex-col items-center">
        <div className="inline-block px-3 py-1 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full dark:bg-primary/20">
          Smart Voting Assistant
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Navigate elections with <span className="gradient-text">Confidence</span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl text-center mb-8">
          ElectraGuide breaks down the voting process into simple, actionable steps. Ask our AI assistant anything, track deadlines, and stay informed.
        </p>
      </section>

      {/* Main Tools Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Chat & FAQ */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <ChatBox />
          <FAQSearch />
        </div>

        {/* Right Column: Timeline & Checklist */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          <StepChecklist />
          <ElectionTimeline />
        </div>
      </section>
      
      {/* Footer Banner */}
      <section className="glass-panel p-8 rounded-2xl text-center mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-none">
          <h3 className="text-2xl font-bold mb-4">Your Vote Matters</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
             Democracy works best when everyone participates. Use ElectraGuide to ensure you're registered, informed, and ready to cast your ballot.
          </p>
      </section>
    </div>
  );
}
