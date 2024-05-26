import React, { useEffect } from "react";
import "./Logo.css";

interface LogoProps {
  onAnimationEnd: () => void;
}

const Logo: React.FC<LogoProps> = ({ onAnimationEnd }) => {
  useEffect(() => {
    const logoElement = document.getElementById("logo");
    if (logoElement) {
      logoElement.classList.add("animate");
    }

    setTimeout(() => {
      onAnimationEnd();
    }, 1000);
  }, [onAnimationEnd]);

  return (
    <svg
      id="logo"
      width="300"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
    >
      <rect width="100%" height="100%" fill="#ffffff" />
      <circle cx="150" cy="150" r="100" fill="#0073e6" />
      <circle cx="150" cy="150" r="60" fill="#ffffff" />
      <path d="M150 90 L130 150 L150 130 L170 150 Z" className="fan-blade" />
      <path d="M210 150 L150 170 L170 150 L150 130 Z" className="fan-blade" />
      <path d="M150 210 L170 150 L150 170 L130 150 Z" className="fan-blade" />
      <path d="M90 150 L150 130 L130 150 L150 170 Z" className="fan-blade" />
      <text
        x="150"
        y="280"
        fontFamily="'Roboto', sans-serif"
        fontSize="24"
        fill="#333"
        textAnchor="middle"
      >
        AC Reports
      </text>
    </svg>
  );
};

export default Logo;
