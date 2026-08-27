// import type { BedDimensions, Material } from '../types/printer'
// import { FilamentSwatch } from './FilamentSwatch'

// interface Props {
//   materials: Material[]
//   selectedMaterial: Material
//   nozzleTemp: number
//   bedTemp: number
//   bed: BedDimensions
//   onMaterialChange: (material: Material) => void
//   onNozzleTempChange: (value: number) => void
//   onBedTempChange: (value: number) => void
//   onBedDimensionChange: (key: keyof BedDimensions, value: number) => void
// }

// export function ControlPanel({
//   materials,
//   selectedMaterial,
//   nozzleTemp,
//   bedTemp,
//   bed,
//   onMaterialChange,
//   onNozzleTempChange,
//   onBedTempChange,
//   onBedDimensionChange,
// }: Props) {
//   return (
//     <div className="flex flex-col gap-6 p-4 bg-slate-900 rounded-xl border border-slate-700">
//       <div>
//         <h2 className="text-sm font-semibold mb-2 text-slate-300">Filament</h2>
//         <div className="flex flex-wrap gap-2">
//           {materials.map((m) => (
//             <FilamentSwatch
//               key={m.id}
//               material={m}
//               selected={m.id === selectedMaterial.id}
//               onClick={() => onMaterialChange(m)}
//             />
//           ))}
//         </div>
//       </div>

//       <div>
//         <h2 className="text-sm font-semibold mb-2 text-slate-300">
//           Nozzle Temp ({selectedMaterial.nozzleTemp.min}–{selectedMaterial.nozzleTemp.max}°C)
//         </h2>
//         <input
//           type="range"
//           min={selectedMaterial.nozzleTemp.min - 10}
//           max={selectedMaterial.nozzleTemp.max + 10}
//           value={nozzleTemp}
//           onChange={(e) => onNozzleTempChange(Number(e.target.value))}
//           className="w-full"
//         />
//         <span className="text-xs text-slate-400">{nozzleTemp}°C</span>
//       </div>

//       <div>
//         <h2 className="text-sm font-semibold mb-2 text-slate-300">
//           Bed Temp ({selectedMaterial.bedTemp.min}–{selectedMaterial.bedTemp.max}°C)
//         </h2>
//         <input
//           type="range"
//           min={selectedMaterial.bedTemp.min}
//           max={selectedMaterial.bedTemp.max + 10}
//           value={bedTemp}
//           onChange={(e) => onBedTempChange(Number(e.target.value))}
//           className="w-full"
//         />
//         <span className="text-xs text-slate-400">{bedTemp}°C</span>
//       </div>

//       <div>
//         <h2 className="text-sm font-semibold mb-2 text-slate-300">Bed Dimensions (mm)</h2>
//         <div className="grid grid-cols-3 gap-2">
//           {(['width', 'depth', 'height'] as const).map((key) => (
//             <label key={key} className="flex flex-col gap-1 text-xs text-slate-400 capitalize">
//               {key}
//               <input
//                 type="number"
//                 min={50}
//                 max={500}
//                 value={bed[key]}
//                 onChange={(e) => onBedDimensionChange(key, Number(e.target.value))}
//                 className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-100"
//               />
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
import React from 'react';
import { MATERIAL_PRESETS, type MaterialType, type PrinterState } from '../types/printer';


interface Props {
  state: any;
  onMaterialChange: (material: MaterialType) => void;
 onDimensionChange: (key: keyof PrinterState, value: number) => void;
}

export const ControlPanel: React.FC<Props> = ({ state, onMaterialChange, onDimensionChange }) => {
  return (
    <div className="bg-dark-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-7 space-y-6 border border-slate-800/80 shadow-panel">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
            ⚙
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100 tracking-tight">Print Settings</h2>
            <p className="text-xs text-slate-400">Configure machine limits & thermal targets</p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
          PROFILES
        </span>
      </div>

      {/* Material Selector */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Material Preset</label>
          <span className="text-xs font-mono text-blue-400 font-medium">Selected: {state.material}</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {Object.keys(MATERIAL_PRESETS).map((mat) => {
            const isSelected = state.material === mat;
            return (
              <button
                key={mat}
                type="button"
                onClick={() => onMaterialChange(mat as MaterialType)}
                className={`group relative py-2.5 px-3 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-glow-sm shadow-blue-500/25 border border-blue-400/40 translate-y-[-1px]'
                    : 'bg-dark-850/80 hover:bg-dark-750 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-center space-x-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-300 animate-pulse' : 'bg-slate-500 group-hover:bg-slate-400'}`} />
                  <span>{mat}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bed Dimensions */}
      <div className="space-y-4 pt-2 border-t border-slate-800/60">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Bed Dimensions (mm)</h3>
          <span className="text-xs font-mono text-slate-400">XYZ Volume</span>
        </div>
        
        <div className="space-y-3.5 bg-dark-950/40 p-4 rounded-xl border border-slate-800/50">
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono flex items-center justify-center">X</span>
                Width
              </span>
              <span className="font-mono text-xs font-semibold text-blue-400 bg-blue-950/40 border border-blue-800/40 px-2 py-0.5 rounded">{state.bedWidth} mm</span>
            </div>
            <input
              type="range"
              min="150"
              max="300"
              value={state.bedWidth}
              onChange={(e) => onDimensionChange('bedWidth', Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-mono flex items-center justify-center">Y</span>
                Depth
              </span>
              <span className="font-mono text-xs font-semibold text-blue-400 bg-blue-950/40 border border-blue-800/40 px-2 py-0.5 rounded">{state.bedDepth} mm</span>
            </div>
            <input
              type="range"
              min="150"
              max="300"
              value={state.bedDepth}
              onChange={(e) => onDimensionChange('bedDepth', Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono flex items-center justify-center">Z</span>
                Height
              </span>
              <span className="font-mono text-xs font-semibold text-blue-400 bg-blue-950/40 border border-blue-800/40 px-2 py-0.5 rounded">{state.bedHeight} mm</span>
            </div>
            <input
              type="range"
              min="200"
              max="400"
              value={state.bedHeight}
              onChange={(e) => onDimensionChange('bedHeight', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Temperature Controls */}
      <div className="space-y-4 pt-2 border-t border-slate-800/60">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Target Temperatures (°C)</h3>
          <span className="text-xs font-mono text-amber-400/90">⚡ Active Control</span>
        </div>
        
        <div className="space-y-3.5 bg-dark-950/40 p-4 rounded-xl border border-slate-800/50">
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <span className="text-orange-400">🔥</span> Nozzle Temp
              </span>
              <span className="font-mono text-xs font-semibold text-orange-400 bg-orange-950/40 border border-orange-800/40 px-2 py-0.5 rounded">{state.nozzleTemp} °C</span>
            </div>
            <input
              type="range"
              min="180"
              max="280"
              value={state.nozzleTemp}
              onChange={(e) => onDimensionChange('nozzleTemp', Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <span className="text-amber-400">♨️</span> Heated Bed
              </span>
              <span className="font-mono text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">{state.bedTemp} °C</span>
            </div>
            <input
              type="range"
              min="40"
              max="120"
              value={state.bedTemp}
              onChange={(e) => onDimensionChange('bedTemp', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};