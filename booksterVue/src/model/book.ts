/**
 * Book interface. 
 */

export interface Book{
    title: string;
    author: string; 
    quantity: number;
    orderQuantity?: number;
}