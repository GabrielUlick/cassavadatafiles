"use client";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { ArrowLeft, File } from "lucide-react";
import React from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";

const formatFileSize = (bytes: number): string => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) return "0 Byte";
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
  return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + " " + sizes[i];
};

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "";
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy");
};

const VizualizarArquivos = () => {
  const id = Cookies.get("id");
  const filename = Cookies.get("filename");
  const valoresSeparados: string[] | undefined = filename?.split(".");
  const sizeString = Cookies.get("size");
  const created_at = Cookies.get("created_at");
  const updated_at = Cookies.get("updated_at");

  const size = sizeString ? parseFloat(sizeString) : 0;

  const formattedSize = formatFileSize(size);
  const formattedCreatedAt = formatDate(created_at);
  const formattedUpdatedAt = formatDate(updated_at);

  return (
    <div className="mx-16 h-[77vh]">
      <div className="flex p-10 ml-12 text-3xl items-center gap-10">
        <div>
          <Link href="/home">
            <ArrowLeft />
          </Link>
        </div>
        {filename}
      </div>
      <div className="flex w-full justify-center">
        <div className="flex bg-gray-300 h-96 w-[90%] items-center justify-center text-amber-950">
          <File size={150} className="absolute"/>
          <div className="text-xl font-extrabold mt-4">
          {valoresSeparados ? "."+valoresSeparados[1] : "."}
          </div>
        </div>
      </div>
      <div className="flex p-10 justify-evenly">
        <div>
          <p className="text-amber-900">Tamanho:</p>
          <span className="text-amber-950">{formattedSize}</span>
        </div>
        <div>
          <p className="text-amber-900">Criado:</p>
          <span className="text-amber-950">{formattedCreatedAt}</span>
        </div>
        <div>
          <p className="text-amber-900">Modificado:</p>
          <span className="text-amber-950">{formattedUpdatedAt}</span>
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <Button className="bg-orange-950 text-orange-500">Compartilhar</Button>
        <Button className="bg-orange-950 text-orange-500">
          Enviar para pasta
        </Button>
      </div>
    </div>
  );
};

export default VizualizarArquivos;
