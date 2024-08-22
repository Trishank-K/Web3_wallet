import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/global/theme-button";

const Navigation = () => {
  return (
    <div className="p-8  flex items-center justify-between relative  border-b-4 rounded-b-2xl">
      <aside className="flex items-center gap-2">
        <span className="text-3xl font-bold">Wallet</span>
      </aside>
      <aside className="flex gap-2 items-center">
        <ModeToggle />
      </aside>
    </div>
  );
};
export default Navigation;
