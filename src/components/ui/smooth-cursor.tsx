"use client"

import React, { useEffect, useRef, useState, type FC } from "react"

export interface SmoothCursorProps {
  cursor?: React.ReactNode
}

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)"

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={28}
      viewBox="0 0 50 54"
      fill="none"
      className="select-none pointer-events-none"
    >
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="#141b16"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="#ffffff"
        strokeWidth={2.5}
      />
    </svg>
  )
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
}: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)
    const updateEnabled = () => {
      setIsEnabled(mediaQuery.matches)
    }

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    const cursorEl = cursorRef.current
    if (!cursorEl) return

    let mouseX = -100
    let mouseY = -100
    let currentX = -100
    let currentY = -100
    let currentAngle = 0
    let currentScale = 1
    let isVisible = false
    let rafId: number
    let lastTime = performance.now()
    let prevMouseX = -100
    let prevMouseY = -100

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return

      mouseX = e.clientX
      mouseY = e.clientY

      // Check if hovering over element that requests hidden cursor
      const target = e.target as HTMLElement | null
      const isHidden =
        Boolean(target?.closest?.("[data-hide-cursor]")) ||
        document.body.dataset.cursorHidden === "true"

      if (isHidden) {
        isVisible = false
      } else {
        if (!isVisible) {
          isVisible = true
          // Instant snap to position on first move to prevent cursor flying in from screen edge
          if (currentX === -100) {
            currentX = mouseX
            currentY = mouseY
          }
        }
      }
    }

    const onMouseLeave = () => {
      isVisible = false
    }

    const onMouseEnter = () => {
      isVisible = true
    }

    // High-performance 60/120 FPS Lerp Loop
    const renderLoop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      if (isVisible) {
        // Smooth lerp easing factor (fast & responsive)
        const lerpFactor = 1 - Math.exp(-24 * dt)

        currentX += (mouseX - currentX) * lerpFactor
        currentY += (mouseY - currentY) * lerpFactor

        // Calculate velocity for dynamic angle tilt & subtle scale
        const vx = mouseX - prevMouseX
        const vy = mouseY - prevMouseY
        prevMouseX = mouseX
        prevMouseY = mouseY

        const speed = Math.sqrt(vx * vx + vy * vy)

        if (speed > 1.5) {
          const targetAngle = Math.atan2(vy, vx) * (180 / Math.PI) + 90
          let diff = targetAngle - currentAngle
          while (diff > 180) diff -= 360
          while (diff < -180) diff += 360
          currentAngle += diff * Math.min(12 * dt, 1)
          currentScale = Math.max(0.92, 1 - speed * 0.002)
        } else {
          currentScale += (1 - currentScale) * Math.min(10 * dt, 1)
        }

        cursorEl.style.opacity = "1"
        cursorEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentAngle}deg) scale(${currentScale})`
      } else {
        cursorEl.style.opacity = "0"
      }

      rafId = requestAnimationFrame(renderLoop)
    }

    document.body.style.cursor = "none"
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    rafId = requestAnimationFrame(renderLoop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.body.style.cursor = "auto"
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none select-none opacity-0 will-change-transform"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        transition: "opacity 0.15s ease-out",
      }}
    >
      {cursor}
    </div>
  )
}
