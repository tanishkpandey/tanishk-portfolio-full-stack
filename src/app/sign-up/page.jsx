import Image from "next/image";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Image
        src="/NotGonnaHappen.gif"
        alt="Not Gonna Happen Gif"
        className="rounded-lg shadow-md hover:shadow-lg"
        layout="intrinsic"
        width={500}
        height={300}
      />
    </div>
  );
};

export default SignUp;
