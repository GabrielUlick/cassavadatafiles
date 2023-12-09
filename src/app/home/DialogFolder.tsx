"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Cookies from "js-cookie";
import { Folder } from "lucide-react";
import { useState } from "react";

export function DialogFolder() {
    const uid = Cookies.get("uid") || null;
    const [namePasta, setNamePasta] = useState("");
    const storedToken = Cookies.get("userToken");
  
    const handleCreateButtonClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
      const jsonData = {
        user_id: uid,
        path: "/",
        filename: namePasta,
        is_file: false,
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
        location.reload();
        if (response.status === 200) {
          console.log("Arquivo enviado com sucesso!");
        } else {
          console.error("Erro ao enviar o arquivo:", response.data);
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      }
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-8 h-5">Nova Pasta
              <Folder size={20} /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Nova Pasta
            </DialogTitle>
            <DialogDescription>
              Crie um nome para sua pasta
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome 
              </Label>
              <Input
                id="name"
                placeholder="Digite o nome da pasta"
                className="col-span-3"
                onChange={(e) => setNamePasta(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateButtonClick} className="bg-orange-950 text-orange-500">
              Criar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  