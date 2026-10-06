import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";
import WhatsAppActions from "@/components/ui/whatsapp-actions";
import { BookingModalProvider } from "@/context/booking-modal-context";
import { CostEstimatorProvider } from "@/context/cost-estimator-context";
import SiteModals from "@/components/modal/site-modals";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BookingModalProvider>
      <CostEstimatorProvider>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <WhatsAppActions />
        <SiteModals />
        <ScrollReveal />
      </CostEstimatorProvider>
    </BookingModalProvider>
  );
}
