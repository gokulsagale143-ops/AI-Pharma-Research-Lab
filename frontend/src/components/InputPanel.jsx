import React, { useState } from 'react';
import { Search } from 'lucide-react';

const InputPanel = ({ onAnalyze, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    smiles: '',
    target: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-pharma-light/70 mb-1">Drug Name (Optional)</label>
        <input 
          type="text" 
          name="name"
          className="input-field" 
          placeholder="e.g. Aspirin" 
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-pharma-light/70 mb-1">SMILES Structure</label>
        <div className="relative">
          <input 
            type="text" 
            name="smiles"
            className="input-field pr-10 font-mono text-sm break-all" 
            placeholder="CC(=O)Oc1ccccc1C(=O)O"
            value={formData.smiles}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-pharma-light/70 mb-1">Target Protein / Disease (Optional)</label>
        <input 
          type="text" 
          name="target"
          className="input-field" 
          placeholder="e.g. COX-2, BRCA1" 
          value={formData.target}
          onChange={handleChange}
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="btn-primary w-full mt-4 flex items-center justify-center gap-2 group"
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-pharma-dark border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
        )}
        {isLoading ? 'Running Simulation...' : 'Start AI Analysis'}
      </button>
    </form>
  );
};

export default InputPanel;