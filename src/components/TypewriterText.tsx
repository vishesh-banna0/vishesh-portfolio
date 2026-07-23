'use client';

import { useState, useEffect } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

/** Types/deletes through a list of strings. Inherits its text color from the
 *  parent. Under reduced motion it shows the first string, statically. */
const TypewriterText = ({
  texts,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 1800,
}: TypewriterTextProps) => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = texts[index];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < full.length) {
            setText(full.slice(0, text.length + 1));
          } else {
            setTimeout(() => setDeleting(true), pauseDuration);
          }
        } else if (text.length > 0) {
          setText(full.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      },
      deleting ? deletingSpeed : typingSpeed,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, texts, typingSpeed, deletingSpeed, pauseDuration, reduced]);

  if (reduced) {
    return <span>{texts[0]}</span>;
  }

  return (
    <span>
      {text}
      <span className="animate-typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
};

export default TypewriterText;
