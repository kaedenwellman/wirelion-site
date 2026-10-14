"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";

type Props = {
  name: string;
  role: string;
  photo?: string;
  bio: string[];
  linkedin?: string;
};

/** "READ BIO" button on an officer card, opening a full bio panel. */
export default function BioDialog({ name, role, photo, bio, linkedin }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };
  useFocusTrap(panelRef, open, close);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button ref={buttonRef} type="button" onClick={() => setOpen(true)} className="btn btn-secondary press min-h-[44px] w-full py-2 text-xs">
        READ BIO
      </button>
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="bio-title"
              className="brutal relative max-h-[92vh] w-full max-w-[720px] overflow-y-auto bg-elevated"
            >
              <div className="flex items-start gap-4 border-b-2 border-ink p-5 sm:p-6">
                {photo && (
                  <span className="relative h-20 w-20 shrink-0 overflow-hidden border-2 border-ink sm:h-24 sm:w-24">
                    <Image src={photo} alt="" fill sizes="96px" className="object-cover" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="eyebrow">{role}</p>
                  <h2 id="bio-title" className="mt-1 text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl">
                    {name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close bio"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center border-2 border-ink bg-bg"
                >
                  <X aria-hidden="true" size={22} />
                </button>
              </div>
              <div className="grid gap-4 p-5 sm:p-6">
                {bio.map((para, i) => (
                  <p key={i} className="body-copy !text-ink">
                    {para}
                  </p>
                ))}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary press mt-2 justify-self-start">
                    LINKEDIN <ArrowUpRight aria-hidden="true" size={18} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
