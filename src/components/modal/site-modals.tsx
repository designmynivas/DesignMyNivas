"use client";

import dynamic from "next/dynamic";
import AutoPopupTrigger from "@/components/modal/auto-popup-trigger";

const ServiceBookingModal = dynamic(
  () => import("@/components/modal/service-booking-modal"),
  { ssr: false }
);

const CostEstimatorModal = dynamic(
  () => import("@/components/modal/cost-estimator-modal"),
  { ssr: false }
);

export default function SiteModals() {
  return (
    <>
      <ServiceBookingModal />
      <CostEstimatorModal />
      <AutoPopupTrigger />
    </>
  );
}
