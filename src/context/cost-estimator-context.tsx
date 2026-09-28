"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface OpenCostEstimatorOptions {
  service?: string; // Service slug or name
  initialSelections?: Record<string, string>;
}

interface CostEstimatorContextType {
  isOpen: boolean;
  selectedService: string | null;
  initialSelections?: Record<string, string>;
  openCostEstimator: (options?: OpenCostEstimatorOptions) => void;
  closeCostEstimator: () => void;
}

const CostEstimatorContext = createContext<CostEstimatorContextType | undefined>(undefined);

export function CostEstimatorProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [initialSelections, setInitialSelections] = useState<Record<string, string> | undefined>(undefined);

  const openCostEstimator = useCallback((options?: OpenCostEstimatorOptions) => {
    if (options?.service) {
      setSelectedService(options.service);
    } else {
      setSelectedService(null);
    }
    setInitialSelections(options?.initialSelections);
    setIsOpen(true);
  }, []);

  const closeCostEstimator = useCallback(() => {
    setIsOpen(false);
    setSelectedService(null);
    setInitialSelections(undefined);
  }, []);

  return (
    <CostEstimatorContext.Provider
      value={{
        isOpen,
        selectedService,
        initialSelections,
        openCostEstimator,
        closeCostEstimator,
      }}
    >
      {children}
    </CostEstimatorContext.Provider>
  );
}

export function useCostEstimator() {
  const context = useContext(CostEstimatorContext);
  if (!context) {
    throw new Error("useCostEstimator must be used within a CostEstimatorProvider");
  }
  return context;
}
