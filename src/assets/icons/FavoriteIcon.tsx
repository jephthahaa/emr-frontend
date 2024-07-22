import React from "react";

const FavoriteIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="18"
      height="15"
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="elements">
        <path
          id="Vector"
          d="M14.5969 1.49561C12.5857 0.261922 10.8303 0.759085 9.77576 1.55101C9.34339 1.87572 9.1272 2.03807 9 2.03807C8.8728 2.03807 8.65661 1.87572 8.22424 1.55101C7.16971 0.759085 5.41431 0.261922 3.40308 1.49561C0.763551 3.1147 0.166291 8.45614 6.25465 12.9625C7.41429 13.8208 7.99411 14.25 9 14.25C10.0059 14.25 10.5857 13.8208 11.7454 12.9625C17.8337 8.45614 17.2364 3.1147 14.5969 1.49561Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default FavoriteIcon;
