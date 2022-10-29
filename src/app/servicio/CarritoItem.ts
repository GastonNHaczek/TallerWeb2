import { Producto } from "./producto.service";

export interface CarritoItem {
    producto: Producto;
    cantidad: number;
}