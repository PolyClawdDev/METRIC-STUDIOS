"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface BaseMagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  style?: React.CSSProperties;
}

interface AnchorProps extends BaseMagneticProps {
  as: "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

interface ButtonProps extends BaseMagneticProps {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

type MagneticButtonProps = AnchorProps | ButtonProps;

export default function MagneticButton(props: MagneticButtonProps) {
  const { children, className = "", strength = 0.4, style } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const inner =
    props.as === "a" ? (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={className}
        style={style}
        onClick={props.onClick}
      >
        {children}
      </a>
    ) : (
      <button
        type={(props as ButtonProps).type ?? "button"}
        className={className}
        style={style}
        onClick={(props as ButtonProps).onClick}
      >
        {children}
      </button>
    );

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      >
        {inner}
      </motion.div>
    </div>
  );
}
