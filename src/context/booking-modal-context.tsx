"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface OpenBookingOptions {
  service?: string | null;
  source?: string;
}

interface BookingModalContextType {
  isOpen: boolean;
  selectedService: string | null;
  source: string;
  openBookingModal: (options?: OpenBookingOptions) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(
  undefined
);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [source, setSource] = useState<string>("generic");

  const openBookingModal = useCallback((options?: OpenBookingOptions) => {
    setSelectedService(options?.service || null);
    setSource(options?.source || "generic");
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
    setSelectedService(null);
  }, []);

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        selectedService,
        source,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
