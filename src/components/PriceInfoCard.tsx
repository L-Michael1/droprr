import Image from "next/image";
import React from "react";

interface IPriceInfoCardProps {
  title: string;
  iconSrc: string;
  value: string;
}

const PriceInfoCard = ({ title, iconSrc, value }: IPriceInfoCardProps) => {
  return (
    <div
      className={`flex min-w-[200px] flex-1 flex-col gap-2 rounded-2xl border-l-[3px] bg-slate-100 px-5 py-4`}
    >
      <p className="text-black-100">{title}</p>
      <div className="flex gap-1">
        <Image src={iconSrc} alt={title} width={24} height={24} />
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;
