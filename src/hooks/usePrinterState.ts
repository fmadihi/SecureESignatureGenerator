import { useState } from 'react';
import { MATERIAL_PRESETS, type MaterialType, type PrinterState } from '../types/printer';


export const usePrinterState = () => {
  const [state, setState] = useState<PrinterState>({
    bedWidth: 220,
    bedDepth: 220,
    bedHeight: 250,
    nozzleTemp: 210,
    bedTemp: 60,
    material: 'PLA',
    filamentColor: '#3b82f6'
  });

  const updateMaterial = (material: MaterialType) => {
    const preset = MATERIAL_PRESETS[material];
    setState(prev => ({
      ...prev,
      material,
      nozzleTemp: preset.nozzleTemp,
      bedTemp: preset.bedTemp
    }));
  };

  const updateDimension = (key: keyof PrinterState, value: number) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const updateColor = (color: string) => {
    setState(prev => ({ ...prev, filamentColor: color }));
  };

  const getThermalWarning = () => {
    const preset = MATERIAL_PRESETS[state.material];
    const warnings: string[] = [];

    if (state.nozzleTemp < preset.nozzleTempRange[0]) {
      warnings.push(`Nozzle too cold for ${state.material}`);
    } else if (state.nozzleTemp > preset.nozzleTempRange[1]) {
      warnings.push(`Nozzle too hot for ${state.material}`);
    }

    if (state.bedTemp < preset.bedTempRange[0]) {
      warnings.push(`Bed too cold for ${state.material}`);
    } else if (state.bedTemp > preset.bedTempRange[1]) {
      warnings.push(`Bed too hot for ${state.material}`);
    }

    return warnings;
  };

  return {
    state,
    updateMaterial,
    updateDimension,
    updateColor,
    getThermalWarning
  };
};
