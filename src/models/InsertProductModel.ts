export type InsertProductModel = {
  id: number | null;
  description: string;
  price: number;
  productTypeId: number | null;
  inventoryQuantity: number | null;
};
