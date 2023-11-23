"use client";

import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Validation() {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(300);
  const [userToken, setUserToken] = useState("");
  const uid = Cookies.get("uid") || null;

  async function handleValidation() {
    try {
      if (code === "") {
        throw new Error("Falha na validação: Digite seu código.");
      }

      const endpoint = "sessions/validations";
      const requestData = { code, uid };

      const response = await api.post(endpoint, requestData, {
        validateStatus: (status) => status < 405,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer SEU_TOKEN_AQUI", // Adicione seu token de autorização aqui
        },
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      const token = response.data.token;
      setUserToken(token);

      // Configurar um cookie chamado "userToken" com o valor do token
      Cookies.set("userToken", token);

      signIn("credentials", {
        token: token,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.error("Erro na validação:", error);
      alert(error);
    }
  }

  useEffect(() => {
    const storedToken = Cookies.get("userToken") || "";

    setUserToken(storedToken);

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          setUserToken("");
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const storedToken = Cookies.get("userToken") || "";

    setUserToken(storedToken);

    if (storedToken === "") {
      Cookies.remove("userToken");
    }
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex flex-col items-center justify-center bg-white h-[78vh] w-auto">
      <div className="flex flex-col gap-2">
        <p className="pl-8">Código de Verificação:</p>
        <div className="flex pl-5 gap-3">
          <Input
            type="text"
            placeholder="Código de verificação"
            className="h-14 w-80 bg-slate-100 rounded-full"
            onChange={(e) => setCode(e.target.value)}
          />
          <Link href="/username" onClick={handleValidation}>
            <Button
              variant="secondary"
              className="bg-amber-950 h-14 w-13 rounded-full"
            >
              <ChevronRight className="text-slate-50" />
            </Button>
          </Link>
        </div>
        <p className="pl-8">
          Tempo restante: {String(minutes).padStart(2, "0")}:
          {String(remainingSeconds).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

