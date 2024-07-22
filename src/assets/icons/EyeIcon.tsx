import React from "react";

const EyeIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.158 5.28374C16.386 5.60348 16.5 5.76335 16.5 6C16.5 6.23665 16.386 6.39652 16.158 6.71626C15.1334 8.15292 12.5169 11.25 9 11.25C5.48308 11.25 2.86657 8.15292 1.84203 6.71626C1.61401 6.39652 1.5 6.23665 1.5 6C1.5 5.76335 1.61401 5.60348 1.84203 5.28374C2.86657 3.84708 5.48308 0.75 9 0.75C12.5169 0.75 15.1334 3.84708 16.158 5.28374Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M11.25 6C11.25 4.75736 10.2426 3.75 9 3.75C7.75736 3.75 6.75 4.75736 6.75 6C6.75 7.24264 7.75736 8.25 9 8.25C10.2426 8.25 11.25 7.24264 11.25 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
};

export default EyeIcon;
