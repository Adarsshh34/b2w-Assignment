import React from "react";
import { useProperty } from "../context/PropertyContext";
import { useAuth } from "../context/AuthContext";
import "./AdminPanel.css";

const AdminPanel = () => {
  const { properties, updatePropertyStatus, deleteProperty } = useProperty();
  const { users } = useAuth();

  const pendingProperties = properties.filter((p) => p.status === "pending");
  const approvedProperties = properties.filter((p) => p.status === "approved");

  const handleApprove = (propertyId) => {
    updatePropertyStatus(propertyId, "approved");
    alert("Property approved successfully");
  };

  const handleReject = (propertyId) => {
    if (window.confirm("Are you sure you want to reject this property?")) {
      updatePropertyStatus(propertyId, "rejected");
      alert("Property rejected");
    }
  };

  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(propertyId);
      alert("Property deleted successfully");
    }
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Panel</h1>
          <p>Manage properties and users</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{properties.length}</h3>
            <p>Total Properties</p>
          </div>
          <div className="stat-card">
            <h3>{pendingProperties.length}</h3>
            <p>Pending Approval</p>
          </div>
          <div className="stat-card">
            <h3>{approvedProperties.length}</h3>
            <p>Approved</p>
          </div>
          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Pending Approvals</h2>
          {pendingProperties.length > 0 ? (
            <div className="admin-properties-list">
              {pendingProperties.map((property) => (
                <div key={property.id} className="admin-property-card">
                  <img src={property.image} alt={property.name} />
                  <div className="property-details">
                    <h3>{property.name}</h3>
                    <p className="location">
                      📍 {property.location.locality}, {property.location.city}
                    </p>
                    <div className="property-meta">
                      <span className="price">
                        {formatPrice(property.price)}
                      </span>
                      <span className="config">{property.configuration}</span>
                    </div>
                    <p className="seller">Seller: {property.sellerName}</p>
                    <p className="date">
                      Posted:{" "}
                      {new Date(property.postedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleApprove(property.id)}
                      className="approve-btn"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleReject(property.id)}
                      className="reject-btn"
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No pending properties</div>
          )}
        </div>

        <div className="dashboard-section">
          <h2>All Properties</h2>
          <div className="admin-properties-list">
            {properties.map((property) => (
              <div key={property.id} className="admin-property-card">
                <img src={property.image} alt={property.name} />
                <div className="property-details">
                  <h3>{property.name}</h3>
                  <p className="location">
                    📍 {property.location.locality}, {property.location.city}
                  </p>
                  <div className="property-meta">
                    <span className="price">{formatPrice(property.price)}</span>
                    <span className={`status ${property.status}`}>
                      {property.status}
                    </span>
                  </div>
                  <p className="seller">Seller: {property.sellerName}</p>
                </div>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Registered Users</h2>
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.phone || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
