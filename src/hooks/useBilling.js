import { useState, useMemo } from 'react';
import { MOCK_SERVICES as MOCK_BILLING_SERVICES, DISCOUNT_AMOUNT } from '../utils/constants';

/**
 * Shared logic for the billing and invoice management.
 * @param {Array} initialServices - The initial set of services for the bill.
 */
export const useBilling = (initialServices = MOCK_BILLING_SERVICES) => {
    const [services, setServices] = useState(initialServices);
    const [selectedTip, setSelectedTip] = useState(100);

    const increment = (id) => setServices(prev => prev.map(s => s.id === id ? { ...s, qty: s.qty + 1 } : s));
    const decrement = (id) => setServices(prev => prev.map(s => s.id === id ? { ...s, qty: Math.max(1, s.qty - 1) } : s));
    const removeService = (id) => setServices(prev => prev.filter(s => s.id !== id));

    const subtotal = useMemo(() => {
        return services.reduce((sum, s) => sum + (s.price * s.qty), 0);
    }, [services]);

    const grandTotal = useMemo(() => {
        return subtotal + selectedTip - DISCOUNT_AMOUNT;
    }, [subtotal, selectedTip]);

    return {
        services,
        setServices,
        selectedTip,
        setSelectedTip,
        increment,
        decrement,
        removeService,
        subtotal,
        grandTotal,
        discount: DISCOUNT_AMOUNT
    };
};
