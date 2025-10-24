"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";

interface SubscriptionData {
  plan: "FREE" | "PRO";
  expiry?: string;
  isExpired?: boolean;
}

interface SubscriptionContextType {
  subscription: SubscriptionData | null;
  loading: boolean;
  error: string | null;
  refreshSubscription: () => Promise<void>;
  updateSubscription: (newSubscription: SubscriptionData) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubscription = async () => {
    if (!session) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await apiClient.getSubscription();
      if (response.success) {
        setSubscription(response.data as SubscriptionData);
      } else {
        setError("Failed to load subscription");
      }
    } catch (err) {
      setError("Failed to load subscription");
      console.error("Failed to load subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshSubscription = async () => {
    setLoading(true);
    await loadSubscription();
  };

  const updateSubscription = (newSubscription: SubscriptionData) => {
    setSubscription(newSubscription);
  };

  useEffect(() => {
    loadSubscription();
  }, [session]);

  // Refresh subscription when window gains focus (user comes back from payment)
  useEffect(() => {
    const handleFocus = () => {
      if (session && !loading) {
        refreshSubscription();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [session, loading]);

  const value: SubscriptionContextType = {
    subscription,
    loading,
    error,
    refreshSubscription,
    updateSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}
