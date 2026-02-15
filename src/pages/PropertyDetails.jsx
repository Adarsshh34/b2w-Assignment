import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProperty } from "../context/PropertyContext";
import { useAuth } from "../context/AuthContext";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, scheduleAppointment } = useProperty();
  const { currentUser, isAuthenticated } = useAuth();

  const property = getPropertyById(id);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  if (!property) {
    return (
      <div className="container">
        <h2>Property not found</h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const handleScheduleClick = () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    if (currentUser.role !== "buyer") {
      alert("Only buyers can schedule appointments");
      return;
    }
    setShowAppointmentForm(true);
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();

    const appointment = {
      propertyId: property.id,
      propertyName: property.name,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerEmail: currentUser.email,
      buyerPhone: currentUser.phone,
      ...appointmentData,
    };

    scheduleAppointment(appointment);
    setSuccessMessage("Appointment scheduled successfully!");
    setShowAppointmentForm(false);
    setAppointmentData({ date: "", time: "", message: "" });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="property-details-page">
      <div className="property-details-container">
        <button onClick={() => navigate("/")} className="back-btn">
          ← Back to Properties
        </button>

        <div className="property-main">
          <img
            src={property.image}
            alt={property.name}
            className="property-main-image"
          />

          <div className="property-info-section">
            <h1>{property.name}</h1>
            <p className="property-location-detail">
              📍 {property.location.locality}, {property.location.city},{" "}
              {property.location.state}
            </p>

            <div className="property-key-details">
              <div className="detail-item">
                <span className="detail-label">Price</span>
                <span className="detail-value price">
                  {formatPrice(property.price)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Configuration</span>
                <span className="detail-value">{property.configuration}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Area</span>
                <span className="detail-value">{property.area}</span>
              </div>
            </div>

            <div className="property-description">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>

            <div className="property-amenities-section">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    ✓ {amenity}
                  </div>
                ))}
              </div>
            </div>

            <div className="property-seller-info">
              <h3>Posted By</h3>
              <p>
                <strong>{property.sellerName}</strong>
              </p>
              <p>
                Posted on: {new Date(property.postedDate).toLocaleDateString()}
              </p>
            </div>

            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {!showAppointmentForm ? (
              <button onClick={handleScheduleClick} className="schedule-btn">
                Schedule Appointment
              </button>
            ) : (
              <form
                onSubmit={handleSubmitAppointment}
                className="appointment-form"
              >
                <h3>Schedule Viewing</h3>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    value={appointmentData.date}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        date: e.target.value,
                      })
                    }
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time</label>
                  <input
                    type="time"
                    value={appointmentData.time}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        time: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    value={appointmentData.message}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        message: e.target.value,
                      })
                    }
                    placeholder="Any specific requirements or questions..."
                    rows="3"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    Confirm Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAppointmentForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
