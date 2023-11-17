"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Username() {
  const [username, setUsername] = useState("");
  const [userToken, setUserToken] = useState(""); // Adicione um estado local para o token

  // Verifica se o token está disponível e, se sim, inclui-o nos headers da requisição
  const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};

  function handleAlterName() {
    if (username === "") {
      alert("Falha no Login: Digite seu username.");
    } else {
      const endpoint = "/users/name";
      
      const requestData = {
        username: username,
      };
  
      api
        .post(endpoint, requestData, {
          validateStatus: (status) => status < 405,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            alert(response.data.message);
          } else {
            // Extraia o token da resposta
            const token = response.data.token;
            
            // Atualize o estado local com o token
            setUserToken(token);
  
            // Redirecione para a página desejada usando Link do Next.js
            // Nota: Use o useRouter para redirecionar programaticamente no Next.js
            // Certifique-se de importar useRouter no início do arquivo
            // import { useRouter } from 'next/router';
            // const router = useRouter();
            // router.push("/home");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white h-[78vh] w-auto">
      <div className="flex flex-col gap-2">
        <p className="pl-8">Username:</p>
        <div className="flex pl-5 gap-3">
          <Input
            type="text"
            placeholder="Set your Username"
            className="h-14 w-80 bg-slate-100 rounded-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="secondary"
            className="bg-amber-950 h-14 w-13 rounded-full"
            onClick={handleAlterName}
          >
            <ChevronRight className="text-slate-50" />
          </Button>
        </div>
        <p className="pl-8">Create a username (not required)</p>
      </div>
    </div>
  );
}
