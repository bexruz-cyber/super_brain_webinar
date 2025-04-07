import { Send } from 'lucide-react'
import Image from "next/image"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f0f5fa] relative">
      {/* Background pill shapes - load with lower priority */}
      <div className="fixed top-50% left-50% max-md:hidden">
        <Image 
          src="/images/vector.webp" 
          width={1680} 
          height={444} 
          alt="background shape" 
          loading="lazy"
          quality={80}
        />
      </div>

      <div className="w-full max-w-[800px] bg-white rounded-[30px] shadow-lg p-10 max-md:px-4 max-md:py-10 mx-4 z-10">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Oxirgi qadam qoldi!</h1>

          <p className="text-gray-700 text-base md:text-xl mb-10 max-w-[525px] mx-auto">
            Jonli efirda qatnashish uchun quyidagi tugmani <br /> bosib yopiq kanalga obuna bo&apos;ling!
          </p>

          <div className="flex justify-center mb-6">
            {/* Arrows pointing to button */}
            <div className="flex space-x-4 md:space-x-8">
              <Image 
                src="/images/arrows.webp" 
                width={253} 
                height={102} 
                alt="arrows pointing down" 
                priority
              />
            </div>
          </div>

          <a
            href="https://t.me/+P3tzDhdIhZg1Yzli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center max-md:text-base shadow-custom-blue justify-center bg-[#29B6F6] text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-[#1976d2] transition-colors duration-300"
          >
            OBUNA BO&apos;LISH
            <Send className="ml-2 h-8 w-8" />
          </a>
        </div>
      </div>
    </div>
  )
}
