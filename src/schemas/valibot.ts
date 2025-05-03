import * as v from "valibot";

// User Schema
export const userSchema = v.object({
  name: v.string(),
  age: v.optional(v.number(), 42),
  phone: v.pipe(
    v.optional(v.union([v.string(), v.number()]), "123-456-7890"),
    v.transform((phone: string | number) =>
      typeof phone === "number" ? phone.toString() : phone
    )
  ),
});

export type User = v.InferOutput<typeof userSchema>;
export type UserInput = v.InferInput<typeof userSchema>;

// 1. Product Schema
export const productSchema = v.object({
  id: v.string(),
  name: v.string(),
  price: v.pipe(v.number(), v.minValue(0.01)),
  inStock: v.boolean(),
  tags: v.array(v.string()),
});
export type Product = v.InferOutput<typeof productSchema>;

// 2. Order Schema
export const orderSchema = v.object({
  orderId: v.pipe(v.string(), v.uuid()),
  userId: v.string(),
  items: v.array(productSchema),
  totalAmount: v.number(),
  orderDate: v.date(),
  status: v.picklist(["pending", "shipped", "delivered", "cancelled"]),
});
export type Order = v.InferOutput<typeof orderSchema>;

// 3. Address Schema
export const addressSchema = v.object({
  street: v.string(),
  city: v.string(),
  state: v.string(),
  zipCode: v.pipe(v.string(), v.regex(/^[0-9]{5}(?:-[0-9]{4})?$/)),
  country: v.optional(v.string(), "USA"),
});
export type Address = v.InferOutput<typeof addressSchema>;

// 4. Customer Schema
export const customerSchema = v.object({
  customerId: v.string(),
  basicInfo: userSchema,
  shippingAddress: addressSchema,
  billingAddress: v.nullable(addressSchema),
  purchaseHistory: v.optional(v.array(orderSchema)),
});
export type Customer = v.InferOutput<typeof customerSchema>;
export type CustomerInput = v.InferInput<typeof customerSchema>;

// 5. BlogPost Schema
export const blogPostSchema = v.object({
  postId: v.pipe(v.number(), v.minValue(1)),
  title: v.string(),
  content: v.string(),
  authorId: v.string(),
  publishDate: v.optional(v.date()),
  metadata: v.object({
    views: v.pipe(v.number(), v.integer(), v.minValue(0)),
    likes: v.pipe(v.number(), v.integer(), v.minValue(0)),
    category: v.string(),
  }),
});
export type BlogPost = v.InferOutput<typeof blogPostSchema>;

// 6. Configuration Schema
export const configSchema = v.object({
  apiKey: v.string(),
  timeoutMs: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 5000),
  retries: v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(5)),
  featureFlags: v.object({
    betaFeature: v.optional(v.boolean()),
    newUI: v.optional(v.boolean(), false),
  }),
  logLevel: v.optional(v.picklist(["debug", "info", "warn", "error"])),
});
export type Config = v.InferOutput<typeof configSchema>;
export type ConfigInput = v.InferInput<typeof configSchema>;

// 7. Event Schema
export const eventSchema = v.object({
  eventId: v.string(),
  eventName: v.string(),
  timestamp: v.number(),
  payload: v.unknown(),
  source: v.picklist(["web", "mobile", "server"]),
});
export type Event = v.InferOutput<typeof eventSchema>;

// 8. Image Metadata Schema
export const imageMetadataSchema = v.object({
  url: v.pipe(v.string(), v.url()),
  width: v.pipe(v.number(), v.integer(), v.minValue(1)),
  height: v.pipe(v.number(), v.integer(), v.minValue(1)),
  format: v.picklist(["jpeg", "png", "gif", "webp"]),
  caption: v.optional(v.pipe(v.string(), v.maxLength(255))),
});
export type ImageMetadata = v.InferOutput<typeof imageMetadataSchema>;

// 9. Employee Schema
export const employeeSchema = v.object({
  employeeId: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  email: v.pipe(v.string(), v.email()),
  department: v.string(),
  startDate: v.date(),
  isActive: v.boolean(),
  managerId: v.optional(v.nullable(v.string())),
});
export type Employee = v.InferOutput<typeof employeeSchema>;

// 10. Task Schema
export const taskSchema = v.object({
  taskId: v.string(),
  description: v.string(),
  dueDate: v.optional(v.date()),
  priority: v.picklist(["low", "medium", "high"]),
  completed: v.optional(v.boolean(), false),
  assignee: v.nullable(employeeSchema),
});
export type Task = v.InferOutput<typeof taskSchema>;
export type TaskInput = v.InferInput<typeof taskSchema>;
