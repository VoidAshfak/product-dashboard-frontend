export type ProductStatus = "active" | "inactive" | "archived";

export type ProductCategory =
  | "Streaming Plan"
  | "Add-on"
  | "GPU Instance"
  | "Storage";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;

  price: number;
  currency: "USD" | "EUR" | "BDT";

  status: ProductStatus;
  stock: number;
  minStockThreshold: number;

  totalSold: number;
  totalViews: number;
  ratingAvg: number;
  ratingCount: number;

  createdAt: string;
  updatedAt: string;
}


export const sampleProducts: Product[] = [
  {
    id: "prod_3dstream_basic",
    name: "3D Streaming Basic",
    sku: "3DS-BASIC-001",
    category: "Streaming Plan",

    price: 19,
    currency: "USD",

    status: "active",
    stock: 99, // SaaS, you can treat as unlimited
    minStockThreshold: 0,

    totalSold: 320,
    totalViews: 1800,
    ratingAvg: 4.3,
    ratingCount: 95,

    createdAt: "2025-01-10T09:30:00.000Z",
    updatedAt: "2025-11-10T11:15:00.000Z"
  },
  {
    id: "prod_3dstream_pro",
    name: "3D Streaming Pro",
    sku: "3DS-PRO-002",
    category: "Streaming Plan",

    price: 49,
    currency: "USD",

    status: "active",
    stock: 23,
    minStockThreshold: 0,

    totalSold: 210,
    totalViews: 1350,
    ratingAvg: 4.6,
    ratingCount: 72,

    createdAt: "2025-02-05T12:00:00.000Z",
    updatedAt: "2025-11-11T08:40:00.000Z"
  },
  {
    id: "prod_gpu_small",
    name: "GPU Instance – Small",
    sku: "GPU-S-003",
    category: "GPU Instance",

    price: 0.3, // per hour
    currency: "USD",

    status: "archived",
    stock: 40,
    minStockThreshold: 15,

    totalSold: 5200,       // hours sold
    totalViews: 2600,
    ratingAvg: 4.1,
    ratingCount: 40,

    createdAt: "2025-03-01T10:20:00.000Z",
    updatedAt: "2025-11-12T14:05:00.000Z"
  },
  {
    id: "prod_gpu_large",
    name: "GPU Instance – Large",
    sku: "GPU-L-004",
    category: "GPU Instance",

    price: 1.1,
    currency: "USD",

    status: "active",
    stock: 10,
    minStockThreshold: 8,

    totalSold: 1950,
    totalViews: 2200,
    ratingAvg: 4.8,
    ratingCount: 63,

    createdAt: "2025-04-15T07:45:00.000Z",
    updatedAt: "2025-11-13T09:55:00.000Z"
  },
  {
    id: "prod_storage_1tb",
    name: "Cloud Storage 1 TB",
    sku: "STOR-1TB-005",
    category: "Storage",

    price: 9,
    currency: "USD",

    status: "active",
    stock: 24,
    minStockThreshold: 0,

    totalSold: 430,
    totalViews: 1200,
    ratingAvg: 4.2,
    ratingCount: 51,

    createdAt: "2025-05-02T13:10:00.000Z",
    updatedAt: "2025-11-09T16:32:00.000Z"
  },
  {
    id: "prod_storage_5tb",
    name: "Cloud Storage 5 TB",
    sku: "STOR-5TB-006",
    category: "Storage",

    price: 29,
    currency: "USD",

    status: "inactive",
    stock: 67,
    minStockThreshold: 0,

    totalSold: 75,
    totalViews: 410,
    ratingAvg: 3.9,
    ratingCount: 18,

    createdAt: "2025-06-10T08:00:00.000Z",
    updatedAt: "2025-10-01T10:15:00.000Z"
  },
  {
    id: "prod_addon_priority_support",
    name: "Priority Support Add-on",
    sku: "ADD-PRSUP-007",
    category: "Add-on",

    price: 15,
    currency: "USD",

    status: "active",
    stock: 0,
    minStockThreshold: 0,

    totalSold: 140,
    totalViews: 500,
    ratingAvg: 4.5,
    ratingCount: 27,

    createdAt: "2025-07-01T09:00:00.000Z",
    updatedAt: "2025-11-08T17:45:00.000Z"
  },
  {
    id: "prod_addon_custom_branding",
    name: "Custom Branding Add-on",
    sku: "ADD-CBRAND-008",
    category: "Add-on",

    price: 39,
    currency: "USD",

    status: "archived",
    stock: 0,
    minStockThreshold: 0,

    totalSold: 0,
    totalViews: 85,
    ratingAvg: 0,
    ratingCount: 0,

    createdAt: "2025-10-20T11:30:00.000Z",
    updatedAt: "2025-10-25T11:30:00.000Z"
  }
];
