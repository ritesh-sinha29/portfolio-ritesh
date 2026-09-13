"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type HTMLMotionProps,
} from "motion/react"

import { cn } from "@/lib/utils"

const DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

const sweepEase = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF
  const bandEnd = pos + BAND_HALF

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`
  }

  if (bandEnd <= 0) {
    return `linear-gradient(90deg, ${colors[0]}, ${colors[0]})`
  }

  const stops: string[] = []
  const step = 100 / (colors.length - 1)

  for (let i = 0; i < colors.length; i++) {
    const p = (i * step * (bandEnd - bandStart)) / 100 + bandStart
    stops.push(`${colors[i]} ${Math.round(p)}%`)
  }

  return `linear-gradient(90deg, ${stops.join(", ")})`
}

function measureWidths(container: HTMLElement, texts: string[]): number[] {
  const tester = document.createElement("span")
  tester.style.position = "absolute"
  tester.style.visibility = "hidden"
  tester.style.whiteSpace = "nowrap"
  tester.style.font = window.getComputedStyle(container).font
  document.body.appendChild(tester)

  const widths = texts.map((t) => {
    tester.textContent = t
    return tester.getBoundingClientRect().width
  })

  document.body.removeChild(tester)
  return widths
}

export interface DiaTextRevealProps
  extends Omit<HTMLMotionProps<"span">, "children"> {
  text: string | string[]
  colors?: string[]
  textColor?: string
  duration?: number
  /**
   * Delay before the sweep starts, in seconds.
   * @defaultValue `0`
   */
  delay?: number
  /**
   * When `text` is an array, replay the sweep and advance to the next string after each completion.
   * @defaultValue `false`
   */
  repeat?: boolean
  /**
   * Pause between cycles when {@link DiaTextRevealProps.repeat} is `true`, in seconds.
   * @defaultValue `0.5`
   */
  repeatDelay?: number
  /**
   * If `true`, the animation starts only after the element enters the viewport.
   * @defaultValue `true`
   */
  startOnView?: boolean
  /**
   * Passed to `useInView`: if `true`, in-view detection fires at most once (no replay on scroll-back).
   * @defaultValue `true`
   */
  once?: boolean
  /**
   * Additional class names for the animated `span` (e.g. typography utilities).
   */
  className?: string
  /**
   * When `text` has multiple entries, use the widest string’s width for layout instead of animating width per line.
   * @defaultValue `false`
   */
  fixedWidth?: boolean
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--foreground)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text]
  const isMulti = texts.length > 1
  const prefersReducedMotion = useReducedMotion()

  const spanRef = useRef<HTMLSpanElement>(null)
  const optsRef = useRef({
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  })

  useEffect(() => {
    optsRef.current = {
      colors,
      textColor,
      duration,
      delay,
      repeat,
      repeatDelay,
      texts,
    }
  }, [colors, textColor, duration, delay, repeat, repeatDelay, texts])

  const indexRef = useRef(0)
  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const stopRef = useRef<(() => void) | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([])

  const sweepPos = useMotionValue(SWEEP_START)

  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildGradient(pos, optsRef.current.colors, optsRef.current.textColor)
  )

  const isInView = useInView(spanRef, { once, amount: 0.1 })

  const textKey = Array.isArray(text) ? text.join("\0") : text
  useEffect(() => {
    const el = spanRef.current
    if (!el || !isMulti) return
    setMeasuredWidths(measureWidths(el, texts))
  }, [textKey, isMulti, texts])

  const play = useCallback(() => {
    const { duration: dur, delay: del, repeat: rep, repeatDelay: repDel, texts: txts } = optsRef.current

    sweepPos.set(SWEEP_START)

    const controls = animate(sweepPos, SWEEP_END, {
      duration: dur,
      delay: del,
      ease: sweepEase,
      onComplete() {
        if (!rep) return
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % txts.length
          indexRef.current = next
          setActiveIndex(next)
          play()
        }, repDel * 1000)
      },
    })

    stopRef.current = () => controls.stop()
  }, [sweepPos])

  useEffect(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END)
      return
    }
    if (startOnView && !isInView) return
    if (once && hasPlayedRef.current) return
    hasPlayedRef.current = true
    play()

    return () => {
      stopRef.current?.()
      clearTimeout(timerRef.current)
    }
  }, [isInView, startOnView, once, prefersReducedMotion, sweepPos, play])

  const fixedW =
    isMulti && fixedWidth && measuredWidths.length > 0
      ? Math.max(...measuredWidths)
      : undefined

  const animatedW =
    isMulti && !fixedWidth && measuredWidths[activeIndex] != null
      ? measuredWidths[activeIndex]
      : undefined

  return (
    <motion.span
      ref={spanRef}
      className={cn("align-bottom leading-[100%] text-inherit", className)}
      style={{
        transform: "translateY(-2px)",
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "100% 100%",
        backgroundImage,
        ...(isMulti && {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "text-center",
          ...(fixedW != null && { width: fixedW }),
        }),
      }}
      animate={animatedW != null ? { width: animatedW } : undefined}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {texts[activeIndex]}
    </motion.span>
  )
}
