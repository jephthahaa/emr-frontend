import React from "react";

const UserCircleIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="9"
        cy="9.43945"
        r="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.625 13.1895C7.37378 11.3578 10.6074 11.2716 12.375 13.1895M10.8713 7.56445C10.8713 8.59999 10.0307 9.43945 8.99365 9.43945C7.95664 9.43945 7.11598 8.59999 7.11598 7.56445C7.11598 6.52892 7.95664 5.68945 8.99365 5.68945C10.0307 5.68945 10.8713 6.52892 10.8713 7.56445Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UserCircleIcon;
