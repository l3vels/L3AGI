import { Nullable } from './utils'

export interface Resource {
    id: string
    name: string
    display_name: string
    type: 'cpu' | 'gpu'
    category:  Nullable<string>
    ram: number
    secure_price: number
    one_month_price: number
    three_month_price: number
    six_month_price: number
    max_gpu: number
    lowest_price: Record<string, any>,
    status: 'low' | 'unavailable' | 'high'
    disc_type: 'ssd' | 'nvme'
    cloud_type: 'secure cloud' | 'community cloud'
    region: string
    cuda_version: number
}