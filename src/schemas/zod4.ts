import { z } from "zod4";

// User Schema
export const userSchema = z.object({
  name: z.string(),
  age: z.number().default(42),
  phone: z
    .union([z.string(), z.number()])
    .transform((phone) =>
      typeof phone === "number" ? phone.toString() : phone
    )
    .default("123-456-7890"),
});

export type User = z.output<typeof userSchema>;
export type UserInput = z.input<typeof userSchema>;

// 1. Product Schema
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  inStock: z.boolean(),
  tags: z.array(z.string()),
});
export type Product = z.infer<typeof productSchema>;

// 2. Order Schema
export const orderSchema = z.object({
  orderId: z.string().uuid(),
  userId: z.string(),
  // Need to define productSchema before referencing it here, which we did.
  items: z.array(productSchema),
  totalAmount: z.number(),
  orderDate: z.date(),
  status: z.enum(["pending", "shipped", "delivered", "cancelled"]),
});
export type Order = z.infer<typeof orderSchema>;

// 3. Address Schema
export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/), // US Zip code regex
  country: z.string().default("USA"),
});
export type Address = z.infer<typeof addressSchema>;

// 4. Customer Schema
// Need to define userSchema and addressSchema first.
// Lazy evaluation needed if schemas referenced each other circularly,
// but here direct reference is fine.
export const customerSchema = z.object({
  customerId: z.string(),
  basicInfo: userSchema,
  shippingAddress: addressSchema,
  billingAddress: addressSchema.nullable(), // Optional billing address
  purchaseHistory: z.array(orderSchema).optional(), // Optional array of orders
});
export type Customer = z.output<typeof customerSchema>;
export type CustomerInput = z.input<typeof customerSchema>;

// 5. BlogPost Schema
export const blogPostSchema = z.object({
  postId: z.number().positive(),
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
  publishDate: z.date().optional(),
  metadata: z.object({
    views: z.number().int().nonnegative(),
    likes: z.number().int().nonnegative(),
    category: z.string(),
  }),
});
export type BlogPost = z.infer<typeof blogPostSchema>;

// 6. Configuration Schema
export const configSchema = z.object({
  apiKey: z.string(),
  timeoutMs: z.number().int().positive().default(5000),
  retries: z.number().int().min(0).max(5),
  featureFlags: z.object({
    betaFeature: z.boolean().optional(), // Optional boolean
    newUI: z.boolean().default(false),
  }),
  logLevel: z.enum(["debug", "info", "warn", "error"]).optional(), // Optional literal
});
export type Config = z.output<typeof configSchema>;
export type ConfigInput = z.input<typeof configSchema>;

// 7. Event Schema
export const eventSchema = z.object({
  eventId: z.string(),
  eventName: z.string(),
  timestamp: z.number(), // Unix timestamp
  payload: z.unknown(), // Can be anything
  source: z.enum(["web", "mobile", "server"]),
});
export type Event = z.infer<typeof eventSchema>;

// 8. Image Metadata Schema
export const imageMetadataSchema = z.object({
  url: z.string().url(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  format: z.enum(["jpeg", "png", "gif", "webp"]),
  caption: z.string().max(255).optional(),
});
export type ImageMetadata = z.infer<typeof imageMetadataSchema>;

// 9. Employee Schema
export const employeeSchema = z.object({
  employeeId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  department: z.string(),
  startDate: z.date(),
  isActive: z.boolean(),
  managerId: z.string().nullable().optional(),
});
export type Employee = z.infer<typeof employeeSchema>;

// 10. Task Schema
// Need employeeSchema defined first.
export const taskSchema = z.object({
  taskId: z.string(),
  description: z.string(),
  dueDate: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]),
  completed: z.boolean().default(false),
  assignee: employeeSchema.nullable(), // Reference another schema
});
export type Task = z.output<typeof taskSchema>;
export type TaskInput = z.input<typeof taskSchema>;
