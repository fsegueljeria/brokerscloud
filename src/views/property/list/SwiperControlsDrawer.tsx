'use client'

import { useState } from 'react'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

type Props = {
  images: string[]
}

const SwiperControls = ({ images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <div className="relative w-full">
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
        {images.map((src, index) => (
          <div key={index} className="keen-slider__slide">
            <img src={src} className="w-full h-auto object-cover" alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Flechas */}
      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-1 rounded-full"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-1 rounded-full"
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
        </>
      )}
    </div>
  )
}

export default SwiperControls
