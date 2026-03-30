"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration,
  });
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(v.toFixed(decimals));
    });
    return unsubscribe;
  }, [spring, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
