import Image from "next/image";
import React from "react";
import type { IconType } from "react-icons";

interface IPriceInfoCardProps {
  title: string;
  icon: JSX.Element;
  value: string;
}

const PriceInfoCard = ({ title, icon, value }: IPriceInfoCardProps) => {
  return (
    <div
      className={`flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl border-b-[3px] border-l-[3px] bg-gray-100 px-5 py-4`}
    >
      <p className="text-black-100">{title}</p>
      <div className="flex gap-2">
        {icon}
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;
