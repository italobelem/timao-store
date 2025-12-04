export interface Product {
  id?: number;
  nome: string;
  preco: number;
  codigoBarras: string;
  category?: { id: number } | null; 
}