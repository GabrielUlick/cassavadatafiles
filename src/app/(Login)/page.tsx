"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSignIn() {
    if (email === "") {
      alert("Falha no Login: Digite seu Email.");
    } else {
      const endpoint = "sessions";
  
      // Construa o objeto que deseja enviar no formato JSON
      const requestData = {
        email: email,
      };
  
      console.log(requestData);
  
      api
        .post(endpoint, requestData, {
          validateStatus: (status) => {
            return status < 405;
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer",
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            alert(response.data.message);
          } else {
            // Obtenha o UUID da resposta
            const uid = response.data.uid;
  
            // Faça algo com o UUID, como armazená-lo para uso posterior
            console.log("UUID recebido:", uid);
  
            // Você pode passar o UUID para a próxima tela, por exemplo, adicionando-o à URL
            if (typeof window !== 'undefined') {
              window.location.href = "/validation?uuid=" + uid;
            }
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  

  return (
    <div className="flex items-center justify-center bg-white h-[78vh] w-auto">
      <Image
        src={"/LogoCassava.png"}
        alt={"Cassava DataFiles"}
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto w-auto max-w-[25%] max-h-[50%] border-r-2"
        style={{
          objectFit: "contain",
        }}
      />
      <div className="flex flex-col gap-2">
        <div className="flex pl-5 gap-3">
          <Input
            type="email"
            placeholder="Email"
            className="h-14 w-80 bg-slate-100 rounded-full"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="secondary"
            className="bg-amber-950 h-14 w-13 rounded-full"
            onClick={handleSignIn}
          >
            <ChevronRight className="text-slate-50" />
          </Button>
        </div>
        <p className="pl-6">Login or create a new account with your email</p>
      </div>
    </div>
  );
}
