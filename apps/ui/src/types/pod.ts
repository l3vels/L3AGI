
export interface PodInput {
    pod_name: string;
    price: number;
    status: string;
    provider: string;
    category: string;
    type: string;
    resource: string;
    gpu_count: number;
    isinstance_pricing: {
        plan: string;
    };
}

export interface CreatePodResponse {
    success: boolean;
    message: string;
}