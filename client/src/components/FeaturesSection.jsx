import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'fa-truck',
      title: 'Free Delivery',
      subtitle: 'On orders above ₹499',
    },
    {
      icon: 'fa-seedling',
      title: 'Fresh & Organic',
      subtitle: 'Handpicked daily',
    },
    {
      icon: 'fa-sync-alt',
      title: 'Easy Returns',
      subtitle: 'No questions asked policy',
    },
    {
      icon: 'fa-clock',
      title: 'Delivery Slots',
      subtitle: 'Choose your convenient time',
    },
  ];

  return (
    
    <div className="features-container mt-16">
        
      {features.map((item, index) => (
        <div className="feature-box" key={index}>
          <i className={`fas ${item.icon} feature-icon`}></i>
          <h4>{item.title}</h4>
          <p>{item.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
