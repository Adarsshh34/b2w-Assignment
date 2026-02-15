import React, { useState } from "react";
import { useProperty } from "../context/PropertyContext";
import { useAuth } from "../context/AuthContext";
import "./SellerDashboard.css";

const SellerDashboard = () => {
  const { currentUser } = useAuth();
  const {
    addProperty,
    getPropertiesBySeller,
    getInquiriesBySeller,
    deleteProperty,
  } = useProperty();

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    city: "",
    locality: "",
    state: "",
    configuration: "2BHK",
    area: "",
    description: "",
    amenities: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
  });

  const properties = getPropertiesBySeller(currentUser.id);
  const inquiries = getInquiriesBySeller(currentUser.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const propertyData = {
      name: formData.name,
      price: parseInt(formData.price),
      location: {
        city: formData.city,
        locality: formData.locality,
        state: formData.state,
      },
      configuration: formData.configuration,
      area: formData.area,
      description: formData.description,
      amenities: formData.amenities.split(",").map((a) => a.trim()),
      image: formData.image,
    };

    addProperty(propertyData, currentUser.id, currentUser.name);
    alert("Property added successfully! Waiting for admin approval.");

    // Reset form
    setFormData({
      name: "",
      price: "",
      city: "",
      locality: "",
      state: "",
      configuration: "2BHK",
      area: "",
      description: "",
      amenities: "",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
    });
    setShowAddForm(false);
  };

  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(propertyId);
      alert("Property deleted successfully");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Seller Dashboard</h1>
          <p>Welcome, {currentUser.name}!</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{properties.length}</h3>
            <p>Total Properties</p>
          </div>
          <div className="stat-card">
            <h3>{properties.filter((p) => p.status === "approved").length}</h3>
            <p>Approved</p>
          </div>
          <div className="stat-card">
            <h3>{properties.filter((p) => p.status === "pending").length}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{inquiries.length}</h3>
            <p>Inquiries</p>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>My Properties</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="add-property-btn"
            >
              {showAddForm ? "Cancel" : "+ Add Property"}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="property-form">
              <h3>Add New Property</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Property Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price (₹)*</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Locality*</label>
                  <input
                    type="text"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State*</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Configuration*</label>
                  <select
                    name="configuration"
                    value={formData.configuration}
                    onChange={handleChange}
                    required
                  >
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="4BHK">4BHK</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Area (sq ft)*</label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group full-width">
                <label>Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </div>
              <div className="form-group full-width">
                <label>Amenities (comma-separated)*</label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Gym, Parking, Security"
                />
              </div>
              <button type="submit" className="submit-btn">
                Add Property
              </button>
            </form>
          )}

          <div className="properties-list">
            {properties.map((property) => (
              <div key={property.id} className="property-item">
                <img src={property.image} alt={property.name} />
                <div className="property-info">
                  <h3>{property.name}</h3>
                  <p>
                    {property.location.locality}, {property.location.city}
                  </p>
                  <div className="property-meta">
                    <span className="price">
                      ₹{(property.price / 100000).toFixed(2)}L
                    </span>
                    <span className={`status ${property.status}`}>
                      {property.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
            {properties.length === 0 && (
              <div className="empty-state">No properties added yet</div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Buyer Inquiries</h2>
          <div className="inquiries-list">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="inquiry-item">
                <div className="inquiry-header">
                  <h4>{inquiry.propertyName}</h4>
                  <span className="date">
                    {new Date(inquiry.date).toLocaleDateString()}
                  </span>
                </div>
                <p>
                  <strong>From:</strong> {inquiry.buyerName}
                </p>
                <p>
                  <strong>Email:</strong> {inquiry.buyerEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {inquiry.buyerPhone}
                </p>
                <p>
                  <strong>Message:</strong> {inquiry.message}
                </p>
                <span className={`inquiry-status ${inquiry.status}`}>
                  {inquiry.status}
                </span>
              </div>
            ))}
            {inquiries.length === 0 && (
              <div className="empty-state">No inquiries yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
