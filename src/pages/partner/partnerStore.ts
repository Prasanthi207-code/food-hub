import { useEffect, useState } from "react";
export type SupplyStatus = "pending" | "accepted" | "scheduled" | "in_transit" | "received" | "processing" | "completed" | "rejected";
export interface PartnerSupply { id: string; source: string; category: string; quantity: number; pickup: string; pickupDate: string; status: SupplyStatus; notes: string; }
const seed: PartnerSupply[] = [
  { id: "SUP-1048", source: "Grand Hotel Kitchen", category: "Organic Food Waste", quantity: 150, pickup: "123 Main Street, Downtown", pickupDate: "2026-09-07", status: "accepted", notes: "Accepted category under active agreement." },
  { id: "SUP-1049", source: "Green Leaf Restaurant", category: "Produce trimmings", quantity: 90, pickup: "789 Elm Boulevard, Eastside", pickupDate: "2026-09-08", status: "pending", notes: "Confirm collection window with platform." },
];
const key = "foodflow_partner_supplies";
export function usePartnerSupplies() { const [supplies, setSupplies] = useState<PartnerSupply[]>(() => { try { return JSON.parse(localStorage.getItem(key) || "null") || seed; } catch { return seed; } }); useEffect(() => localStorage.setItem(key, JSON.stringify(supplies)), [supplies]); const update = (id: string, patch: Partial<PartnerSupply>) => setSupplies((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item)); return { supplies, update }; }
export function usePartnerCapacity() { const [capacity, setCapacity] = useState(() => { try { return JSON.parse(localStorage.getItem("foodflow_partner_capacity") || "null") || { total: 1000, used: 720, reserved: 100 }; } catch { return { total: 1000, used: 720, reserved: 100 }; } }); useEffect(() => localStorage.setItem("foodflow_partner_capacity", JSON.stringify(capacity)), [capacity]); return { capacity, setCapacity }; }
