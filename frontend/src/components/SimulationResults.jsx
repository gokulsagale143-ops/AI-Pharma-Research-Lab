import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';

const SimulationResults = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center min-h-[300px] text-pharma-teal">
        <div className="w-16 h-16 border-4 border-pharma-blue border-t-pharma-teal rounded-full animate-spin mb-4"></div>
        <p className="animate-pulse">Simulating virtual biological responses...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[300px] text-pharma-light/50">
        <p>No active simulations. Please input drug structure.</p>
      </div>
    );
  }

  const admetData = [
    { subject: 'Absorption', A: results.admet.absorption, fullMark: 100 },
    { subject: 'Distribution', A: results.admet.distribution, fullMark: 100 },
    { subject: 'Metabolism', A: results.admet.metabolism, fullMark: 100 },
    { subject: 'Excretion', A: results.admet.excretion, fullMark: 100 },
    { subject: 'Toxicity (Inv)', A: 100 - results.admet.toxicity, fullMark: 100 },
  ];

  return (
    <div className="space-y-8 animate-fade-in fade-in">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-pharma-blue/40 rounded-lg p-4 text-center border border-pharma-teal/10">
           <h4 className="text-pharma-light/70 text-sm mb-1">Effectiveness Score</h4>
           <div className={`text-3xl font-bold ${results.effectiveness > 75 ? 'text-pharma-teal' : 'text-pharma-warning'}`}>
             {results.effectiveness}%
           </div>
        </div>
        <div className="bg-pharma-blue/40 rounded-lg p-4 text-center border border-pharma-teal/10">
           <h4 className="text-pharma-light/70 text-sm mb-1">Toxicity Probability</h4>
           <div className={`text-3xl font-bold ${results.toxicity_score > 30 ? 'text-pharma-red' : 'text-pharma-green'}`}>
             {results.toxicity_score}%
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[250px]">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={admetData}>
              <PolarGrid stroke="#112240" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#CCD6F6', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#112240" />
              <Radar name="Drug Profile" dataKey="A" stroke="#64FFDA" fill="#64FFDA" fillOpacity={0.4} />
              <Tooltip contentStyle={{ backgroundColor: '#0A192F', border: '1px solid #112240' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full h-full pt-4">
           <p className="text-xs text-pharma-light/50 text-center mb-2">Virtual Organ Impact (Severity)</p>
           <ResponsiveContainer width="100%" height="90%">
              <BarChart data={results.organ_impact} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#112240" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="organ" type="category" axisLine={false} tickLine={false} tick={{ fill: '#CCD6F6', fontSize: 12 }} />
                <Tooltip cursor={{fill: '#112240'}} contentStyle={{ backgroundColor: '#0A192F', border: '1px solid #112240' }} />
                <Bar dataKey="value" fill="#64FFDA" radius={[0, 4, 4, 0]}>
                  {
                    results.organ_impact.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 30 ? '#FF4D4D' : entry.value > 15 ? '#FFC800' : '#00C896'} />
                    ))
                  }
                </Bar>
              </BarChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SimulationResults;