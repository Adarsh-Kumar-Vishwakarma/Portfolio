import React from 'react';

const TAKVLogo = ({ size = 40, className = "" }) => (
  <svg
    width={size}
    height={size * 0.33}
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block align-middle ${className}`}
  >
    <text
      x="0"
      y="30"
      fontFamily="monospace"
      fontWeight="bold"
      fontSize="32"
      fill="#4fd1c5"
      letterSpacing="8"
    >
      TAKV
    </text>
  </svg>
);

export default TAKVLogo; 