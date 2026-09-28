import { pricingConfig, formatRupees, ServicePricingModel } from "@/data/pricing";
import { getWhatsAppUrl } from "@/lib/config/site";

export interface EstimateResult {
  serviceSlug: string;
  serviceName: string;
  minPrice: number;
  maxPrice: number;
  formattedRange: string;
  disclaimer: string;
  inputsSummary: { label: string; value: string }[];
}

/**
 * Calculates indicative interior cost estimate based on selected service and user inputs.
 */
export function calculateEstimate(
  serviceSlug: string,
  selections: Record<string, string>
): EstimateResult {
  const model: ServicePricingModel = pricingConfig[serviceSlug] || pricingConfig["complete-home-interiors"];

  const { min, max } = model.calculate(selections);

  const inputsSummary: { label: string; value: string }[] = [];

  model.steps.forEach((step) => {
    const selectedOptionId = selections[step.id];
    if (selectedOptionId) {
      const matchedOpt = step.options.find((o) => o.id === selectedOptionId);
      if (matchedOpt) {
        inputsSummary.push({
          label: step.title,
          value: matchedOpt.label,
        });
      }
    }
  });

  return {
    serviceSlug: model.serviceSlug,
    serviceName: model.serviceName,
    minPrice: min,
    maxPrice: max,
    formattedRange: `${formatRupees(min)} – ${formatRupees(max)}`,
    disclaimer: model.disclaimer,
    inputsSummary,
  };
}

export interface WhatsAppEstimateParams {
  serviceName: string;
  userName: string;
  phone: string;
  location: string;
  estimateRange: string;
  inputsSummary: { label: string; value: string }[];
}

/**
 * Generates dynamic WhatsApp enquiry message and returns formatted wa.me URL.
 */
export function generateWhatsAppEstimateUrl(params: WhatsAppEstimateParams): string {
  const { serviceName, userName, phone, location, estimateRange, inputsSummary } = params;

  const detailsList = inputsSummary
    .map((item) => `• ${item.label}: ${item.value}`)
    .join("\n");

  const message = [
    "Hello Design My Nivas,",
    "",
    "I'd like to discuss my interior project.",
    "",
    `Service: ${serviceName}`,
    `Name: ${userName.trim()}`,
    `Phone: ${phone.trim()}`,
    `Location: ${location}`,
    "",
    `Estimated cost: ${estimateRange}`,
    "",
    "Project details:",
    detailsList || "Standard configuration",
    "",
    "Indicative estimate only. Final pricing is confirmed after understanding the site, measurements, materials and scope.",
    "",
    "Please help me with the next steps.",
  ].join("\n");

  return getWhatsAppUrl(message);
}
