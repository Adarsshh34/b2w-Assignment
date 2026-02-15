import React from "react";
import { useProperty } from "../context/PropertyContext";
import { useAuth } from "../context/AuthContext";
import "./BuyerDashboard.css";

const BuyerDashboard = () => {
  const { currentUser } = useAuth();
  const { getAppointmentsByBuyer, cancelAppointment } = useProperty();

  const appointments = getAppointmentsByBuyer(currentUser.id);

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(appointmentId);
      alert("Appointment cancelled successfully");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Buyer Dashboard</h1>
          <p>Welcome, {currentUser.name}!</p>
        </div>

        <div className="dashboard-section">
          <h2>My Scheduled Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments-grid">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>{appointment.propertyName}</h3>
                    <span className={`status-badge ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-row">
                      <span className="label">📅 Date:</span>
                      <span className="value">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="label">🕐 Time:</span>
                      <span className="value">{appointment.time}</span>
                    </div>
                    {appointment.message && (
                      <div className="detail-row">
                        <span className="label">💬 Message:</span>
                        <span className="value">{appointment.message}</span>
                      </div>
                    )}
                  </div>

                  {appointment.status === "scheduled" && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="cancel-btn"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No appointments scheduled yet</p>
              <p>Browse properties and schedule viewings!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
