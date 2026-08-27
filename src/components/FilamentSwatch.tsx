// import type { Material } from '../types/printer'

// interface Props {
//   material: Material
//   selected: boolean
//   onClick: () => void
// }

// export function FilamentSwatch({ material, selected, onClick }: Props) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition ${
//         selected
//           ? 'border-white bg-slate-700'
//           : 'border-slate-600 bg-slate-800 hover:bg-slate-700'
//       }`}
//     >
//       <span
//         className="h-4 w-4 rounded-full border border-white/30"
//         style={{ backgroundColor: material.color }}
//       />
//       <span className="text-sm">{material.name}</span>
//     </button>
//   )
// }
import React from 'react';
import { FILAMENT_COLORS } from '../types/printer';


interface Props {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const FilamentSwatch: React.FC<Props> = ({ selectedColor, onColorChange }) => {
  const activeColorObj = FILAMENT_COLORS.find(c => c.hex.toLowerCase() === selectedColor.toLowerCase());

  return (
    <div className="bg-dark-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-800/80 shadow-panel space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 text-sm">
            🎨
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-100">Filament Color</h2>
            <p className="text-xs text-slate-400">Real-time render preview tint</p>
          </div>
        </div>
        {activeColorObj && (
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200">
            {activeColorObj.name}
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 pt-1">
        {FILAMENT_COLORS.map((color) => {
          const isSelected = selectedColor.toLowerCase() === color.hex.toLowerCase();
          return (
            <button
              key={color.hex}
              type="button"
              onClick={() => onColorChange(color.hex)}
              className={`group relative aspect-square rounded-xl transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                isSelected
                  ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-dark-950 shadow-lg shadow-black/60'
                  : 'hover:scale-105 opacity-85 hover:opacity-100 border border-white/10 hover:border-white/30'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};