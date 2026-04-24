# Modèle Shimaoré Officiel — Guide Complet

> **Objectif** : Créer le premier modèle de langue shimaoré open-source,
> entraîné par un locuteur natif, publié sur HuggingFace Hub,
> et reconnu comme référence mondiale.
>
> **Avantage unique** : locuteur natif + développeur + dataset existant + vecteur
> de collecte (Luha) = combinaison qu'aucun projet NLP shimaoré n'a encore.

---

## Roadmap vers le Modèle Officiel

```
Phase A — Dataset de référence     (Mois 1-3)
Phase B — Traducteur v0.1          (Mois 2-4)  ← premier modèle publiable
Phase C — Publication HuggingFace  (Mois 3-4)
Phase D — Modèle de langue         (Mois 6-12)
Phase E — Reconnaissance officielle (An 2+)
```

---

## PHASE A — Construire le Dataset de Référence

### Ce qu'on a déjà

```
structured_translations.json  → ~1500 paires FR→Shimaoré
lessonData.ts                 → 37 leçons (grammaire + vocabulaire)
```

Avec les variantes, on a ~2700 paires exploitables. C'est un point de départ
rare pour une langue aussi peu digitalisée.

### Structure du Corpus (format standard HuggingFace)

```
data/
├── shimaoré_corpus.jsonl        ← corpus principal (toutes catégories)
├── shimaoré_translations.jsonl  ← paires parallèles FR↔Shi
├── shimaoré_audio/              ← fichiers audio .mp3 (Phase D)
│   ├── metadata.jsonl
│   └── clips/
└── shimaoré_validated.jsonl     ← données validées par locuteur natif
```

Chaque ligne du corpus = un objet JSON :

```jsonl
{"id":"t001","type":"translation","fr":"bonjour","shi":"jeje","validated":true,"source":"native"}
{"id":"t002","type":"translation","fr":"comment vas-tu ?","shi":"haɓari yako ?","validated":true,"source":"native"}
{"id":"s001","type":"sentence","shi":"Mariamu adaenda sukuni leo asuɓuhi.","fr":"Mariamu est allée à l'école ce matin.","domain":"quotidien","validated":true}
{"id":"s002","type":"sentence","shi":"Ngapi kisaje tsamaki ino ?","fr":"Combien coûte ce poisson ?","domain":"marche","validated":true}
{"id":"p001","type":"proverb","shi":"...","fr":"...","meaning":"...","validated":true}
{"id":"d001","type":"dialogue","scenario":"marche","turns":[{"role":"A","shi":"Jeje !","fr":"Bonjour !"},{"role":"B","shi":"Ndjema !","fr":"Bien !"}],"validated":true}
{"id":"g001","type":"grammar","rule":"Infinitif verbe","pattern":"U- + radical","example_shi":"uendra","example_fr":"aller","lesson_id":2,"validated":true}
```

### Script de Conversion du Dataset Existant

```python
# scripts/build_corpus.py
# Convertit structured_translations.json → shimaoré_corpus.jsonl
import json
import uuid

def build_corpus():
    with open("src/data/structured_translations.json", encoding="utf-8") as f:
        translations = json.load(f)

    corpus = []
    idx = 1

    for french, variants in translations.items():
        # Variante principale
        primary = variants[0]
        clean_primary = primary.replace(" (u-)", "").strip()

        # Détecter le type
        word_type = "verb" if "(u-)" in primary else "word"

        corpus.append({
            "id": f"t{idx:04d}",
            "type": "translation",
            "fr": french,
            "shi": clean_primary,
            "shi_variants": [v.replace(" (u-)", "").strip() for v in variants],
            "word_type": word_type,
            "validated": False,       # À valider par le natif
            "source": "dataset_v1",
        })
        idx += 1

    # Sauvegarder en JSONL
    with open("data/shimaoré_corpus.jsonl", "w", encoding="utf-8") as f:
        for entry in corpus:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")

    print(f"✅ {len(corpus)} entrées exportées → data/shimaoré_corpus.jsonl")
    print("⚠️  Penser à valider les entrées (validated: false) en tant que locuteur natif")

build_corpus()
```

```bash
# Installer les dépendances Python
pip install datasets transformers evaluate sacrebleu sentencepiece huggingface_hub

# Construire le corpus initial
python scripts/build_corpus.py
```

