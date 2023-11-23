"use client";

import { DataTableFiles } from "@/components/ui/DataTableFiles";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { File, Folder, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("meusArquivos");
  const uid = localStorage.getItem("uid") || null;

  const storedToken = localStorage.getItem("userToken");

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const jsonData = {
          user_id: uid,
          path: "/",
          filename: file.name,
          is_file: true,
          size: file.size,
          file_modified_in: "2023-09-20T19:29:26Z",
        };

        try {
          const response = await axios.post(
            "https://api-cassava-gps.lasfh.com/?op=new",
            jsonData,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            console.log("Arquivo enviado com sucesso!");
          } else {
            console.error("Erro ao enviar o arquivo:", response.data);
          }
        } catch (error) {
          console.error("Erro de rede:", error);
        }
      };

      // Lê o conteúdo do arquivo como uma string em Base64
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-[100vh] w-auto">
      <div className="flex flex-col mt-20 ml-8 border-r w-60 items-center justify-between">
        <div className="flex flex-col gap-5 pr-5">
          <Button
            variant="ghost"
            onClick={() => setActiveSection("meusArquivos")}
            className={
              activeSection === "meusArquivos"
                ? "flex border bg-orange-950 text-orange-500 h-10 w-auto justify-center items-center"
                : ""
            }
          >
            Meus Arquivos
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveSection("arquivosCompartilhados")}
            className={
              activeSection === "arquivosCompartilhados"
                ? "flex border bg-orange-950 text-orange-500 h-10 w-auto justify-center items-center"
                : ""
            }
          >
            Arquivos Compartilhados
          </Button>
        </div>
        <div className="p-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-orange-950">
                Novo Arquivo
                <PlusCircle size={35} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col w-56 items-left bg-orange-950 text-orange-500">
              <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                <DropdownMenuLabel className="flex gap-5">
                  Upload Arquivo
                  <File size={20} />
                </DropdownMenuLabel>
              </label>
              <input
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex gap-5">
                Nova Pasta
                <Folder size={20} />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col items-center w-full p-3">
        <Link href="/plans">
          <p>Plano: Free</p>
        </Link>
        <div className="flex h-auto w-full mt-10">
          <DataTableFiles />
        </div>
      </div>
    </div>
  );
}
