export type ProductStatus = "active" | "inactive" | "archived";


export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  totalSold: number;
  status: ProductStatus;
  totalViews: number;
  ratingAvg: number;
}