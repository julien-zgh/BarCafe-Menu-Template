"use client";

import { useState } from "react";
import Navbar from "@/Components/Navigation";
import { EventCalendar } from "../EventCalendar";

export default function InteractiveNavbarWrapper() {
  const [openCalendar, setOpenCalendar] = useState(false);
  return (
    <>
      <Navbar setOpenCalendar={setOpenCalendar} />
      <EventCalendar isOpen={openCalendar} setIsOpen={setOpenCalendar} />
    </>
  );
}
