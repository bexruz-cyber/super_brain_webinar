"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, memo } from "react"
import { X } from "lucide-react"
import { IMaskInput } from "react-imask"
import axios from "axios"
import { useRouter } from "next/navigation"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

// Use memo to prevent unnecessary re-renders
export const RegistrationModal = memo(function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  // Create a form data ref to avoid recreating the FormData object on each render
  const formDataRef = useRef(new FormData())

  // Optimize event listeners with useEffect cleanup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Memoize event handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handlePhoneChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError("")

      try {
        // Reuse the FormData object from ref instead of creating a new one
        formDataRef.current = new FormData()
        formDataRef.current.append("Ism va Familya", formData.firstName)
        formDataRef.current.append("Telefon raqam", formData.phoneNumber)
        router.push("/thank-you")
        
        await axios.post(
          "https://script.google.com/macros/s/AKfycbzkIMy04cgBl2eIJz5flPbeXz8Tbk2iXg-SRvIfFAmoVm7_iMG-xYfu8PxKjPn3CZpG/exec",
          formDataRef.current,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )

        onClose()
      } catch (err) {
        console.error("Form submission error:", err)
        setError("Ro'yxatdan o'tishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, router, onClose],
  )

  // Prevent unnecessary renders when modal is closed
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-[420px] bg-white pt-7 rounded-[30px] shadow-lg mx-auto animate-fadeIn"
        style={{ maxHeight: "calc(100vh - 2rem)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full transition-colors duration-200"
          aria-label="Close"
          disabled={isSubmitting}
          type="button"
        >
          <X size={20} />
        </button>

        <div className="p-6 overflow-y-auto">
          <div className="mb-5 text-center">
            <h2 className="font-bold text-sm sm:text-lg p-2 sm:p-2.5 border border-[#EA642B] max-w-[90%] sm:max-w-[396px] mx-auto text-center rounded-[10px] mb-3">
              15-16-17-Aprel | Soat 20:00 da
            </h2>
            <h3 className="font-bold text-lg sm:text-xl leading-tight mb-2">
              Masterklassda ishtirok etish uchun ro&apos;yxatdan o&apos;ting
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium text-sm">
                Ism va Familyagiz
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#EA642B] transition-all duration-200"
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block mb-1 font-medium text-sm">
                Telefon raqamingiz
              </label>
              <IMaskInput
                id="phoneNumber"
                name="phoneNumber"
                mask="+{998} 00 000 00 00"
                value={formData.phoneNumber}
                onAccept={handlePhoneChange}
                required
                disabled={isSubmitting}
                placeholder="+998 __ ___ __ __"
                className="w-full p-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#EA642B] transition-all duration-200"
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#EA2B2B] shadow-custom-red p-3 sm:p-4 rounded-[50px] text-white font-semibold text-base sm:text-lg leading-7 cursor-pointer hover:bg-[#d42626] mt-6 transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "YUBORILMOQDA..." : "RO&apos;YXATDAN O&apos;TISH"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
})

// Default export for dynamic import
export default { RegistrationModal }

