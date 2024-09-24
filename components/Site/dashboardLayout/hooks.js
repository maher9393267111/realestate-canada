'use client'; // Ensure this is a client component

import { useState } from 'react';

export default function useDisclosure() {
  const [isOpen, setIsOpen] = useState(true);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return [isOpen, { open, close, toggle }];
}