### Outil de Validation Natif (CLI simple)

```python
# scripts/validate_corpus.py
# Outil interactif pour valider/corriger les entrées en tant que locuteur natif
import json

def validate():
    with open("data/shimaoré_corpus.jsonl", encoding="utf-8") as f:
        entries = [json.loads(l) for l in f]

    to_validate = [e for e in entries if not e.get("validated")]
    print(f"📋 {len(to_validate)} entrées à valider\n")

    validated_count = 0
    for entry in to_validate:
        print(f"FR  : {entry['fr']}")
        print(f"SHI : {entry['shi']}")
        if entry.get("shi_variants") and len(entry["shi_variants"]) > 1:
            print(f"Variantes : {', '.join(entry['shi_variants'])}")

        action = input("\n[v]alider | [c]orriger | [s]upprimer | [q]uitter : ").strip().lower()

        if action == "q":
            break
        elif action == "v":
            entry["validated"] = True
            entry["source"] = "native_validated"
            validated_count += 1
        elif action == "c":
            correct_shi = input(f"Correction shimaoré (actuel: {entry['shi']}) : ").strip()
            if correct_shi:
                entry["shi"] = correct_shi
            correct_fr = input(f"Correction français (actuel: {entry['fr']}, Entrée=garder) : ").strip()
            if correct_fr:
                entry["fr"] = correct_fr
            entry["validated"] = True
            entry["source"] = "native_corrected"
            validated_count += 1
        elif action == "s":
            entry["validated"] = False
            entry["to_delete"] = True

        print("─" * 40)

    # Sauvegarder
    entries_clean = [e for e in entries if not e.get("to_delete")]
    with open("data/shimaoré_corpus.jsonl", "w", encoding="utf-8") as f:
        for e in entries_clean:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

    print(f"\n✅ {validated_count} entrées validées")

validate()
```

### Script d'Ajout de Nouvelles Phrases

```python
# scripts/add_sentences.py
# Ajouter rapidement des phrases du quotidien en tant que natif
import json
from datetime import datetime

def add_sentences():
    print("Ajout de phrases shimaoré — Ctrl+C pour arrêter\n")
    new_entries = []
    idx_start = int(input("ID de départ (ex: 2000) : "))
    domain = input("Domaine (quotidien/marche/famille/religion/travail) : ").strip()

    idx = idx_start
    while True:
        try:
            print(f"\n── Entrée {idx} ──")
            shi = input("Shimaoré : ").strip()
            if not shi:
                continue
            fr = input("Français  : ").strip()
            if not fr:
                continue

            new_entries.append({
                "id": f"s{idx:04d}",
                "type": "sentence",
                "shi": shi,
                "fr": fr,
                "domain": domain,
                "validated": True,
                "source": "native",
                "date": datetime.now().strftime("%Y-%m-%d"),
            })
            idx += 1
            print("✅ Enregistré")
        except KeyboardInterrupt:
            break

    if new_entries:
        with open("data/shimaoré_corpus.jsonl", "a", encoding="utf-8") as f:
            for e in new_entries:
                f.write(json.dumps(e, ensure_ascii=False) + "\n")
        print(f"\n✅ {len(new_entries)} phrases ajoutées au corpus")

add_sentences()
```

---

## PHASE B — Fine-tuner le Traducteur v0.1

### Pourquoi partir du Swahili et pas de zéro ?

```
From scratch → besoin de millions de phrases → impossible avec ~2700 paires

Helsinki-NLP/opus-mt-fr-swc (FR→Swahili côtier)
    → même famille bantu que le shimaoré
    → partage ~25-35% du vocabulaire de base
    → le modèle connaît déjà la grammaire agglutinante
    → apprend juste le vocabulaire shimaoré
    → fonctionne avec 1500-5000 paires ✅
```

### Notebook Google Colab (GPU T4 gratuit)

