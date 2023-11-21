"use client";

import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex h-[78vh] w-auto">
      <div className="flex flex-col mt-20 ml-8 border-r w-60 justify-between">
        <div className="flex flex-col gap-5">
          <p>Meus Arquivos</p>
          <p>Arquivos Compartilhados</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full p-3">
        <Link href="/plans" >
        <p>Plano:Free</p>
        </Link>
      </div>
    </div>
  );
}
