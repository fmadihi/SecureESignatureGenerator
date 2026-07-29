# 🔐 Secure E-Signature Generator

A React + TypeScript tool for generating digital signatures with Canvas drawing or typed handwriting fonts, exporting as PNG/SVG and producing a Base64-encoded payload with metadata hash.

## Features
- Draw signature with mouse/touch on Canvas (color + stroke width control)
- Type signature with handwriting fonts (Dancing Script, Pacifico)
- Export as PNG (draw mode) or SVG (type mode)
- Generate Base64 payload + hash simulating backend submission
- Metadata: name, role, public key, timestamp

## Tech Stack
React 18 · TypeScript · Vite · Canvas API · CSS-in-file (no external UI lib)

## Setup
```bash
npm install
npm run dev

## Build

bash
npm run build

## Project Structure


src/
├── components/
│   ├── SignatureCanvas.tsx   # Canvas draw with mouse/touch
│   ├── SignatureTyped.tsx    # Typed signature with fonts
│   └── SignatureForm.tsx     # Name/role/publicKey inputs
├── App.tsx                   # Main logic + export + hash
└── index.css                 # All styles

## Why this project?
Demonstrates direct Canvas API interaction, touch/mouse event handling, Base64 encoding, SVG generation, and clean React component architecture — relevant to real-world e-signature systems.


---

دستورات نصب و اجرا:

```bash
# ۱. ساخت پوشه و ورود
mkdir secure-esignature-generator && cd secure-esignature-generator

# ۲. نصب وابستگی‌ها
npm install

# ۳. اجرای dev server
npm run dev

# ۴. build برای GitHub Pages
npm run build
