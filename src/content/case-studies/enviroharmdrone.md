---
title: "Aerial Data as Storytelling: Mapping Environmental Harm"
description: "Using drone imagery and open-source GIS tools to visualize environmental degradation and advocate for justice."
publishDate: 2025-05-16
author: "Andrea Cozart-Lundin"
tags: ["mapping", "drone", "GIS", "environmental justice", "spatial strategy"]
---

## Why This Matters

Environmental harm doesn’t just live in policy briefs or sensor data — it’s visible from the air.

Aerial imagery allows us to witness the patterns of land loss, pollution, and displacement that might otherwise remain invisible. With care and consent, drone data becomes a tool not of surveillance, but of storytelling — a way to document, advocate, and protect.

---

## <i class="fa-solid fa-circle-info text-indigo-400"></i> Context & Intention

**Scenario:** A hypothetical rural area is facing long-term land degradation due to industrial dumping and unauthorized construction. Local residents suspect environmental violations — but have no proof that’s legible to regulators.

**Objective:** Use drone and GIS tools to generate visual evidence of environmental harm and create compelling, community-centered narratives around its impact.

**Ethical Considerations:**

- **Community Consent:** Never collect data without buy-in from the people most affected.
- **Regulatory Compliance:** Drone flights follow FAA Part 107 rules (Andrea is certified).
- **Transparency:** The resulting maps, models, and insights should be open and accessible.

---

## <i class="fa-solid fa-cogs text-indigo-400"></i> Tools & Methods

| Tool                  | Purpose                                               |
|-----------------------|-------------------------------------------------------|
| DJI Mavic 2 Pro       | Capture high-resolution aerial photos and video       |
| OpenDroneMap (ODM)    | Stitch imagery into 2D/3D spatial models              |
| QGIS                  | Analyze spatial patterns, elevation, and boundaries   |
| FIELDimageR (R pkg)   | Detect vegetation loss and land use shifts            |
| EPA EJScreen          | Contextualize with known environmental justice data   |

---

## <i class="fa-solid fa-drone text-indigo-400"></i> Flight + Data Processing

### Flight Planning
- Defined grid paths with 80% overlap for optimal photogrammetry.
- Captured at 60–120 meters AGL for resolution and area coverage balance.

### Image Capture
- Flew under Part 107 in safe weather conditions with clear line of sight.
- Used both nadir and oblique angles for layered analysis.

### Data Processing
- Processed with OpenDroneMap for orthophotos and digital elevation models (DEMs).
- Georeferenced outputs were imported into QGIS for layer-based analysis.

---

## <i class="fa-solid fa-eye text-indigo-400"></i> What We Found

### Vegetation Loss
Significant dieback near the suspected dumping zone, confirmed with NDVI analysis in FIELDimageR.

### Terrain Disruption
Subtle grade changes and erosion patterns suggesting earth moving or runoff activity.

### Proximity Risks
Mapped residential homes within 250 meters of affected land — potential health and legal risks.

---

## <i class="fa-solid fa-bullhorn text-indigo-400"></i> Why This Matters for Advocacy

Visual data is persuasive in a way that reports often aren’t.

Maps and elevation models can:
- Raise awareness among residents and media
- Serve as exhibits in community hearings
- Pressure local agencies to intervene

When paired with stories and context, this data becomes legible power.

---

## <i class="fa-solid fa-toolbox text-indigo-400"></i> Your Own Toolkit

Interested in replicating this process? Here's where to start:

- **Drone Setup:** DJI Mavic 2 Pro or equivalent. Ensure FAA Part 107 certification.
- **OpenDroneMap:** Free, open-source, and fully local — no cloud upload required.
- **QGIS:** Professional-grade GIS software, also open-source.
- **Ethics First:** Always center consent, transparency, and accountability to those impacted.

---

## <i class="fa-solid fa-link text-indigo-400"></i> Resources

- [OpenDroneMap Docs](https://docs.opendronemap.org/)
- [QGIS Tutorials](https://docs.qgis.org/)
- [EPA EJScreen](https://www.epa.gov/ejscreen)
- [FAA Part 107 Guide](https://www.faa.gov/uas/commercial_operators)

---

## In Closing

This work is speculative, but the tools — and the stakes — are real.

Drones don’t just capture damage; they help communities defend what’s theirs. In the hands of organizers, mappers, and designers, aerial data becomes a language of justice.

**Interested in building your own drone storytelling workflow? [Let’s talk](/contact).**