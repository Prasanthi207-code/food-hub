import { useEffect, useState } from "react";

export type DonorStatus = "pending" | "accepted" | "assigned" | "scheduled" | "picked_up" | "delivered" | "completed" | "cancelled";

export interface DonorDonation {
  id: string;
  foodName: string;
  category: string;
  quantity: string;
  unit: string;
  servings: number;
  preparationDate: string;
  bestBefore: string;
  pickupAddress: string;
  pickupDate: string;
  pickupWindow: string;
  description: string;
  storage: string;
  contact: string;
  instructions: string;
  status: DonorStatus;
  employee: string;
  createdAt: string;
  impactKg: number;
}

const seedDonations: DonorDonation[] = [
  {
    id: "FF-10482",
    foodName: "Fresh vegetable biryani",
    category: "Cooked meal",
    quantity: "8",
    unit: "containers",
    servings: 18,
    preparationDate: "2026-09-06T12:30",
    bestBefore: "2026-09-06T20:00",
    pickupAddress: "15 Maple Street, Downtown",
    pickupDate: "2026-09-06",
    pickupWindow: "6:00 PM - 8:00 PM",
    description: "Freshly prepared vegetarian meal, packed individually.",
    storage: "Refrigerated after preparation",
    contact: "+1 555 010 2020",
    instructions: "Please call on arrival at the side entrance.",
    status: "assigned",
    employee: "Alex Morgan",
    createdAt: "2026-09-06T10:20:00.000Z",
    impactKg: 6.5,
  },
  {
    id: "FF-10391",
    foodName: "Bakery bread assortment",
    category: "Bakery",
    quantity: "3",
    unit: "bags",
    servings: 24,
    preparationDate: "2026-09-05T08:00",
    bestBefore: "2026-09-07T18:00",
    pickupAddress: "42 Cedar Lane, Midtown",
    pickupDate: "2026-09-05",
    pickupWindow: "4:00 PM - 6:00 PM",
    description: "Assorted rolls, loaves, and pastries from today's bake.",
    storage: "Sealed at room temperature",
    contact: "+1 555 010 2020",
    instructions: "Keep bags upright.",
    status: "completed",
    employee: "Jamie Lee",
    createdAt: "2026-09-05T09:10:00.000Z",
    impactKg: 4.2,
  },
];

const storageKey = "foodflow_donor_donations";

export function useDonorDonations() {
  const [donations, setDonations] = useState<DonorDonation[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : seedDonations;
    } catch {
      return seedDonations;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(donations));
  }, [donations]);

  const addDonation = (donation: Omit<DonorDonation, "id" | "createdAt" | "status" | "employee">) => {
    const next: DonorDonation = {
      ...donation,
      id: `FF-${Math.floor(10000 + Math.random() * 89999)}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      employee: "Awaiting assignment",
    };
    setDonations((current) => [next, ...current]);
    return next;
  };

  const updateDonation = (id: string, patch: Partial<DonorDonation>) => {
    setDonations((current) => current.map((donation) => donation.id === id ? { ...donation, ...patch } : donation));
  };

  return { donations, addDonation, updateDonation };
}

export function useDonorPreferences() {
  const [preferences, setPreferences] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("foodflow_donor_preferences") || "{}") as Record<string, boolean>;
    } catch {
      return {};
    }
  });
  useEffect(() => localStorage.setItem("foodflow_donor_preferences", JSON.stringify(preferences)), [preferences]);
  return { preferences, setPreference: (key: string, value: boolean) => setPreferences((current) => ({ ...current, [key]: value })) };
}
