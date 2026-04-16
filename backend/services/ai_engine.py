import random

def get_similar_drugs(smiles: str):
    known_drugs = ["Aspirin", "Ibuprofen", "Acetaminophen", "Naproxen", "Celecoxib", "Diclofenac"]
    random.seed(len(smiles))
    return random.sample(known_drugs, k=2)

def suggest_combinations(smiles: str, target: str):
    seed = len(smiles) + (len(target) if target else 0)
    random.seed(seed)
    
    mock_compounds = ["Compound X-9", "Molecule B-12", "Inhibitor Alpha", "Enzyme Beta", "Receptor Modulator-2"]
    
    selected = random.sample(mock_compounds, k=2)
    combinations = []
    for comp in selected:
        combinations.append({
            "name": comp,
            "synergy_score": random.randint(60, 99)
        })
        
    return combinations