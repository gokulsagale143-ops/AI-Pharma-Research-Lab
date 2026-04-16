import math
import random

def run_virtual_body_simulation(smiles: str, target: str):
    seed = len(smiles) + (len(target) if target else 0)
    random.seed(seed)
    
    base_toxicity = random.randint(10, 85)
    effectiveness = random.randint(40, 98)
    
    admet = {
        "absorption": random.randint(30, 95),
        "distribution": random.randint(40, 95),
        "metabolism": random.randint(30, 90),
        "excretion": random.randint(50, 95),
        "toxicity": base_toxicity
    }
    
    organs = ["Liver", "Kidney", "Heart", "Brain", "Lungs"]
    organ_impact = []
    
    for organ in organs:
        val = max(1, random.randint(0, base_toxicity))
        if val > 30:
            impact_str = "High"
        elif val > 15:
            impact_str = "Moderate"
        else:
            impact_str = "Minimal"
            
        organ_impact.append({
            "organ": organ,
            "impact": impact_str,
            "value": val
        })
        
    return {
        "toxicity_score": base_toxicity,
        "effectiveness": effectiveness,
        "admet": admet,
        "organ_impact": organ_impact
    }