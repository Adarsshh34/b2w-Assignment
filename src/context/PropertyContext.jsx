import React, { createContext, useState, useContext } from "react";
import {
  mockProperties,
  mockAppointments,
  mockInquiries,
} from "../data/mockData";

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(mockProperties);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [inquiries, setInquiries] = useState(mockInquiries);

  const addProperty = (propertyData, sellerId, sellerName) => {
    const newProperty = {
      id: properties.length + 1,
      ...propertyData,
      status: "pending",
      sellerId,
      sellerName,
      postedDate: new Date().toISOString().split("T")[0],
    };
    setProperties([...properties, newProperty]);
    return { success: true, property: newProperty };
  };

  const updatePropertyStatus = (propertyId, status) => {
    setProperties(
      properties.map((prop) =>
        prop.id === propertyId ? { ...prop, status } : prop
      )
    );
  };

  const deleteProperty = (propertyId) => {
    setProperties(properties.filter((prop) => prop.id !== propertyId));
  };

  const getPropertyById = (id) => {
    return properties.find((prop) => prop.id === parseInt(id));
  };

  const getPropertiesBySeller = (sellerId) => {
    return properties.filter((prop) => prop.sellerId === sellerId);
  };

  const getApprovedProperties = () => {
    return properties.filter((prop) => prop.status === "approved");
  };

  const getPendingProperties = () => {
    return properties.filter((prop) => prop.status === "pending");
  };

  // Appointment Management
  const scheduleAppointment = (appointmentData) => {
    const newAppointment = {
      id: appointments.length + 1,
      ...appointmentData,
      status: "scheduled",
      date: appointmentData.date,
      time: appointmentData.time,
    };
    setAppointments([...appointments, newAppointment]);

    // Also add to inquiries
    const inquiry = {
      id: inquiries.length + 1,
      propertyId: appointmentData.propertyId,
      propertyName: appointmentData.propertyName,
      buyerName: appointmentData.buyerName,
      buyerEmail: appointmentData.buyerEmail,
      buyerPhone: appointmentData.buyerPhone,
      message: appointmentData.message || "Appointment scheduled",
      date: new Date().toISOString().split("T")[0],
      status: "new",
    };
    setInquiries([...inquiries, inquiry]);

    return { success: true, appointment: newAppointment };
  };

  const getAppointmentsByBuyer = (buyerId) => {
    return appointments.filter((apt) => apt.buyerId === buyerId);
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
      )
    );
  };

  // Inquiry Management
  const addInquiry = (inquiryData) => {
    const newInquiry = {
      id: inquiries.length + 1,
      ...inquiryData,
      date: new Date().toISOString().split("T")[0],
      status: "new",
    };
    setInquiries([...inquiries, newInquiry]);
    return { success: true, inquiry: newInquiry };
  };

  const getInquiriesBySeller = (sellerId) => {
    const sellerPropertyIds = properties
      .filter((prop) => prop.sellerId === sellerId)
      .map((prop) => prop.id);
    return inquiries.filter((inq) =>
      sellerPropertyIds.includes(inq.propertyId)
    );
  };

  const updateInquiryStatus = (inquiryId, status) => {
    setInquiries(
      inquiries.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq))
    );
  };

  const searchProperties = (filters) => {
    let results = properties.filter((prop) => prop.status === "approved");

    // location
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        (prop) =>
          prop.location.city.toLowerCase().includes(query) ||
          prop.location.locality.toLowerCase().includes(query) ||
          prop.location.state.toLowerCase().includes(query) ||
          prop.name.toLowerCase().includes(query)
      );
    }

    //  configuration
    if (filters.configuration && filters.configuration.length > 0) {
      results = results.filter((prop) =>
        filters.configuration.includes(prop.configuration)
      );
    }

    // price range
    if (filters.minPrice || filters.maxPrice) {
      results = results.filter((prop) => {
        const price = prop.price;
        const minOk = !filters.minPrice || price >= filters.minPrice;
        const maxOk = !filters.maxPrice || price <= filters.maxPrice;
        return minOk && maxOk;
      });
    }

    return results;
  };

  const value = {
    properties,
    appointments,
    inquiries,
    addProperty,
    updatePropertyStatus,
    deleteProperty,
    getPropertyById,
    getPropertiesBySeller,
    getApprovedProperties,
    getPendingProperties,
    scheduleAppointment,
    getAppointmentsByBuyer,
    cancelAppointment,
    addInquiry,
    getInquiriesBySeller,
    updateInquiryStatus,
    searchProperties,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContext;
