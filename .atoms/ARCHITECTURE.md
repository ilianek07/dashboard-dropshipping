---
last_updated: 2026-05-22T11:58:46Z
---

# Architecture Design

## System Overview
A single-page React dashboard displaying a real-time leaderboard of Top 20 winning Shopify products with dark mode trading terminal aesthetic.

## Tech Stack
- React 18 + TypeScript
- Vite build tool
- Tailwind CSS for styling
- shadcn/ui components
- Lucide React icons

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Data | Product data and types | src/data/products.ts |
| Header | Top navigation bar | src/components/Header.tsx |
| Sidebar | Filters and weekly product | src/components/Sidebar.tsx |
| Leaderboard | Main product list | src/components/Leaderboard.tsx |
| LeaderboardRow | Individual product row | src/components/LeaderboardRow.tsx |
| Index Page | Page assembly | src/pages/Index.tsx |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|

## File Tree Plan

## Implementation Guide

