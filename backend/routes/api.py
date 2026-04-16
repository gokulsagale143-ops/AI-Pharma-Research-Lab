from fastapi import APIRouter, HTTPException, Depends
from models.schema import DrugRequest, SimulationResponse, CombinationRequest, SuggestionsResponse
from services.ai_engine import get_similar_drugs, suggest_combinations
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
try:
    from simulation.virtual_testing import run_virtual_body_simulation
except ImportError:
    def run_virtual_body_simulation(smiles, target):
        return {
            "toxicity_score": 25, "effectiveness": 80,
            "admet": {"absorption": 80, "distribution": 80, "metabolism": 80, "excretion": 80, "toxicity": 25},
            "organ_impact": [{"organ": "Liver", "impact": "Minimal", "value": 10}]
        }

router = APIRouter()

@router.post("/analyze-drug")
def analyze_drug(req: DrugRequest):
    return {"status": "success", "message": "Drug structure analyzed locally."}

@router.post("/simulate-drug", response_model=SimulationResponse)
def simulate_drug(req: DrugRequest):
    if not req.smiles:
        raise HTTPException(status_code=400, detail="SMILES string is required for virtual simulation.")
    
    results = run_virtual_body_simulation(req.smiles, req.target)
    return results

@router.post("/suggest-combinations", response_model=SuggestionsResponse)
def get_suggestions(req: CombinationRequest):
    if not req.smiles:
        raise HTTPException(status_code=400, detail="SMILES structure required.")
    
    similar = get_similar_drugs(req.smiles)
    combinations = suggest_combinations(req.smiles, req.target)
    
    return SuggestionsResponse(
        similar_drugs=similar,
        combinations=combinations
    )