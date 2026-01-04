import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ReportDashboard } from './components/ReportDashboard';
import { analyzeStartupIdea } from './services/geminiService';
import { VentureReport } from './types';
import { AlertCircle, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [report, setReport] = useState<VentureReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (idea: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeStartupIdea(idea);
      setReport(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while scouting.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-50 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-800/50 backdrop-blur-md bg-[#0f172a]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={handleReset}>
              <div className="bg-indigo-600 p-1.5 rounded-lg mr-3 shadow-lg shadow-indigo-600/20">
                 <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Venture<span className="text-indigo-400">Scout</span></span>
            </div>
            <div className="text-slate-400 text-sm font-medium">
               v1.0 • Beta
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main>
        {error && (
          <div className="max-w-3xl mx-auto mt-6 px-4">
             <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center text-red-400">
                <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
                <p>{error}</p>
             </div>
          </div>
        )}

        {report ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ReportDashboard report={report} onReset={handleReset} />
          </div>
        ) : (
          <InputForm onAnalyze={handleAnalyze} isAnalyzing={isLoading} />
        )}
      </main>
      
      {/* Loading Overlay with "Thinking" visuals */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#0f172a]/90 backdrop-blur-sm flex flex-col items-center justify-center">
           <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-3 border-t-4 border-emerald-500 rounded-full animate-spin animation-delay-150"></div>
              <div className="absolute inset-6 border-t-4 border-rose-500 rounded-full animate-spin animation-delay-300"></div>
           </div>
           <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">Scouting the Market</h3>
           <div className="text-slate-400 text-sm max-w-sm text-center space-y-1">
              <p>Searching competitor data...</p>
              <p className="animate-pulse delay-700">Calculating TAM/SAM/SOM...</p>
              <p className="animate-pulse delay-1000">Synthesizing GTM Strategy...</p>
           </div>
        </div>
      )}

    </div>
  );
};

export default App;