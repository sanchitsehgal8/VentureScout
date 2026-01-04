import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

interface InputFormProps {
  onAnalyze: (idea: string) => void;
  isAnalyzing: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isAnalyzing }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onAnalyze(idea);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 rounded-full mb-4 ring-1 ring-indigo-500/20">
          <Sparkles className="w-5 h-5 text-indigo-400 mr-2" />
          <span className="text-indigo-200 text-sm font-medium">AI Venture Scout</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Validate your startup idea<br />in seconds.
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Get an investor-grade market analysis, competitor breakdown, and GTM strategy powered by deep AI reasoning and real-time data.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <textarea
              className="w-full h-40 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none shadow-2xl transition-all"
              placeholder="Describe your startup idea (e.g., 'An Airbnb for camping gear rental in Europe'...)"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              disabled={isAnalyzing}
            />
            <div className="absolute bottom-4 right-4">
              <button
                type="submit"
                disabled={!idea.trim() || isAnalyzing}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  idea.trim() && !isAnalyzing
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>{isAnalyzing ? 'Scouting...' : 'Analyze Idea'}</span>
                {isAnalyzing ? (
                   <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin ml-2"></div>
                ) : (
                  <ArrowRight className="w-4 h-4 ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
        <div className="flex items-center">
          <Lightbulb className="w-4 h-4 mr-1.5 text-slate-600" />
          <span>Market Size (TAM/SAM/SOM)</span>
        </div>
        <div className="w-1 h-1 bg-slate-700 rounded-full self-center hidden sm:block"></div>
        <div className="flex items-center">
          <Lightbulb className="w-4 h-4 mr-1.5 text-slate-600" />
          <span>Competitor Intel</span>
        </div>
        <div className="w-1 h-1 bg-slate-700 rounded-full self-center hidden sm:block"></div>
        <div className="flex items-center">
          <Lightbulb className="w-4 h-4 mr-1.5 text-slate-600" />
          <span>GTM Strategy</span>
        </div>
      </div>
    </div>
  );
};