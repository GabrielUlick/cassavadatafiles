"use client";

import { DataTableFiles } from "@/app/home/DataTableFiles";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { File, Folder, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DataTableFilesComp } from "@/app/home/DataTableFilesComp";
import { DialogFolder } from "./DialogFolder";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("meusArquivos");
  const uid = Cookies.get("uid") || null;
  const storedToken = Cookies.get("userToken");
  
  useEffect(() => {
    if (typeof window !== "undefined") {
  
      if (!storedToken) {
        window.location.href = "/"; 
      } else {
        
      }
    }
  }, []);

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
          file_modified_in: new Date().toString,
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
            location.reload();
          } else {
            console.error("Erro ao enviar o arquivo:", response.data);
            location.reload();
          }
        } catch (error) {
          console.error("Erro de rede:", error);
          location.reload();
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
                <DialogFolder />
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
          {activeSection === "meusArquivos" ? (
            <DataTableFiles />
          ) : (
            <DataTableFilesComp />
          )}
        </div>
      </div>
    </div>
  );
}
