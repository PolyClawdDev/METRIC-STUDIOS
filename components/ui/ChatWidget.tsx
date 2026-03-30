"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "bot",
    text: "Hei! 👋 Velkommen til Metrics Studios. Hvordan kan vi hjelpe deg i dag?",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Replace this with your real AI call when ready
async function getBotReply(_userMessage: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 1400));
  return "Takk for meldingen! Vi setter deg i kontakt med riktig person så snart som mulig. 🙌";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
      setUnread(0);
    }
  }, [isOpen]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;
    setMessages((prev) => [...prev, { id: nextId.current++, role: "user", text }]);
    setInput("");
    setIsTyping(true);
    try {
      const reply = await getBotReply(text);
      setMessages((prev) => [...prev, { id: nextId.current++, role: "bot", text: reply }]);
      if (!isOpen) setUnread((n) => n + 1);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-4">

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              width: "clamp(320px, 92vw, 400px)",
              transformOrigin: "bottom right",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
              borderRadius: 16,
              overflow: "hidden",
              backgroundColor: "#111111",
            }}
            className="flex flex-col"
          >
            {/* ── Header ── */}
            <div
              style={{
                background: "linear-gradient(135deg, #1C3829 0%, #0f2018 100%)",
                padding: "20px 20px 18px",
                flexShrink: 0,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: "white",
                        letterSpacing: "0.08em",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      MS
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        right: -2,
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        backgroundColor: "#4ade80",
                        border: "2px solid #0f2018",
                      }}
                    />
                  </div>
                  <div>
                    <p style={{ color: "white", fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.2 }}>
                      Metrics Studios
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", marginTop: 2 }}>
                      ● Online — svarer raskt
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Lukk"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1l8 8M9 1L1 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 260,
                maxHeight: 340,
                scrollbarWidth: "none",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                      alignItems: "flex-end",
                      gap: 8,
                    }}
                  >
                    {msg.role === "bot" && (
                      <div style={{
                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                        background: "linear-gradient(135deg, #1C3829, #2d5a3e)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.5rem", fontWeight: 700, color: "white", letterSpacing: "0.06em",
                      }}>MS</div>
                    )}
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "10px 14px",
                        fontSize: "0.85rem",
                        lineHeight: 1.55,
                        ...(msg.role === "user"
                          ? {
                              background: "linear-gradient(135deg, #1C3829, #243f30)",
                              color: "rgba(255,255,255,0.95)",
                              borderRadius: "14px 14px 4px 14px",
                              border: "1px solid rgba(28,56,41,0.6)",
                            }
                          : {
                              background: "#1e1e1e",
                              color: "rgba(255,255,255,0.85)",
                              borderRadius: "14px 14px 14px 4px",
                              border: "1px solid rgba(255,255,255,0.07)",
                            }),
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: "flex", alignItems: "flex-end", gap: 8 }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: "linear-gradient(135deg, #1C3829, #2d5a3e)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.5rem", fontWeight: 700, color: "white",
                    }}>MS</div>
                    <div style={{
                      padding: "12px 16px",
                      background: "#1e1e1e",
                      borderRadius: "14px 14px 14px 4px",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", gap: 5, alignItems: "center",
                    }}>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          style={{
                            width: 6, height: 6, borderRadius: "50%",
                            backgroundColor: "rgba(255,255,255,0.35)",
                            display: "block",
                          }}
                          animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* ── Input ── */}
            <div style={{
              padding: "12px 14px 14px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              backgroundColor: "#111111",
              flexShrink: 0,
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "10px 14px",
                transition: "border-color 0.2s",
              }}
                onFocusCapture={e => (e.currentTarget.style.borderColor = "rgba(28,56,41,0.8)")}
                onBlurCapture={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Skriv en melding…"
                  disabled={isTyping}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.4,
                  }}
                  className="placeholder:text-white/25"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: input.trim() && !isTyping
                      ? "linear-gradient(135deg, #1C3829, #2d5a3e)"
                      : "rgba(255,255,255,0.06)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: input.trim() && !isTyping ? "none" : "default",
                    flexShrink: 0,
                    transition: "background 0.25s",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5"
                      stroke={input.trim() && !isTyping ? "white" : "rgba(255,255,255,0.3)"}
                      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p style={{
                textAlign: "center", marginTop: 10,
                fontSize: "0.6rem", letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.18)", textTransform: "uppercase", fontWeight: 500,
              }}>
                Metrics Studios · AI Chat
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Lukk chat" : "Åpne chat"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: isOpen
            ? "#1a1a1a"
            : "linear-gradient(135deg, #1C3829 0%, #2d5a3e 100%)",
          border: isOpen ? "1px solid rgba(255,255,255,0.12)" : "none",
          boxShadow: isOpen
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(28,56,41,0.5), 0 2px 8px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="x" width="16" height="16" viewBox="0 0 16 16" fill="none"
              initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}>
              <path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" width="24" height="24" viewBox="0 0 24 24" fill="none"
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}>
              <path
                d="M12 3C7.03 3 3 6.8 3 11.5c0 2.1.82 4.02 2.17 5.5L4 21l4.47-1.38A9.3 9.3 0 0012 20c4.97 0 9-3.8 9-8.5S16.97 3 12 3z"
                fill="white" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {unread > 0 && !isOpen && (
            <motion.span key="badge"
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              style={{
                position: "absolute", top: -2, right: -2,
                width: 20, height: 20, borderRadius: "50%",
                backgroundColor: "#ef4444",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.6rem", fontWeight: 700, color: "white",
                border: "2px solid #111",
              }}
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
