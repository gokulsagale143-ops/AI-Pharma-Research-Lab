import React from 'react';

const AISuggestions = ({ suggestions, isLoading }) => {
  if (isLoading) {
    return (
       <div className="flex flex-col space-y-4">
          <div className="h-10 bg-pharma-blue/50 rounded animate-pulse"></div>
          <div className="h-10 bg-pharma-blue/50 rounded animate-pulse"></div>
          <div className="h-10 bg-pharma-blue/50 rounded animate-pulse"></div>
       </div>
    );
  }

  if (!suggestions) {
    return <p className="text-sm text-pharma-light/50">Awaiting data...</p>;
  }

  return (
    <div className="space-y-4 text-sm animate-fade-in fade-in">
      <div>
         <h4 className="text-pharma-teal font-semibold mb-2">Similar Approved Drugs</h4>
         <div className="flex flex-wrap gap-2">
            {suggestions.similar_drugs.map((drug, i) => (
               <span key={i} className="px-3 py-1 bg-pharma-blue rounded-full border border-pharma-light/10">
                  {drug}
               </span>
            ))}
         </div>
      </div>
      <div className="mt-4">
         <h4 className="text-pharma-teal font-semibold mb-2">Recommended Combinations</h4>
         <ul className="space-y-2">
            {suggestions.combinations.map((comb, i) => (
               <li key={i} className="flex justify-between items-center bg-pharma-dark p-2 rounded border border-pharma-blue">
                  <span>{comb.name}</span>
                  <span className="text-pharma-green font-mono">+{comb.synergy_score}% Synergy</span>
               </li>
            ))}
         </ul>
      </div>
    </div>
  );
};

export default AISuggestions;