import { type } from "arktype";

export const userSchema = type({
  name: type.string,
  age: type.number.default(42),
  phone: type.string
    .or(type.number)
    .pipe((phone: string | number) =>
      typeof phone === "number" ? phone.toString() : phone
    )
    .default("123-456-7890"),
});

export type User = typeof userSchema.inferOut;

export type UserInput = typeof userSchema.inferIn;

// 1. Product Schema
export const productSchema = type({
  id: type.string,
  name: type.string,
  price: type.number.moreThan(0),
  inStock: type.boolean,
  tags: type.string.array(),
});
export type Product = typeof productSchema.infer;

// 2. Order Schema
export const orderSchema = type({
  orderId: "string.uuid.v4",
  userId: type.string,
  items: productSchema.array(),
  totalAmount: type.number,
  orderDate: type.Date,
  status: type("'pending'|'shipped'|'delivered'|'cancelled'"),
});
export type Order = typeof orderSchema.infer;

// 3. Address Schema
export const addressSchema = type({
  street: type.string,
  city: type.string,
  state: type.string,
  zipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
  country: type.string.default("USA"),
});
export type Address = typeof addressSchema.infer;

// 4. Customer Schema
export const customerSchema = type({
  customerId: type.string,
  basicInfo: userSchema,
  shippingAddress: addressSchema,
  billingAddress: addressSchema.or(type.null),
  purchaseHistory: orderSchema.array().optional(),
});
export type Customer = typeof customerSchema.inferOut;
export type CustomerInput = typeof customerSchema.inferIn;

// 5. BlogPost Schema
export const blogPostSchema = type({
  postId: type.number.moreThan(0),
  title: type.string,
  content: type.string,
  authorId: type.string,
  publishDate: type.Date.or(type.undefined),
  metadata: {
    views: type.number.atLeast(0),
    likes: type.number.atLeast(0),
    category: type.string,
  },
});
export type BlogPost = typeof blogPostSchema.infer;

// 6. Configuration Schema
export const configSchema = type({
  apiKey: type.string,
  timeoutMs: type.number.moreThan(0).default(5000),
  retries: type.number.atLeast(0).atMost(5),
  featureFlags: {
    "betaFeature?": type.boolean,
    newUI: type.boolean.default(false),
  },
  "logLevel?": type("'debug'|'info'|'warn'|'error'"),
});
export type Config = typeof configSchema.inferOut;
export type ConfigInput = typeof configSchema.inferIn;

// 7. Event Schema
export const eventSchema = type({
  eventId: type.string,
  eventName: type.string,
  timestamp: type.number,
  payload: type.unknown,
  source: type("'web'|'mobile'|'server'"),
});
export type Event = typeof eventSchema.infer;

// 8. Image Metadata Schema
export const imageMetadataSchema = type({
  url: "string.url",
  width: type.number.moreThan(0),
  height: type.number.moreThan(0),
  format: type("'jpeg'|'png'|'gif'|'webp'"),
  "caption?": type.string.atMostLength(255),
});
export type ImageMetadata = typeof imageMetadataSchema.infer;

// 9. Employee Schema
export const employeeSchema = type({
  employeeId: type.string,
  firstName: type.string,
  lastName: type.string,
  email: "string.email",
  department: type.string,
  startDate: type.Date,
  isActive: type.boolean,
  "managerId?": type.string.or(type.null),
});
export type Employee = typeof employeeSchema.infer;

// 10. Task Schema
export const taskSchema = type({
  taskId: type.string,
  description: type.string,
  dueDate: type.Date.optional(),
  priority: type("'low'|'medium'|'high'"),
  completed: type.boolean.default(false),
  assignee: employeeSchema.or(type.null),
});
export type Task = typeof taskSchema.inferOut;
export type TaskInput = typeof taskSchema.inferIn;
