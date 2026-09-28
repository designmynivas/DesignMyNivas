import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  city: z.enum(["Hyderabad", "Warangal", "Karimnagar", "Other"]),
  property_type: z.string().optional(),
  budget_range: z.string().optional(),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
