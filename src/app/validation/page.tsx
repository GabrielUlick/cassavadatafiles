"use client";

import { signIn } from 'next-auth/react';
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Validation() {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(300);

  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("uuid");

  function handleSignIn() {
    if (code === "") {
      alert("Falha no Login: Digite seu code.");
    } else {
      const endpoint = "sessions/validations";
  
      const requestData = {
        code: code,
        uid: uid,
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
            // Extraia o token da resposta
            const token = response.data.token;
  
            // Use o NextAuth para autenticar o usuário e redirecionar para a página desejada
            signIn('credentials', {
              token: token,
              callbackUrl: '/profile', // Redirecione para a página desejada
            });
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          // Implemente a lógica a ser executada quando o contador chegar a zero
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Limpe o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  // Converte os segundos para minutos e segundos
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex flex-col items-center justify-center bg-white h-[78vh] w-auto">
      <div className="flex flex-col gap-2">
        <p className="pl-8">Verification Code:</p>
        <div className="flex pl-5 gap-3">
          <Input
            type="text"
            placeholder="verification code"
            className="h-14 w-80 bg-slate-100 rounded-full"
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            variant="secondary"
            className="bg-amber-950 h-14 w-13 rounded-full"
            onClick={handleSignIn}
          >
            <ChevronRight className="text-slate-50" />
          </Button>
        </div>
        <p className="pl-8">
          Tempo restante: {String(minutes).padStart(2, "0")}:
          {String(remainingSeconds).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
