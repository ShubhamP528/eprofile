'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'

interface Card {
    id: string
    username: string
    title: string
    subtitle?: string
    bio?: string
    profileImage?: string
    coverImage?: string
    template: string
    phone?: string
    email?: string
    address?: string
    isPublic: boolean
    createdAt: string
    updatedAt: string
}

export function useCards() {
    const [cards, setCards] = useState<Card[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCards = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await apiClient.getCards()

            if (response.success) {
                setCards(response.data as Card[] || [])
            } else {
                setError(response.error?.message || 'Failed to fetch cards')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    const createCard = async (cardData: any) => {
        try {
            const response = await apiClient.createCard(cardData)

            if (response.success) {
                await fetchCards() // Refresh the list
                return { success: true, data: response.data }
            } else {
                return { success: false, error: response.error?.message || 'Failed to create card' }
            }
        } catch (err) {
            return { success: false, error: 'An unexpected error occurred' }
        }
    }

    const updateCard = async (id: string, cardData: any) => {
        try {
            const response = await apiClient.updateCard(id, cardData)

            if (response.success) {
                await fetchCards() // Refresh the list
                return { success: true, data: response.data }
            } else {
                return { success: false, error: response.error?.message || 'Failed to update card' }
            }
        } catch (err) {
            return { success: false, error: 'An unexpected error occurred' }
        }
    }

    const deleteCard = async (id: string) => {
        try {
            const response = await apiClient.deleteCard(id)

            if (response.success) {
                await fetchCards() // Refresh the list
                return { success: true }
            } else {
                return { success: false, error: response.error?.message || 'Failed to delete card' }
            }
        } catch (err) {
            return { success: false, error: 'An unexpected error occurred' }
        }
    }

    useEffect(() => {
        fetchCards()
    }, [])

    return {
        cards,
        loading,
        error,
        fetchCards,
        createCard,
        updateCard,
        deleteCard,
    }
}