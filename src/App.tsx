// import { usePrinterState } from './hooks/usePrinterState'
// import { ControlPanel } from './components/ControlPanel'
// import { OutputPanel } from './components/OutputPanel'
// import { PrintBed3D } from './components/PrintBed3D'

// function App() {
//   const {
//     state,
//     materials,
//     setMaterial,
//     setNozzleTemp,
//     setBedTemp,
//     setBedDimension,
//   } = usePrinterState()

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
//       <header className="mb-6">
//         <h1 className="text-2xl font-bold">3D Printer Filament &amp; Bed Visualizer</h1>
//         <p className="text-slate-400 text-sm">
//           Configure your material, temperatures, and bed size to preview the setup.
//         </p>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <ControlPanel
//           materials={materials}
//           selectedMaterial={state.material}
//           nozzleTemp={state.nozzleTemp}
//           bedTemp={state.bedTemp}
//           bed={state.bed}
//           onMaterialChange={setMaterial}
//           onNozzleTempChange={setNozzleTemp}
//           onBedTempChange={setBedTemp}
//           onBedDimensionChange={setBedDimension}
//         />

//         <div className="lg:col-span-1">
//           <PrintBed3D state={state} />
//         </div>

//         <OutputPanel state={state} />
//       </div>
//     </div>
//   )
// }

// export default App
import React from 'react';
import { usePrinterState } from './hooks/usePrinterState';
import { PrintBed3D } from './components/PrintBed3D';
import { ControlPanel } from './components/ControlPanel';
import { FilamentSwatch } from './components/FilamentSwatch';
import { ThermalBadge } from './components/ThermalBadge';
import { OutputPanel } from './components/OutputPanel';

function App() {
  const { state, updateMaterial, updateDimension, updateColor, getThermalWarning } = usePrinterState();
  const warnings = getThermalWarning();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="relative text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            V2.0 Visual Control Studio
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
            3D Printer Visualizer
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Interactive filament selector, dimensional calibration, and start G-code configuration.
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Visuals & Previews) */}
          <div className="lg:col-span-7 space-y-6">
            <PrintBed3D state={state} />
            <ThermalBadge warnings={warnings} />
            <FilamentSwatch selectedColor={state.filamentColor} onColorChange={updateColor} />
          </div>

          {/* Right Column (Controls & Code Output) */}
          <div className="lg:col-span-5 space-y-6">
            <ControlPanel
              state={state}
              onMaterialChange={updateMaterial}
              onDimensionChange={updateDimension}
            />
            <OutputPanel state={state} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-xs pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>3D Printer Visualizer Studio • React + TypeScript + Tailwind CSS</span>
          <span>Crafted for optimal 3D print workflow</span>
        </footer>
      </div>
    </div>
  );
}

export default App;