'use client'

interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: {
        code: string
        message: string
        details?: any
    }
}

class ApiClient {
    private baseUrl: string

    constructor(baseUrl = '/api') {
        this.baseUrl = baseUrl
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || {
                        code: 'HTTP_ERROR',
                        message: `HTTP ${response.status}: ${response.statusText}`,
                    },
                }
            }

            return data
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'NETWORK_ERROR',
                    message: error instanceof Error ? error.message : 'Network error occurred',
                },
            }
        }
    }

    // Cards API
    async getCards() {
        return this.request('/cards')
    }

    async getCard(id: string) {
        return this.request(`/cards/${id}`)
    }

    async getCardByUsername(username: string) {
        return this.request(`/cards/username/${username}`)
    }

    async createCard(data: any) {
        return this.request('/cards', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateCard(id: string, data: any) {
        return this.request(`/cards/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async deleteCard(id: string) {
        return this.request(`/cards/${id}`, {
            method: 'DELETE',
        })
    }

    async checkCardLimit() {
        return this.request('/cards/limit')
    }

    // Leads API
    async getLeads(params?: { cardId?: string; status?: string; page?: number; limit?: number }) {
        const searchParams = new URLSearchParams()
        if (params?.cardId) searchParams.set('cardId', params.cardId)
        if (params?.status) searchParams.set('status', params.status)
        if (params?.page) searchParams.set('page', params.page.toString())
        if (params?.limit) searchParams.set('limit', params.limit.toString())

        const query = searchParams.toString()
        return this.request(`/leads${query ? `?${query}` : ''}`)
    }

    async createLead(cardId: string, data: any) {
        return this.request(`/leads?cardId=${cardId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateLeadStatus(id: string, status: string) {
        return this.request(`/leads/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        })
    }

    // Analytics API
    async getAnalytics(cardId: string, days = 30) {
        return this.request(`/analytics/${cardId}?days=${days}`)
    }

    async trackButtonClick(cardId: string, buttonType: string) {
        return this.request('/analytics/track', {
            method: 'POST',
            body: JSON.stringify({ cardId, buttonType }),
        })
    }

    // Services API
    async getServices(cardId: string) {
        return this.request(`/services?cardId=${cardId}`)
    }

    async getService(id: string) {
        return this.request(`/services/${id}`)
    }

    async createService(cardId: string, data: any) {
        return this.request(`/services?cardId=${cardId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateService(id: string, data: any) {
        return this.request(`/services/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async deleteService(id: string) {
        return this.request(`/services/${id}`, {
            method: 'DELETE',
        })
    }

    async reorderServices(cardId: string, services: Array<{ id: string; order: number }>) {
        return this.request(`/services/reorder?cardId=${cardId}`, {
            method: 'PUT',
            body: JSON.stringify({ services }),
        })
    }

    // Gallery API
    async getGalleryItems(cardId: string) {
        return this.request(`/gallery?cardId=${cardId}`)
    }

    async getGalleryItem(id: string) {
        return this.request(`/gallery/${id}`)
    }

    async createGalleryItem(cardId: string, data: any) {
        return this.request(`/gallery?cardId=${cardId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateGalleryItem(id: string, data: any) {
        return this.request(`/gallery/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async deleteGalleryItem(id: string) {
        return this.request(`/gallery/${id}`, {
            method: 'DELETE',
        })
    }

    async reorderGalleryItems(cardId: string, items: Array<{ id: string; order: number }>) {
        return this.request(`/gallery/reorder?cardId=${cardId}`, {
            method: 'PUT',
            body: JSON.stringify({ items }),
        })
    }

    // Testimonials API
    async getTestimonials(cardId: string) {
        return this.request(`/testimonials?cardId=${cardId}`)
    }

    async getTestimonial(id: string) {
        return this.request(`/testimonials/${id}`)
    }

    async createTestimonial(cardId: string, data: any) {
        return this.request(`/testimonials?cardId=${cardId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateTestimonial(id: string, data: any) {
        return this.request(`/testimonials/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async deleteTestimonial(id: string) {
        return this.request(`/testimonials/${id}`, {
            method: 'DELETE',
        })
    }

    async reorderTestimonials(cardId: string, testimonials: Array<{ id: string; order: number }>) {
        return this.request(`/testimonials/reorder?cardId=${cardId}`, {
            method: 'PUT',
            body: JSON.stringify({ testimonials }),
        })
    }

    // Subscription API
    async getSubscription() {
        return this.request('/subscription')
    }

    async updateSubscription(plan: 'FREE' | 'STANDARD' | 'PRO', paymentId?: string) {
        return this.request('/subscription', {
            method: 'POST',
            body: JSON.stringify({ plan, paymentId }),
        })
    }

    // Payment API
    async createPaymentOrder(plan: 'STANDARD' | 'PRO') {
        return this.request('/payment/create-order', {
            method: 'POST',
            body: JSON.stringify({ plan }),
        })
    }

    async verifyPayment(paymentData: {
        razorpay_order_id: string
        razorpay_payment_id: string
        razorpay_signature: string
        plan: 'STANDARD' | 'PRO'
    }) {
        return this.request('/payment/verify', {
            method: 'POST',
            body: JSON.stringify(paymentData),
        })
    }
}

export const apiClient = new ApiClient()
export type { ApiResponse }