# 🌍 PROJECT:  Luha



## 🎯 OBJECTIF



Construire une application moderne d’apprentissage du shimaoré (langue de Mayotte), combinant :



- apprentissage interactif (type Brilliant, Duolingo)

- intelligence artificielle

- audio natif

- traduction

- gamification



Le but est de rendre l’apprentissage :

- accessible

- efficace

- addictif

- culturellement fidèle



👉 L’objectif long terme est de devenir LA référence mondiale pour l’apprentissage du Shimaoré.



---



## 🌍 CONTEXTE



Le shimaoré est une langue :

- majoritairement orale

- peu digitalisée

- avec très peu d’outils modernes



Contrairement à des plateformes comme Duolingo, il n’existe pas de solution avancée pour cette langue.



👉 Ce projet vise à combler ce vide.



---



## 🧠 VISION PRODUIT



Créer une application qui agit comme :



- un professeur

- un coach

- un traducteur

- un compagnon de conversation



L’apprentissage doit être :

- progressif

- personnalisé

- basé sur la pratique réelle



Les systèmes modernes utilisent :

- gamification

- répétition espacée

- IA adaptative : contentReference[oaicite:1]{index=1}



---



## ⚙️ STACK TECHNIQUE

- Ne surtout pas utiliser NPM (trop lour et lent)



### Frontend

- Next.js (App Router)

- TypeScript

- Tailwind CSS



### Backend

- Supabase (PostgreSQL + Auth)



### AI Layer

- LLM privilegier ceux qui sont gratuit (Mistral AI, Huggin FaceClaude / OpenAI)

- Speech-to-Text (Whisper)

- Text-to-Speech



---



## 🧩 ARCHITECTURE



Le système est structuré en 3 couches :



### 1. Application Layer

- UI

- interactions utilisateur



### 2. Backend Layer

- API

- logique métier

- gestion des données



### 3. AI Layer

- NLP (compréhension)

- Speech (voix)

- Recommendation Engine

- Learning Engine



---



## 🧠 AI CAPABILITIES (SKILLS)



Le projet repose sur plusieurs capacités IA :



### 1. Adaptive Learning

- adaptation au niveau utilisateur



### 2. NLP

- compréhension et correction du langage



### 3. Speech Recognition

- analyse de la prononciation



### 4. Conversational AI

- dialogue naturel



### 5. Content Generation

- génération automatique d’exercices



### 6. Learning Analytics

- analyse de progression



---



## 🧠 DATA STRATEGY



Le projet dépend fortement des données.



### Sources :

- locuteurs natifs

- contenus existants

- contributions utilisateurs



### Structure :

- mots

- phrases

- audio

- traductions



👉 La qualité du dataset est critique.



---



## 🔁 STRATÉGIE IA



Nous n’entraînons pas un modèle from scratch.



Approche :



1. LLM API (Claude / OpenAI)

2. RAG (Retrieval Augmented Generation)

3. Fine-tuning progressif

4. Human feedback loop



---



## 🎮 EXPÉRIENCE UTILISATEUR



Inspirée des meilleures apps :



- leçons courtes

- progression visible

- système XP / streak

- exercices variés



Les apps modernes utilisent la gamification pour maintenir la motivation et l’engagement :contentReference[oaicite:2]{index=2}



---



## 🚀 ROADMAP



### Phase 1 (MVP)

- vocabulaire

- quiz

- audio simple



### Phase 2

- NLP correction

- adaptive learning



### Phase 3

- chatbot

- reconnaissance vocale



### Phase 4

- IA avancée

- contenu généré automatiquement



---



## ⚠️ CONTRAINTES



- peu de données linguistiques

- langue non standardisée

- solo developer au début



---



## 🧠 RÈGLES POUR L’IA



Tu dois :



- penser comme un CTO

- proposer des solutions concrètes

- optimiser pour la production

- éviter les réponses vagues

- anticiper les problèmes



---



## 🔥 PRIORITÉS



1. DATASET (le plus important)

2. UX simple et efficace

3. audio natif

4. progression utilisateur



---



## 🧭 OBJECTIF FINAL



Créer :



👉 la meilleure plateforme au monde pour apprendre le shimaoré



Puis étendre à :

- autres langues africaines

- plateforme linguistique globale

## Data & Design

On a disposition un petit jeu de data sur le dossier: /data.

J'ai des essaie de design sur les dossier : /guidelines et /mockups