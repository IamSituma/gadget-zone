"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function CTASection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  return (
    <section className="relative h-[40vh] md:h-[80vh] overflow-hidden group">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.volume = volume
          }
        }}
      >
        <source src="/gizzu.mp4" type="video/mp4" />
      </video>
      
      {/* Video Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-lg p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayPause}
          className="text-white hover:bg-white/20"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-white hover:bg-white/20"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #fff 0%, #fff ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`
          }}
        />
      </div>
    </section>
  )
}
