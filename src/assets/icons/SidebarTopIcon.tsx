import React from "react";

const SidebarTopIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 9.43945C1.5 6.6726 1.5 5.28918 2.11036 4.30853C2.33618 3.94572 2.61668 3.63015 2.93918 3.37611C3.81087 2.68945 5.04058 2.68945 7.5 2.68945H10.5C12.9594 2.68945 14.1891 2.68945 15.0608 3.37611C15.3833 3.63015 15.6638 3.94572 15.8896 4.30853C16.5 5.28918 16.5 6.6726 16.5 9.43945C16.5 12.2063 16.5 13.5897 15.8896 14.5704C15.6638 14.9332 15.3833 15.2488 15.0608 15.5028C14.1891 16.1895 12.9594 16.1895 10.5 16.1895H7.5C5.04058 16.1895 3.81087 16.1895 2.93918 15.5028C2.61668 15.2488 2.33618 14.9332 2.11036 14.5704C1.5 13.5897 1.5 12.2063 1.5 9.43945Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M1.5 7.56445L16.5 7.56445"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 4.93945H5.25M7.5 4.93945H8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SidebarTopIcon;
