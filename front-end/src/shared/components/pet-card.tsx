import Image from 'next/image';
import type { FC } from 'react';

import PetFaceIcon from '@/shared/assets/icons/pet-face.png';

type PetCardProps = {
  photo: string;
  name: string;
  petFaceCardBgColor: 'red' | 'yellow';
};

export const PetCard: FC<PetCardProps> = ({ photo, name, petFaceCardBgColor }) => {
  const petFaceCardBgColors = {
    red: '#F15156',
    yellow: '#F4D35E',
  };

  return (
    <div className="max-w-[280px] w-full h-[210px] rounded-3xl bg-white p-1 group hover:bg-[#0D3B66] transition-all duration-300">
      <div className="w-full h-[135px] rounded-[20px] relative overflow-hidden">
        <Image
          src={photo}
          fill={true}
          alt=""
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="w-fit p-1 rounded-[14px] overflow-hidden bg-white -translate-y-6 mx-auto group-hover:bg-[#0D3B66] transition-all duration-300">
        <div
          className="w-fit p-[14px] rounded-[10px]"
          style={{
            backgroundColor: petFaceCardBgColors[petFaceCardBgColor],
          }}>
          <Image src={PetFaceIcon.src} width={15} height={15} alt="" />
        </div>
      </div>
      <p className="font-bold text-[18px] text-[#0D3B66] text-center -translate-y-5 group-hover:text-white transition-all duration-300">
        {name}
      </p>
    </div>
  );
};
