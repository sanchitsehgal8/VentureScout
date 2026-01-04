import React from 'react';
import { VentureReport } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Target, Users, TrendingUp, ShieldAlert, Award, Globe, Briefcase, Zap, CheckCircle2 
} from 'lucide-react';

interface ReportDashboardProps {
  report: VentureReport;
  onReset: () => void;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({ report, onReset }) => {
  
  // Prepare data for TAM/SAM/SOM chart
  const marketData = [
    { name: 'TAM', value: report.marketAnalysis.tam, description: 'Total Addressable Market', color: '#6366f1' }, // Indigo 500
    { name: 'SAM', value: report.marketAnalysis.sam, description: 'Serviceable Available Market', color: '#8b5cf6' }, // Violet 500
    { name: 'SOM', value: report.marketAnalysis.som, description: 'Serviceable Obtainable Market', color: '#10b981' }, // Emerald 500
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Venture Grade Report</span>
          </div>
          <h2 className="text-2xl font-bold text-white max-w-3xl leading-snug">
            {report.ideaSummary}
          </h2>
        </div>
        <button 
          onClick={onReset}
          className="mt-4 md:mt-0 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors"
        >
          New Analysis
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Market Sizing Card (2 cols wide) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-50">
            <Globe className="w-24 h-24 text-slate-800" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-1 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" /> Market Opportunity
            </h3>
            <p className="text-slate-400 text-sm mb-6">{report.marketAnalysis.insight}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {marketData.map((item) => (
                <div key={item.name} className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{item.description}</p>
                  <p className="text-3xl font-bold text-white">
                    {report.marketAnalysis.currency}{item.value}B
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Estimated {item.name}</p>
                </div>
              ))}
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tickFormatter={(val) => `${report.marketAnalysis.currency}${val}B`} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" width={40} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} 
                    cursor={{fill: '#1e293b'}}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                    {marketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
             <p className="text-right text-xs text-slate-600 mt-2">Growth Rate: <span className="text-emerald-400 font-semibold">{report.marketAnalysis.growthRate}</span></p>
          </div>
        </div>

        {/* ICP Card (1 col wide) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-rose-400" /> Ideal Customer Profile
          </h3>
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Role & Industry</p>
              <p className="text-lg font-medium text-white">{report.icp.role}</p>
              <p className="text-slate-400 text-sm">{report.icp.industry} • {report.icp.companySize}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Key Pain Points</p>
              <ul className="space-y-2">
                {report.icp.painPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-300">
                    <ShieldAlert className="w-4 h-4 mr-2 text-rose-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Competitor Analysis (Full Width) */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800">
             <h3 className="text-xl font-bold text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-400" /> Competitive Landscape
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Competitor</th>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 font-semibold text-emerald-400">Strength</th>
                  <th className="p-4 font-semibold text-rose-400">Weakness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {report.competitors.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-medium text-white">{comp.name}</td>
                    <td className="p-4 text-slate-400 text-sm">{comp.description}</td>
                    <td className="p-4 text-slate-300 text-sm border-l border-slate-800/50 relative">
                        <div className="absolute left-0 top-4 w-1 h-8 bg-emerald-500/20 rounded-r"></div>
                        {comp.strength}
                    </td>
                    <td className="p-4 text-slate-300 text-sm border-l border-slate-800/50 relative">
                        <div className="absolute left-0 top-4 w-1 h-8 bg-rose-500/20 rounded-r"></div>
                        {comp.weakness}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-950/30 border-t border-slate-800">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">Identified Gaps:</h4>
              <div className="flex flex-wrap gap-2">
                  {report.gaps.map((gap, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {gap}
                      </span>
                  ))}
              </div>
          </div>
        </div>

        {/* GTM Strategy (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-amber-400" /> Go-To-Market Strategy
            </h3>
            <div className="space-y-6">
                {report.gtmStrategy.map((step, idx) => (
                    <div key={idx} className="flex group">
                        <div className="flex flex-col items-center mr-4">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 group-hover:border-amber-500/50 group-hover:text-amber-400 transition-colors">
                                {idx + 1}
                            </div>
                            {idx !== report.gtmStrategy.length - 1 && <div className="w-px h-full bg-slate-800 my-2 group-hover:bg-slate-700"></div>}
                        </div>
                        <div className="pb-6">
                            <h4 className="text-base font-semibold text-white mb-1">{step.phase} Phase</h4>
                            <p className="text-slate-400 text-sm mb-2">{step.action}</p>
                            <span className="inline-block px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">
                                Channel: {step.channel}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Pricing Strategy (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
           <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-cyan-400" /> Pricing Model
            </h3>
            <div className="mb-6">
                 <p className="text-lg font-medium text-white mb-1">{report.pricing.model}</p>
                 <p className="text-sm text-slate-400 italic">"{report.pricing.recommendation}"</p>
            </div>
            <div className="space-y-4">
                {report.pricing.tiers.map((tier, idx) => (
                    <div key={idx} className="bg-slate-950 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-white">{tier.name}</span>
                            <span className="text-cyan-400 font-bold">{tier.price}</span>
                        </div>
                        <ul className="space-y-1">
                            {tier.features.map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-center text-xs text-slate-400">
                                    <CheckCircle2 className="w-3 h-3 mr-1.5 text-cyan-500/50" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};