"use client"
import { useState, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the modal to reduce initial bundle size
const DynamicRegistrationModal = dynamic(
  () => import('@/components/registration-modal').then(mod => ({ default: mod.RegistrationModal })),
  { ssr: false, loading: () => <div className="hidden">Loading...</div> }
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Memoize event handlers to prevent unnecessary re-renders
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  // Extract repeatable components to improve readability and reduce duplication
  const MasterclassList = ({ className = "" }) => (
    <div className={`bg-[#FFD4BB] py-6 rounded-[30px] ${className}`}>
      <h4 className='font-bold text-lg leading-5 mb-7 text-center'>Masterklassda siz:</h4>
      <ul className="flex flex-col gap-[22px]">
        <li className="font-normal text-sm leading-[22px] flex gap-3 items-start">
          <Image 
            src="/images/listDecoration.png" 
            alt="list decoration" 
            width={35} 
            height={28}
            loading="lazy"
          />
          Qanday qilib diqqatni jamlash orqali chalg&apos;imasdan soatlab
          ishlash va o&apos;qishni
        </li>
        <li className="font-normal text-sm leading-[22px] flex gap-3 items-start">
          <Image 
            src="/images/listDecoration.png" 
            alt="list decoration" 
            width={35} 
            height={28}
            loading="lazy"
          />
          Qanday qilib miyaning bor kuchidan foydalanib, dangasalikni
          yengishni va istalgan maqsadga erishishni
        </li>
        <li className="font-normal text-sm leading-[22px] flex gap-3 items-start">
          <Image 
            src="/images/listDecoration.png" 
            alt="list decoration" 
            width={35} 
            height={28}
            loading="lazy"
          />
          Qanday qilib chet tili so&apos;zlarini, kitobdagi ma&apos;lumotlarni tez hamda
          oson eslab qolishni va xotirangizni 10 barobar kuchaytirishni ko&apos;rib
          chiqamiz.
        </li>
      </ul>
    </div>
  );

  const ActionButton = ({ className = "" }) => (
    <button
      className={`bg-[#EA2B2B] shadow-custom-red p-5 rounded-[50px] text-white font-semibold text-lg leading-7 cursor-pointer hover:bg-[#d42626] transition-colors duration-200 ${className}`}
      onClick={handleOpenModal}
      aria-label="Ishtirok etish"
    >
      ISHTIROK ETISH
    </button>
  );

  return (
    <div>
      <div className='flex items-center justify-center min-h-screen overflow-x-hidden max-md:py-7'>
        <div className="relative flex-col items-center max-w-[1198px] px-5 mx-auto w-full">
          {/* Left section */}
          <div className="max-w-[693px] relative z-10 max-md:flex flex-col items-center max-md:mb-10">
            <h2 className='font-bold text-lg p-2.5 border border-[#EA642B] max-md:text-sm max-md:p-2 max-md:px-[38px] max-w-[396px] text-center rounded-[10px] mb-3.5'>
              15-16-17-Aprel | Soat 20:00 da
            </h2>
            <h1 className='font-normal text-base mb-4 leading-6 max-md:text-sm max-md:mb-[7px] max-md:text-center'>
              Davronbek Turdievdan 3 kunlik BEPUL masterklass
            </h1>
            <h2 className="md:hidden font-bold text-[26px] uppercase">
              MIYA SIRLARI
            </h2>
            <h3 className='font-bold text-2xl leading-[33px] mb-[30px] max-md:mb-0 max-md:text-base max-md:leading-[22px] max-md:max-w-[326px] max-md:text-center'>
              Bu yangi usul orqali o&apos;quvchim 1 kunda 1,280 ta chet tili
              so&apos;zlarini eslab qoldi. Yangi usulni siz ham o&apos;rganing.
            </h3>

            {/* Desktop masterclass list */}
            <MasterclassList className="px-[26px] max-md:hidden max-w-[582px] mb-6" />
            
            <p className="font-bold text-4xl leading-[56px] mb-3 max-md:hidden">BEPUL</p>
            <ActionButton className="max-w-[346px] max-md:hidden w-full" />
          </div>

          {/* Right section - Image */}
          <div className="absolute max-md:static -bottom-[53px] -right-[67px]">
            <Image 
              src="/images/davronbekTurdiyev.webp" 
              className='max-w-[682px] max-md:max-w-[301px] mx-auto' 
              alt='Davronbek Turdiyev' 
              width={682} 
              height={647}
              priority // Mark as priority since it's a hero image
              quality={90}
            />
          </div>

          {/* Mobile-only elements */}
          <ActionButton 
            className="mx-auto flex justify-center mb-2.5 max-w-[346px] md:hidden w-full p-[18px]"
          />
          <p className="text-center font-bold text-4xl leading-[56px] mb-3 md:hidden">BEPUL</p>
          <MasterclassList className="px-[13px] mx-auto md:hidden max-w-[582px] mb-6" />
        </div>
      </div>
      
      {/* Only load the modal when needed */}
      {isModalOpen && <DynamicRegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
}
