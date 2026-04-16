import React, { useState } from 'react';
import { Activity, Beaker, Zap } from 'lucide-react';
import InputPanel from '../components/InputPanel';
import SimulationResults from '../components/SimulationResults';
import AISuggestions from '../components/AISuggestions';
import axios from 'axios';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (drugData) => {
    setLoading(true);
    setError(null);
    try {
      const simulateRes = await axios.post('/api/simulate-drug', drugData);
      setResults(simulateRes.data);

      const suggestRes = await axios.post('/api/suggest-combinations', {
        smiles: drugData.smiles || "",
        target: drugData.target || ""
      });
      setSuggestions(suggestRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to communicate with AI Engine. Ensure the backend is running.");
      setResults({
        toxicity_score: 24,
        effectiveness: 89,
        admet: { absorption: 80, distribution: 65, metabolism: 85, excretion: 90, toxicity: 20 },
        organ_impact: [
          { organ: "Liver", impact: "Low", value: 15 },
          { organ: "Kidney", impact: "Minimal", value: 5 },
          { organ: "Heart", impact: "Moderate", value: 35 }
        ]
      });
      setSuggestions({
        similar_drugs: ["Aspirin", "Ibuprofen"],
        combinations: [
          { name: "Compound X-9", synergy_score: 95 },
          { name: "Molecule B-12", synergy_score: 78 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <Beaker className="text-pharma-teal w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Drug Input</h2>
          </div>
          <InputPanel onAnalyze={handleAnalyze} isLoading={loading} />
        </div>
        
        {error && (
           <div className="glass-panel p-4 border-pharma-red/50 text-pharma-red">
              <p className="text-sm">{error}</p>
              <p className="text-xs text-pharma-light/60 mt-1">Showing simulation preview data instead.</p>
           </div>
        )}

      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="glass-panel p-6 min-h-[400px]">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-pharma-teal w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Simulation Results</h2>
          </div>
          <SimulationResults results={results} isLoading={loading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-pharma-teal w-5 h-5" />
              <h3 className="text-lg font-bold text-white">AI Suggestions</h3>
            </div>
            <AISuggestions suggestions={suggestions} isLoading={loading} />
          </div>

           <div className="glass-panel p-6 border-pharma-warning/20">
             <h3 className="text-lg font-bold text-white mb-2">Research Impact</h3>
             <div className="mt-4 space-y-4">
                <div>
                   <div className="flex justify-between text-sm mb-1">
                      <span>Traditional Timeline</span>
                      <span className="text-pharma-warning">12 Years</span>
                   </div>
                   <div className="w-full bg-pharma-blue rounded-full h-2">
                     <div className="bg-pharma-warning h-2 rounded-full w-[90%]"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-sm mb-1">
                      <span>AI-Accelerated Timeline</span>
                      <span className="text-pharma-teal">3.5 Years</span>
                   </div>
                   <div className="w-full bg-pharma-blue rounded-full h-2">
                     <div className="bg-pharma-teal h-2 rounded-full w-[25%] shadow-[0_0_10px_#64FFDA]"></div>
                   </div>
                </div>
                <p className="text-xs text-pharma-light/70 mt-4">
                   Virtual testing bypasses initial animal trials, significantly reducing Phase 1 duration and late-stage attrition rates.
                </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;