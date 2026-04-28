import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "glownify_independent_pro_workspace";

const defaultWorkspace = {
  bookings: [
    {
      id: "IP-101",
      customerName: "Ananya Rao",
      phone: "9876543210",
      service: "Party Makeup",
      date: "2026-04-22",
      displayDate: "Apr 22, 2026",
      time: "10:30",
      displayTime: "10:30 AM",
      duration: "90 mins",
      amount: 2500,
      status: "pending",
      area: "Indiranagar",
      address: "12th Main, Indiranagar",
      code: "7421",
    },
    {
      id: "IP-102",
      customerName: "Meera S.",
      phone: "9988776655",
      service: "Facial Cleanup",
      date: "2026-04-22",
      displayDate: "Apr 22, 2026",
      time: "14:00",
      displayTime: "2:00 PM",
      duration: "60 mins",
      amount: 1200,
      status: "confirmed",
      area: "Koramangala",
      address: "5th Block, Koramangala",
      code: "1938",
    },
    {
      id: "IP-103",
      customerName: "Ritika N.",
      phone: "9123456780",
      service: "Hair Styling",
      date: "2026-04-20",
      displayDate: "Apr 20, 2026",
      time: "17:30",
      displayTime: "5:30 PM",
      duration: "45 mins",
      amount: 900,
      status: "completed",
      area: "HSR Layout",
      address: "Sector 2, HSR Layout",
      code: "6604",
    },
    {
      id: "IP-104",
      customerName: "Shreya P.",
      phone: "9000011112",
      service: "Bridal Makeup Trial",
      date: "2026-04-23",
      displayDate: "Apr 23, 2026",
      time: "12:00",
      displayTime: "12:00 PM",
      duration: "120 mins",
      amount: 3500,
      status: "rescheduled",
      area: "Whitefield",
      address: "Hope Farm Junction, Whitefield",
      code: "2880",
    },
  ],
  services: [
    {
      id: 1,
      name: "Party Makeup",
      category: "Makeup",
      price: 2500,
      duration: "90 mins",
      atHome: true,
      active: true,
    },
    {
      id: 2,
      name: "Facial Cleanup",
      category: "Skin Care",
      price: 1200,
      duration: "60 mins",
      atHome: true,
      active: true,
    },
    {
      id: 3,
      name: "Hair Styling",
      category: "Hair Care",
      price: 900,
      duration: "45 mins",
      atHome: true,
      active: false,
    },
  ],
  serviceAreas: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield"],
  profile: {
    name: "Priya Sharma",
    mobile: "9876543210",
    email: "priya@example.com",
    category: "Makeup",
    services: "Party Makeup, Bridal Makeup, Hair Styling",
    pricing: "Party Makeup - Rs. 2500, Bridal Makeup - Rs. 6000, Hair Styling - Rs. 900",
    serviceArea: "Indiranagar, Koramangala, HSR Layout, Whitefield",
    experience: "6 years",
    approvalStatus: "Approved",
    activeStatus: "Active",
    acceptingBookings: true,
    portfolioImages: [],
  },
};

const readWorkspace = () => {
  if (typeof window === "undefined") return defaultWorkspace;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultWorkspace;
    const parsed = JSON.parse(stored);

    return {
      ...defaultWorkspace,
      ...parsed,
      profile: {
        ...defaultWorkspace.profile,
        ...(parsed.profile || {}),
        portfolioImages: parsed.profile?.portfolioImages || [],
      },
    };
  } catch {
    return defaultWorkspace;
  }
};

const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

const formatTime = (time) => {
  if (!time) return "";
  const [hours = "0", minutes = "0"] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const useIndependentProWorkspace = () => {
  const [workspace, setWorkspace] = useState(readWorkspace);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
  }, [workspace]);

  useEffect(() => {
    const syncWorkspace = (event) => {
      if (event.key === STORAGE_KEY) {
        setWorkspace(readWorkspace());
      }
    };

    window.addEventListener("storage", syncWorkspace);
    return () => window.removeEventListener("storage", syncWorkspace);
  }, []);

  const updateBookingStatus = useCallback((id, status) => {
    setWorkspace((prev) => ({
      ...prev,
      bookings: prev.bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      ),
    }));
  }, []);

  const rescheduleBooking = useCallback((id, date, time) => {
    setWorkspace((prev) => ({
      ...prev,
      bookings: prev.bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              date,
              time,
              displayDate: formatDate(date),
              displayTime: formatTime(time),
              status: "rescheduled",
            }
          : booking
      ),
    }));
  }, []);

  const upsertService = useCallback((service) => {
    setWorkspace((prev) => {
      const exists = prev.services.some((item) => item.id === service.id);
      const services = exists
        ? prev.services.map((item) => (item.id === service.id ? service : item))
        : [service, ...prev.services];

      return { ...prev, services };
    });
  }, []);

  const deleteService = useCallback((id) => {
    setWorkspace((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }));
  }, []);

  const toggleService = useCallback((id) => {
    setWorkspace((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === id ? { ...service, active: !service.active } : service
      ),
    }));
  }, []);

  const addServiceArea = useCallback((area) => {
    setWorkspace((prev) => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, area],
      profile: {
        ...prev.profile,
        serviceArea: [...prev.serviceAreas, area].join(", "),
      },
    }));
  }, []);

  const removeServiceArea = useCallback((area) => {
    setWorkspace((prev) => {
      const serviceAreas = prev.serviceAreas.filter((item) => item !== area);
      return {
        ...prev,
        serviceAreas,
        profile: {
          ...prev.profile,
          serviceArea: serviceAreas.join(", "),
        },
      };
    });
  }, []);

  const updateProfile = useCallback((profilePatch) => {
    setWorkspace((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profilePatch,
      },
    }));
  }, []);

  const addPortfolioImage = useCallback((image) => {
    setWorkspace((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        portfolioImages: [image, ...(prev.profile.portfolioImages || [])].slice(0, 8),
      },
    }));
  }, []);

  const removePortfolioImage = useCallback((id) => {
    setWorkspace((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        portfolioImages: (prev.profile.portfolioImages || []).filter((image) => image.id !== id),
      },
    }));
  }, []);

  const resetWorkspace = useCallback(() => {
    setWorkspace(defaultWorkspace);
  }, []);

  return useMemo(
    () => ({
      ...workspace,
      updateBookingStatus,
      rescheduleBooking,
      upsertService,
      deleteService,
      toggleService,
      addServiceArea,
      removeServiceArea,
      updateProfile,
      addPortfolioImage,
      removePortfolioImage,
      resetWorkspace,
    }),
    [
      workspace,
      updateBookingStatus,
      rescheduleBooking,
      upsertService,
      deleteService,
      toggleService,
      addServiceArea,
      removeServiceArea,
      updateProfile,
      addPortfolioImage,
      removePortfolioImage,
      resetWorkspace,
    ]
  );
};

export { defaultWorkspace, formatDate, formatTime };
