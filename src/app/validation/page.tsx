"use client";

import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Validation() {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(300);
  const [userToken, setUserToken] = useState("");
  const uid = localStorage.getItem("uid");

  function handleValidation() {
    if (code === "") {
      alert("Falha no Login: Digite seu código.");
    } else {
      const endpoint = "sessions/validations";

      const requestData = {
        code: code,
        uid: uid,
      };
      console.log("AQUI ESTA O UID", uid);
      api
        .post(endpoint, requestData, {
          validateStatus: (status) => status < 405,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer",
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            alert(response.data.message);
          } else {
            const token = response.data.token;
            alert(token);
            setUserToken(token);
            signIn("credentials", {
              token: token,
              callbackUrl: "/profile",
            });
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");

    if (storedToken !== null) {
      setUserToken(storedToken);
    }

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
    if (userToken) {
      localStorage.setItem("userToken", userToken);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [userToken]);

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
