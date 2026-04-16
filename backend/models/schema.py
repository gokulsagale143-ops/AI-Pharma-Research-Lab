from pydantic import BaseModel
from typing import Optional, List

class DrugRequest(BaseModel):
    name: Optional[str] = None
    smiles: str
    target: Optional[str] = None

class OrganImpact(BaseModel):
    organ: str
    impact: str
    value: int

class AdmetProperties(BaseModel):
    absorption: int
    distribution: int
    metabolism: int
    excretion: int
    toxicity: int

class SimulationResponse(BaseModel):
    toxicity_score: int
    effectiveness: int
    admet: AdmetProperties
    organ_impact: List[OrganImpact]

class CombinationRequest(BaseModel):
    smiles: str
    target: str

class CombinationItem(BaseModel):
    name: str
    synergy_score: int

class SuggestionsResponse(BaseModel):
    similar_drugs: List[str]
    combinations: List[CombinationItem]