import http from '../infrastructure/http';
import { Item } from '../types/Item';


export function createItem(budgetId: number, recipientId: number, name: string, price: number) {
  return http.post<Item>(`/api/budgets/${budgetId}/recipients/${recipientId}/items`, { name, price });
}
  
export function updateItem(budgetId, recipientId, id, name, price, purchased) {
  return http.patch<Item>(`/api/budgets/${budgetId}/recipients/${recipientId}/items/${id}`, { name, price, purchased });
}

export function deleteItem(budgetId, recipientId, id) {
  http.delete(`/api/budgets/${budgetId}/recipients/${recipientId}/items/${id}`);
}