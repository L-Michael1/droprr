import RingLoader from "react-spinners/RingLoader";

const Loading = () => {
  return (
    <RingLoader
      color="#6c6c91"
      loading={true}
      size={90}
      aria-label="Loading spinner"
    />
  );
};

export default Loading;
