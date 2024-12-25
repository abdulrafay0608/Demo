import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-full w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="150"
        height="150"
      >
        <rect
          fill="#444952"
          stroke="#444952"
          strokeWidth="14"
          width="30"
          height="60"
          x="25"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </rect>
        <rect
          fill="#444952"
          stroke="#444952"
          strokeWidth="14"
          width="30"
          height="60"
          x="85"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </rect>
        <rect
          fill="#444952"
          stroke="#444952"
          strokeWidth="14"
          width="30"
          height="60"
          x="145"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </rect>
      </svg>
    </div>
  );
};

export default Loader;
