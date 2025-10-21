import React from "react";
import "./featureItem.css";

function FeatureItem({ icon, title, text }) {
  return (
    <div className="feature-item">
          <img src={icon} alt={title} className="feature-icon" loading="lazy" decoding="async"/>
          <h3 className="feature-item-title">{title}</h3>
          <p>
            {text}
          </p>
     </div>
  );
}

export default FeatureItem;