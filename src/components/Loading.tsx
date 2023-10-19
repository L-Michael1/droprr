import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
  return (
    <RingLoader
      color="#22c55e"
      loading={true}
      size={90}
      aria-label="Loading spinner"
    />
  );
};

export default Loading;
