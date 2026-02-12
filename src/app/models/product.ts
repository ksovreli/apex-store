export class Product {
    id!: number
    name?: string
    image?: string
    price?: number
    salePrice?: number
    rating!: number
    category?: string
    isNew?: boolean = false
}