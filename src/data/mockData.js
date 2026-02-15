// Mock data for the Real Estate Platform

export const mockProperties = [
  {
    id: 1,
    name: "Luxury Villa in Bandra",
    price: 25000000,
    location: {
      city: "Mumbai",
      locality: "Bandra West",
      state: "Maharashtra",
    },
    configuration: "3BHK",
    area: "2500 sq ft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500",
    description:
      "Luxurious villa with modern amenities, sea view, and premium finishes.",
    amenities: ["Swimming Pool", "Gym", "Parking", "Security"],
    status: "approved",
    sellerId: 1,
    sellerName: "Premium Builders",
    postedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Modern Apartment in Koramangala",
    price: 8500000,
    location: {
      city: "Bangalore",
      locality: "Koramangala",
      state: "Karnataka",
    },
    configuration: "2BHK",
    area: "1400 sq ft",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
    description:
      "Spacious 2BHK apartment in the heart of Koramangala with all modern amenities.",
    amenities: ["Gym", "Parking", "Power Backup", "Clubhouse"],
    status: "approved",
    sellerId: 2,
    sellerName: "Metro Constructions",
    postedDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Cozy Studio in Gurgaon",
    price: 4500000,
    location: {
      city: "Gurgaon",
      locality: "Cyber City",
      state: "Haryana",
    },
    configuration: "1BHK",
    area: "650 sq ft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
    description: "Perfect for young professionals, close to metro and IT hubs.",
    amenities: ["Parking", "Security", "Power Backup"],
    status: "approved",
    sellerId: 1,
    sellerName: "Premium Builders",
    postedDate: "2024-02-01",
  },
  {
    id: 4,
    name: "Penthouse in Powai",
    price: 35000000,
    location: {
      city: "Mumbai",
      locality: "Powai",
      state: "Maharashtra",
    },
    configuration: "4BHK",
    area: "3500 sq ft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
    description:
      "Spectacular penthouse with panoramic lake views and premium interiors.",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Terrace Garden",
      "Parking",
      "Security",
    ],
    status: "approved",
    sellerId: 3,
    sellerName: "Skyline Developers",
    postedDate: "2024-01-25",
  },
  {
    id: 5,
    name: "Family Home in Whitefield",
    price: 12000000,
    location: {
      city: "Bangalore",
      locality: "Whitefield",
      state: "Karnataka",
    },
    configuration: "3BHK",
    area: "1800 sq ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500",
    description:
      "Spacious family home with garden, perfect for growing families.",
    amenities: ["Garden", "Parking", "Clubhouse", "Children's Play Area"],
    status: "approved",
    sellerId: 2,
    sellerName: "Metro Constructions",
    postedDate: "2024-02-05",
  },
  {
    id: 6,
    name: "Downtown Apartment in Connaught Place",
    price: 18000000,
    location: {
      city: "Delhi",
      locality: "Connaught Place",
      state: "Delhi",
    },
    configuration: "2BHK",
    area: "1600 sq ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
    description:
      "Prime location apartment in the heart of Delhi with excellent connectivity.",
    amenities: ["Gym", "Parking", "Security", "Power Backup"],
    status: "approved",
    sellerId: 3,
    sellerName: "Skyline Developers",
    postedDate: "2024-01-28",
  },
  {
    id: 7,
    name: "Beach View Apartment in Juhu",
    price: 22000000,
    location: {
      city: "Mumbai",
      locality: "Juhu",
      state: "Maharashtra",
    },
    configuration: "3BHK",
    area: "2200 sq ft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500",
    description:
      "Stunning sea-facing apartment with breathtaking sunset views.",
    amenities: ["Swimming Pool", "Gym", "Beach Access", "Parking"],
    status: "pending",
    sellerId: 1,
    sellerName: "Premium Builders",
    postedDate: "2024-02-10",
  },
  {
    id: 8,
    name: "Smart Home in HSR Layout",
    price: 9500000,
    location: {
      city: "Bangalore",
      locality: "HSR Layout",
      state: "Karnataka",
    },
    configuration: "2BHK",
    area: "1350 sq ft",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=500",
    description:
      "Fully automated smart home with IoT integration and modern design.",
    amenities: ["Smart Home", "Gym", "Parking", "Security"],
    status: "pending",
    sellerId: 2,
    sellerName: "Metro Constructions",
    postedDate: "2024-02-12",
  },
];

export const mockUsers = [
  {
    id: 1,
    email: "admin@realestate.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
  {
    id: 2,
    email: "buyer@test.com",
    password: "buyer123",
    role: "buyer",
    name: "John Doe",
    phone: "+91 9876543210",
  },
  {
    id: 3,
    email: "seller@test.com",
    password: "seller123",
    role: "seller",
    name: "Premium Builders",
    company: "Premium Builders Pvt Ltd",
    phone: "+91 9876543211",
    isRegistered: true,
  },
  {
    id: 4,
    email: "buyer2@test.com",
    password: "buyer123",
    role: "buyer",
    name: "Jane Smith",
    phone: "+91 9876543212",
  },
];

export const mockAppointments = [
  {
    id: 1,
    propertyId: 1,
    propertyName: "Luxury Villa in Bandra",
    buyerId: 2,
    buyerName: "John Doe",
    buyerEmail: "buyer@test.com",
    buyerPhone: "+91 9876543210",
    date: "2024-02-20",
    time: "10:00 AM",
    status: "scheduled",
    message: "lkkfejkfjk",
  },
  {
    id: 2,
    propertyId: 4,
    propertyName: "Penthouse in Powai",
    buyerId: 2,
    buyerName: "John Doe",
    buyerEmail: "buyer@test.com",
    buyerPhone: "+91 9876543210",
    date: "2024-02-22",
    time: "2:00 PM",
    status: "scheduled",
    message: "kihdgwjdgjwe",
  },
  {
    id: 3,
    propertyId: 2,
    propertyName: "Modern Apartment in Koramangala",
    buyerId: 4,
    buyerName: "Jane Smith",
    buyerEmail: "buyer2@test.com",
    buyerPhone: "+91 9876543212",
    date: "2024-02-25",
    time: "11:00 AM",
    status: "scheduled",
    message: "yyn hi hiwhd",
  },
];

export const mockInquiries = [
  {
    id: 1,
    propertyId: 1,
    propertyName: "Luxury Villa in Bandra",
    buyerName: "John Doe",
    buyerEmail: "buyer@test.com",
    buyerPhone: "+91 9876543210",
    message: "hi adarsh here",
    date: "2024-02-15",
    status: "new",
  },
  {
    id: 2,
    propertyId: 3,
    propertyName: "Cozy Studio in Gurgaon",
    buyerName: "Jane Smith",
    buyerEmail: "buyer2@test.com",
    buyerPhone: "+91 9876543212",
    message: "hello",
    date: "2024-02-14",
    status: "replied",
  },
];

// Helper functions
export const getCities = () => {
  const cities = mockProperties.map((prop) => prop.location.city);
  return [...new Set(cities)];
};

export const getLocalities = (city) => {
  const localities = mockProperties
    .filter((prop) => prop.location.city === city)
    .map((prop) => prop.location.locality);
  return [...new Set(localities)];
};

export const getStates = () => {
  const states = mockProperties.map((prop) => prop.location.state);
  return [...new Set(states)];
};
