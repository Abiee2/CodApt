import React from "react";
import "./LanguageFlipCard.css";
import codaptLogo from "/CODAPT_LOGO.png";

function LanguageFlipCard({ name, hp, image, type, ability1, ability2, description, onClick }) {
  // Gradients based on language
  const gradients = {
    Java: "linear-gradient(180deg, #FF6700, #FF4500)",
    Python: "linear-gradient(180deg, #4B8BBE, #306998)",
    JavaScript: "linear-gradient(180deg, #F7DF1E, #E5C100)",
  };
  const borderColors = {
    Java: "#FF4500",
    Python: "#306998",
    JavaScript: "#E5C100",
  };

  const bgGradient = gradients[name] || "#ccc";
  const borderColor = borderColors[name] || "#000";

  return (
    <div className="flipCard" onClick={onClick}>
      <div className="flipInner hoverFlip">

        {/* BACK */}
        <div className="cardBack">
          <img src={codaptLogo} alt="CodApt Logo" className="cardBackLogo" />
        </div>

        {/* FRONT */}
        <div
          className="cardFront"
          style={{ background: bgGradient, borderColor: borderColor }}
        >
          <div className="cardHeader">
            <span className="cardName">{name}</span>
            <span className="cardHP">HP {hp}</span>
          </div>

          <div className="cardImageWrapper">
            <img src={image} alt={name} className="cardImage" />
          </div>

          <div className="cardType">{type} Language</div>

          <div className="attacks">
            <div className="attack">
              <div className="attackName">{ability1.name}</div>
              <div className="attackDamage">{ability1.damage}</div>
              <p>{ability1.desc}</p>
            </div>
            <div className="attack">
              <div className="attackName">{ability2.name}</div>
              <div className="attackDamage">{ability2.damage}</div>
              <p>{ability2.desc}</p>
            </div>
          </div>

          <div className="description">{description}</div>
        </div>
      </div>
    </div>
  );
}

export default LanguageFlipCard;