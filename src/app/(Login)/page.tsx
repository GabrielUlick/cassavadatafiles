"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSignIn = async () => {
    try {
      if (email === "") {
        throw new Error("Falha no Login: Digite seu Email.");
      }

      const endpoint = "sessions";
      const requestData = { email };

      const response = await api.post(endpoint, requestData, {
        validateStatus: (status) => status < 405,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer", // Adicione seu token de autorização aqui
        },
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      const uid = response.data.uid;
      console.log("UUID recebido:", uid);

      // Condição para verificar se o localStorage está disponível (no navegador)
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("uid", uid);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(error);
    }
  };

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
          <Link href="/validation" onClick={handleSignIn}>
            <Button
              variant="secondary"
              className="bg-amber-950 h-14 w-13 rounded-full"
            >
              <ChevronRight className="text-slate-50" />
            </Button>
          </Link>
        </div>
        <p className="pl-6">Login or create a new account with your email</p>
      </div>
    </div>
  );
}
