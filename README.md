# AI Space Odyssey Storyboard

An interactive, retro-futuristic deep-space flight log charting a cohort crew's journey through the Agentic AI universe. This application acts as a dynamic learning journal and reference guide built to capture the coursework, guest lectures, and code projects completed each week.

## 🚀 Purpose & Creation

This project is **vibe coded** as an interactive hands-on learning exercise. The core goal is to visualize and consolidate the coursework from the **Agentic AI Bootcamp Cohort**, transforming dense lecture topics and concepts into a premium, interactive spatial dashboard. 

---

## 🛰️ What is Covered

### Voyage 1: Week 1 AI Space Odyssey
The Voyager-1 module details the introductory phase of our journey:
* **The Cosmic Spark (Log 1)**: Charting the transition from legacy code structures to the AI Singularity.
* **The Flight Crew (Log 2)**: Landing alongside flight commanders **Aishwarya** and **Aravind**.
* **AI Celestial Map (Log 3)**: An interactive planetary map mapping LLM Foundations, Prompt Engineering, Agentic Transition, and Production systems. Hovering or clicking scanning markers reveals telemetry logs.
* **Cosmic Transmissions (Log 4)**: Guest logs from **Dominik Kundel** (OpenAI) and **Ethan Carlson** (Whisperflow).
* **The Test Flight (Log 5)**: The integration of **FreightcarchecK**—a manifest visual scanner for train crews and first responders to locate hazardous materials, classes, and weights in seconds. Includes a simulated bash script terminal that performs a mock streamlit parsing scan.
* **Cohort Knowledge Archive (Log 6)**: A massive data core vault integrating **180 glossary terms** from the bootcamp glossary PDF. Tap into memory nodes across LLM Foundations, Agentic AI, and Production Readiness. Supports click-to-decrypt terms, search bar filters, and clipboard telemetry copying.
* **Orbit Established (Log 7)**: Captain's stats summarizing cohort telemetry coordinates mapped, transmissions logged, projects deployed, and modules scanned.

### Voyage 2: Week 2 RAG & Agentic Systems
The Voyager-2 module details our deep dive into grounding AI agents:
* **Navigating the RAG Nebula (Log 1)**: Learning how to ground AI reasoning in external, proprietary databanks to ensure accurate, hallucination-free generation.
* **Encounters with Guest Experts (Log 2)**: Domain transmissions from **Arjun Patel** (Pinecone) on vector databases at scale and **Logan Markewich** (LlamaIndex) on advanced indexing and query routing.
* **Key Waypoints (Log 3)**: Core RAG concepts including Retrieval-Augmented Generation, Context Engineering, Text Embeddings, and Agentic RAG loops.
* **Deep Dive Discoveries (Log 4)**: In-depth analysis of Chunking Strategies, Advanced Retrieval/Reranking, GraphRAG with Neo4j, and RAG/Vision Evaluations.
* **The Test Flight (Log 5)**: A dual-pipeline RAG showdown application comparing **Graph RAG (Neo4j)** vs **Vector RAG (Pinecone)** on e-commerce supply chain data, supporting dynamic model hot-swapping and Cypher arrow corrections.
* **Cohort Knowledge Archive (Log 6)**: An interactive Week 2 glossary vault cataloging RAG terms across 3 main pillars: RAG Architectures, Retrieval & Indexing, and Context & Memory.
* **Databanks & Resources Captured (Log 7)**: Syncing RAG research papers, frameworks (LangChain/LlamaIndex), and evaluation tools (Ragas/Promptfoo).
* **Mission Objectives Achieved (Log 8)**: Recap of skills in building ingestion pipelines, optimizing hybrid search, deploying agentic flows, and conducting LLM-as-a-judge evaluations.

### Voyages 3 through 7
Locked navigation compartments prepared to boot up and receive incoming data logs as the hyperdrive initiates.

---

## 🛠️ Technical Stack & Design

* **Core**: Vanilla HTML5, CSS3, and ES6+ JavaScript.
* **Aesthetics**: Sleek dark mode theme with glassmorphism panels, glowing HSL border gradients, animations, holographic terminal viewports, scanlines, and audio cues.
* **Scroll Rocket Tracker**: A CSS/JS custom orbital indicator that translates scroll position into rocket travel along the mission timeline path, rotating and wobbling as it descends.
* **Bundler**: Vite dev server and bundler.

---

## 💻 Running the Application

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Setup and Start
1. Clone or navigate to the project repository:
   ```bash
   cd resilient-bohr
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL in your browser (typically `http://localhost:5173/`).

### Building for Production
To build the optimized static assets:
```bash
npm run build
```
This outputs the compiled and minified code bundles to the `/dist` directory. You can preview the production build locally with:
```bash
npm run preview
```