Créer un nouveau notebook sur [colab.research.google.com](https://colab.research.google.com)
et activer le GPU : Runtime → Change runtime type → T4 GPU.

```python
# ══════════════════════════════════════════════════════
# CELLULE 1 — Installation
# ══════════════════════════════════════════════════════
!pip install -q transformers datasets evaluate sacrebleu sentencepiece huggingface_hub

# ══════════════════════════════════════════════════════
# CELLULE 2 — Login HuggingFace (pour publier le modèle)
# ══════════════════════════════════════════════════════
from huggingface_hub import notebook_login
notebook_login()
# → Entrer ton token HuggingFace (huggingface.co/settings/tokens)

# ══════════════════════════════════════════════════════
# CELLULE 3 — Charger le corpus depuis GitHub ou upload
# ══════════════════════════════════════════════════════
# Option A : Upload direct depuis ton machine
from google.colab import files
uploaded = files.upload()  # → uploader shimaoré_corpus.jsonl

# Option B : Depuis ton repo GitHub (recommandé)
# !wget https://raw.githubusercontent.com/TON-COMPTE/luha/main/data/shimaoré_corpus.jsonl

# ══════════════════════════════════════════════════════
# CELLULE 4 — Préparer le Dataset
# ══════════════════════════════════════════════════════
import json
from datasets import Dataset, DatasetDict

with open("shimaoré_corpus.jsonl", encoding="utf-8") as f:
    raw = [json.loads(l) for l in f]

# Garder uniquement les entrées validées de type translation/sentence
pairs_fr_shi = []
pairs_shi_fr = []

for entry in raw:
    if not entry.get("validated"):
        continue

    if entry["type"] == "translation":
        fr, shi = entry.get("fr", ""), entry.get("shi", "")
        if fr and shi:
            pairs_fr_shi.append({"translation": {"fr": fr, "shi": shi}})
            pairs_shi_fr.append({"translation": {"shi": shi, "fr": fr}})
            # Ajouter les variantes
            for v in entry.get("shi_variants", [])[1:]:
                if v and v != shi:
                    pairs_fr_shi.append({"translation": {"fr": fr, "shi": v}})

    elif entry["type"] == "sentence":
        fr, shi = entry.get("fr", ""), entry.get("shi", "")
        if fr and shi:
            pairs_fr_shi.append({"translation": {"fr": fr, "shi": shi}})
            pairs_shi_fr.append({"translation": {"shi": shi, "fr": fr}})

print(f"Paires FR→SHI : {len(pairs_fr_shi)}")
print(f"Paires SHI→FR : {len(pairs_shi_fr)}")

# Split 90/10
def make_dataset(pairs):
    ds = Dataset.from_list(pairs)
    split = ds.train_test_split(test_size=0.1, seed=42)
    return DatasetDict({"train": split["train"], "validation": split["test"]})

dataset_fr_shi = make_dataset(pairs_fr_shi)
dataset_shi_fr = make_dataset(pairs_shi_fr)
print(dataset_fr_shi)

# ══════════════════════════════════════════════════════
# CELLULE 5 — Modèle et Tokenizer
# ══════════════════════════════════════════════════════
from transformers import MarianMTModel, MarianTokenizer

# FR → Swahili côtier comme base (famille bantu, proche shimaoré)
MODEL_BASE = "Helsinki-NLP/opus-mt-fr-swc"
tokenizer = MarianTokenizer.from_pretrained(MODEL_BASE)
model = MarianMTModel.from_pretrained(MODEL_BASE)

print(f"Paramètres du modèle : {model.num_parameters():,}")
# → ~74M paramètres — léger, entraînable sur Colab gratuit

# ══════════════════════════════════════════════════════
# CELLULE 6 — Tokenisation
# ══════════════════════════════════════════════════════
MAX_LENGTH = 128
SOURCE_LANG = "fr"
TARGET_LANG = "shi"

def preprocess(examples):
    inputs  = [ex[SOURCE_LANG] for ex in examples["translation"]]
    targets = [ex[TARGET_LANG] for ex in examples["translation"]]

    model_inputs = tokenizer(
        inputs, max_length=MAX_LENGTH, truncation=True, padding=False
    )
    with tokenizer.as_target_tokenizer():
        labels = tokenizer(
            targets, max_length=MAX_LENGTH, truncation=True, padding=False
        )
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

tokenized = dataset_fr_shi.map(
    preprocess, batched=True,
    remove_columns=["translation"]
)
print("Tokenisation terminée ✅")

# ══════════════════════════════════════════════════════
# CELLULE 7 — Métrique BLEU
# ══════════════════════════════════════════════════════
import evaluate
import numpy as np

bleu_metric = evaluate.load("sacrebleu")

def compute_metrics(eval_preds):
    preds, labels = eval_preds

    # Décoder les prédictions
    decoded_preds = tokenizer.batch_decode(preds, skip_special_tokens=True)

    # Remplacer -100 dans les labels
    labels = np.where(labels != -100, labels, tokenizer.pad_token_id)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

    # Nettoyer
    decoded_preds  = [p.strip() for p in decoded_preds]
    decoded_labels = [[l.strip()] for l in decoded_labels]

    result = bleu_metric.compute(
        predictions=decoded_preds,
        references=decoded_labels
    )
    return {"bleu": round(result["score"], 2)}

# ══════════════════════════════════════════════════════
# CELLULE 8 — Entraînement
# ══════════════════════════════════════════════════════
from transformers import (
    DataCollatorForSeq2Seq,
    Seq2SeqTrainingArguments,
    Seq2SeqTrainer
)

HF_USERNAME = "ton-compte-huggingface"  # ← à changer
MODEL_NAME  = f"{HF_USERNAME}/luha-opus-mt-fr-shi"

args = Seq2SeqTrainingArguments(
    output_dir=MODEL_NAME,
    num_train_epochs=10,              # Peu de données → plus d'epochs
    per_device_train_batch_size=32,
    per_device_eval_batch_size=32,
    warmup_steps=200,
    weight_decay=0.01,
    learning_rate=5e-5,
    eval_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="bleu",
    predict_with_generate=True,       # Obligatoire pour seq2seq
    fp16=True,                        # GPU Colab → activer
    generation_max_length=128,
    logging_steps=50,
    push_to_hub=True,
    hub_model_id=MODEL_NAME,
)

data_collator = DataCollatorForSeq2Seq(tokenizer, model=model, padding=True)

trainer = Seq2SeqTrainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["validation"],
    tokenizer=tokenizer,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
)

print("🚀 Démarrage de l'entraînement...")
trainer.train()

# ══════════════════════════════════════════════════════
# CELLULE 9 — Publier sur HuggingFace Hub
# ══════════════════════════════════════════════════════
trainer.push_to_hub(
    commit_message="Luha v0.1 — Premier modèle FR→Shimaoré",
    tags=["translation", "shimaoré", "mayotte", "bantu", "luha"]
)
tokenizer.push_to_hub(MODEL_NAME)

print(f"✅ Modèle publié : https://huggingface.co/{MODEL_NAME}")

# ══════════════════════════════════════════════════════
# CELLULE 10 — Test du modèle
# ══════════════════════════════════════════════════════
from transformers import pipeline

translator = pipeline("translation", model=MODEL_NAME)

test_phrases = [
    "Bonjour, comment vas-tu ?",
    "Je vais au marché.",
    "Merci beaucoup.",
    "Comment s'appelle-t-il ?",
    "La prière est à l'aube.",
]

print("─── Tests FR → Shimaoré ───")
for phrase in test_phrases:
    result = translator(phrase)[0]["translation_text"]
    print(f"FR  : {phrase}")
    print(f"SHI : {result}")
    print()
```

---

## PHASE C — Publication et Model Card HuggingFace

La **Model Card** est la fiche officielle du modèle sur HuggingFace. Elle est
critique pour la crédibilité et la découvrabilité. À créer dans le repo :

```markdown
<!-- README.md du repo HuggingFace (généré automatiquement par push_to_hub) -->
---
language:
- fr
- shi
tags:
- translation
- shimaoré
- mayotte
- bantu
- luha
license: apache-2.0
datasets:
- luha-shimaoré/shimaoré-fr-parallel-corpus
metrics:
- bleu
---

# Luha — opus-mt-fr-shi

Premier modèle de traduction **Français → Shimaoré** open-source.

Le shimaoré (ou shimaore) est la langue principale de Mayotte (France),
parlée par ~300 000 personnes. C'est une langue bantoue de la famille
des langues comoréennes, très peu représentée en NLP.

## Utilisation

```python
from transformers import pipeline
translator = pipeline("translation", model="luha-shimaoré/opus-mt-fr-shi")
translator("Bonjour, comment vas-tu ?")
# → [{'translation_text': 'Jeje, haɓari yako ?'}]
```

## Dataset

Entraîné sur le corpus Luha — ~2700 paires FR↔Shimaoré,
validées par un locuteur natif de Mayotte.

Dataset disponible : luha-shimaoré/shimaoré-fr-parallel-corpus

## Limitations

- Dataset de taille limitée (~2700 paires v0.1)
- Basé sur Helsinki-NLP/opus-mt-fr-swc (swahili côtier) comme modèle de base
- Les traductions peuvent être imparfaites sur des phrases complexes
- Score BLEU : X.XX (à compléter après entraînement)

## Équipe

Créé par l'équipe Luha — Plateforme d'apprentissage du shimaoré.
Locuteur natif : [ton nom]

## Licence

Apache 2.0 — libre d'utilisation, modification et distribution.
```

### Publier Aussi le Dataset

```python
# scripts/publish_dataset.py
from datasets import Dataset, DatasetDict, load_dataset
from huggingface_hub import HfApi
import json

# Charger le corpus validé
with open("data/shimaoré_corpus.jsonl", encoding="utf-8") as f:
    data = [json.loads(l) for l in f if json.loads(l).get("validated")]

# Séparer par type
translations = [d for d in data if d["type"] == "translation"]
sentences    = [d for d in data if d["type"] == "sentence"]
proverbs     = [d for d in data if d["type"] == "proverb"]

# Créer le dataset HuggingFace
dataset = DatasetDict({
    "translations": Dataset.from_list(translations),
    "sentences":    Dataset.from_list(sentences),
    "proverbs":     Dataset.from_list(proverbs) if proverbs else Dataset.from_list([]),
})

# Publier
dataset.push_to_hub(
    "luha-shimaoré/shimaoré-fr-parallel-corpus",
    commit_message=f"Corpus Luha v0.1 — {len(data)} entrées validées"
)
print("✅ Dataset publié sur HuggingFace Hub")
```

---

## PHASE D — Modèle de Langue Shimaoré (Compréhension + Génération)

Après le traducteur, l'étape suivante est un **Language Model** — un modèle qui
comprend et génère du shimaoré, pas seulement traduit.

### Approche : Fine-tuner mT5 ou BLOOM

```python
# mT5-small — multilingue, fine-tunable, open-source
# À faire une fois qu'on a ~5000+ phrases shimaoré

from transformers import T5ForConditionalGeneration, T5Tokenizer

model = T5ForConditionalGeneration.from_pretrained("google/mt5-small")
tokenizer = T5Tokenizer.from_pretrained("google/mt5-small")

# Tâches possibles avec un LM shimaoré :
# - Complétion de phrase : "Ndaenda ___" → "sukuni" (école)
# - Correction grammaticale : détecter les erreurs des apprenants
# - Génération de phrases d'exemple : donner un mot → générer une phrase
# - Question/réponse en shimaoré
```

### Ce qu'il Faut Collecter pour le LM (objectif 10 000+ phrases)

```
Sources prioritaires :

1. Via Luha (app)
   → Bouton "Contribuer une phrase" dans l'app
   → Corrections des exercices par les natifs
   → Conversations IA sauvegardées + validées

2. Sources existantes
   → Textes de mosquées (khutba en shimaoré)
   → Chansons traditionnelles (paroles)
   → Émissions Mayotte 1ère en shimaoré (transcriptions)
   → Réseaux sociaux mahorais (avec permission)
   → Littérature orale transcrite

3. Toi (natif)
   → 50 phrases/jour × 30 jours = 1500 phrases/mois
   → Utiliser scripts/add_sentences.py
   → Varier les domaines : quotidien, famille, marché, religion, travail
```

---

## PHASE E — Reconnaissance Officielle

### Organisations à Contacter (dans cet ordre)

```
1. Masakhane (communauté NLP langues africaines)
   → https://www.masakhane.io
   → Présenter le modèle, rejoindre le groupe de travail
   → Possibilité de co-publication académique

2. Common Voice Mozilla (corpus audio open-source)
   → https://commonvoice.mozilla.org/fr
   → Proposer le shimaoré comme nouvelle langue
   → Permet de collecter des milliers d'enregistrements audio

3. INALCO — Paris
   → Institut National des Langues et Civilisations Orientales
   → Contact : département Afrique et Océan Indien
   → Partenariat académique possible

4. No Language Left Behind — Meta AI
   → https://ai.meta.com/research/no-language-left-behind/
   → Modèle de traduction pour 200 langues
   → Soumettre le shimaoré comme langue manquante

5. Conseil Départemental de Mayotte
   → Financement potentiel pour la suite
   → Légitimité institutionnelle locale

6. Académie de Mayotte
   → Utilisation dans l'éducation nationale
   → Partenariat officiel
```

### Modèle de Message pour Masakhane

```
Objet : New language contribution — Shimaoré (Mayotte)

Dear Masakhane community,

I am a native Shimaoré speaker from Mayotte (France) and the founder of Luha,
a language learning platform for Shimaoré.

I have developed the first FR↔Shimaoré translation model, trained on a
~2700-pair parallel corpus that I built and validated as a native speaker.

Model: huggingface.co/luha-shimaoré/opus-mt-fr-shi
Dataset: huggingface.co/datasets/luha-shimaoré/shimaoré-fr-parallel-corpus

Shimaoré is spoken by ~300,000 people in Mayotte and is severely
under-represented in NLP. I would love to contribute to Masakhane and
collaborate on expanding this work.

[Ton nom]
Founder, Luha
```

---

## Intégration dans Luha (Next.js)

Une fois le modèle publié, l'intégrer dans l'app :

```typescript
// src/app/api/translate/route.ts
// Remplace le RAG Mistral pour la traduction pure — plus rapide et précis

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN!
const MODEL_FR_SHI = "luha-shimaoré/opus-mt-fr-shi"
const MODEL_SHI_FR = "luha-shimaoré/opus-mt-shi-fr"

export async function POST(req: Request) {
  const { text, direction = "fr_to_shi" } = await req.json()
  if (!text) return Response.json({ error: "No text" }, { status: 400 })

  const model = direction === "fr_to_shi" ? MODEL_FR_SHI : MODEL_SHI_FR

  // Tentative via HuggingFace Inference API (gratuit)
  const res = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        options: { wait_for_model: true },  // Attendre si le modèle est en veille
      }),
    }
  )

  if (!res.ok) {
    // Fallback : RAG Mistral si le modèle HF est indisponible
    return Response.json({ error: "HF model unavailable", fallback: true }, { status: 503 })
  }

  const result = await res.json()
  const translation = result[0]?.translation_text ?? ""

  return Response.json({ translation, model, direction })
}
```

```typescript
// src/app/api/translate/route.ts — avec fallback Mistral automatique
export async function POST(req: Request) {
  const { text, direction = "fr_to_shi" } = await req.json()

  // 1. Essayer le modèle HuggingFace (propriétaire Luha)
  try {
    const hfResult = await translateWithHuggingFace(text, direction)
    if (hfResult) return Response.json({ translation: hfResult, source: "luha-model" })
  } catch { /* fallback */ }

  // 2. Fallback : Mistral avec RAG vocabulaire
  const mistralResult = await translateWithMistral(text, direction)
  return Response.json({ translation: mistralResult, source: "mistral-rag" })
}
```

---

## Métriques de Succès du Modèle

| Métrique | v0.1 (objectif) | v1.0 (objectif) | Officiel |
|---|---|---|---|
| Paires dans le corpus | 2 700 | 10 000 | 50 000+ |
| Score BLEU FR→Shi | > 5 | > 15 | > 25 |
| Score BLEU Shi→FR | > 10 | > 20 | > 30 |
| Langues dans le modèle | FR↔Shi | FR↔Shi | FR/AR/EN↔Shi |
| Téléchargements HF | — | 1 000+ | 10 000+ |
| Citations académiques | 0 | 1+ | 5+ |
| Reconnaissance institutionnelle | — | Masakhane | Officielle |

---

## Commandes Rapides

```bash
# Préparer le corpus initial
python scripts/build_corpus.py

# Valider les entrées (toi, en tant que natif)
python scripts/validate_corpus.py

# Ajouter des phrases du quotidien
python scripts/add_sentences.py

# Publier le dataset sur HuggingFace
python scripts/publish_dataset.py

# Entraîner le modèle (sur Google Colab — voir notebook PHASE B)
# → colab.research.google.com → upload notebook → GPU T4 gratuit
```

---

*Ce document est la feuille de route vers le premier modèle NLP shimaoré officiel.
La combinaison unique locuteur natif + développeur + plateforme Luha rend ce projet
réalisable là où tous les projets précédents ont échoué.*
