import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BeatLoader color="#768FA6" loading={true} size={20} />
    </div>
  );
};

export default Loading;
