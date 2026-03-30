"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const dotSpring = { damping: 20, stiffness: 800, mass: 0.2 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
      );
      setIsPointer(!!interactive);
      setIsHovering(!!interactive);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", checkHover);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring — mix-blend-mode: difference makes it auto-invert on dark/light backgrounds */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.6 : 1,
          width: isPointer ? 40 : 32,
          height: isPointer ? 40 : 32,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div
          className="w-full h-full rounded-full border"
          style={{ borderColor: "white" }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-[5px] h-[5px] rounded-full bg-white" />
      </motion.div>
    </>
  );
}
