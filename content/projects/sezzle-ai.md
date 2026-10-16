---
title: "Sezzle AI Customer Support Agent"
date: "2026-09-15"
description: "RAG-powered conversational AI agent for Sezzle BNPL with intent classification, agentic order actions, confidence scoring, and real-time analytics."
summary: "RAG-powered conversational AI agent for Sezzle BNPL with intent classification, agentic order actions, confidence scoring, and real-time analytics."
highlight: "RAG-Powered AI Agent | Intent Classification & Order Actions"
image: "/images/projects/sezzle-ai.png"
status: "active"
label: "Website"
link: "https://sezzle-ai-customer-support-agent.vercel.app/"
secondaryLabel: "Github"
secondaryLink: "https://github.com/Pratham1603/sezzle-ai-customer-support-agent"
tags: ["AI Agents", "RAG", "GenAI", "Production", "Built from Scratch"]
techStack: ["FastAPI", "Pinecone", "LangChain", "Groq LLaMA 3.3 70B", "React 19", "Streamlit", "Docker"]
category: "AI Agents"
featured: true
published: true
github: "https://github.com/Pratham1603/sezzle-ai-customer-support-agent"
---

# Sezzle AI Customer Support Agent

An end-to-end, production-style conversational AI system built to handle real-world customer support for **Sezzle**, a Buy Now Pay Later (BNPL) fintech platform.

## Key Features

- **Retrieval-Augmented Generation (RAG)**: Answers grounded strictly in Sezzle's official Shopper & Merchant Help Center content via Pinecone vector database.
- **Intent Classification & Agentic Actions**: Detects intents (refunds, order cancellation, status tracking) and executes real actions directly.
- **Confidence Scoring & Auto-Escalation**: Computes similarity confidence; automatically escalates low-confidence queries to human support.
- **Live Streamlit Analytics Dashboard**: Real-time monitoring of conversations, intent distribution, and escalation metrics.
- **Modern Full-Stack UI**: Floating React 19 + Framer Motion chat widget paired with a high-throughput FastAPI backend.

## Tech Stack

- **Backend**: Python 3.11, FastAPI, LangChain
- **LLM & Vectors**: Groq (LLaMA 3.3 70B), Pinecone Vector DB
- **Frontend & Dashboard**: React 19, Framer Motion, Streamlit
- **Deployment**: Docker, Hugging Face Spaces, Vercel
