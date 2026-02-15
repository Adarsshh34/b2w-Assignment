import React from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img
          src={property.image}
          alt={property.name}
          className="property-image"
        />
        <div className="property-badge">{property.configuration}</div>
      </div>

      <div className="property-details">
        <h3 className="property-name">{property.name}</h3>

        <div className="property-location">
          📍 {property.location.locality}, {property.location.city}
        </div>

        <div className="property-info">
          <div className="property-price">{formatPrice(property.price)}</div>
          <div className="property-area"> {property.area}</div>
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="property-amenities">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="amenity-tag">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="amenity-tag">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        <button onClick={handleViewDetails} className="view-details-btn">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
