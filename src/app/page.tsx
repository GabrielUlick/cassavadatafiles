"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import api from "@/services/api";
import { ChevronRight, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  function handleSignIn() {
    if (email === "") {
      alert("Falha no Login: Digite seu Email.");
    } else {
      const endpoint = "sessions/";
      console.log(email);
      api
        .post(endpoint, email, {
          validateStatus: (status) => {
            return status < 405;
          },
        })
        .then((response) => {
          if (response.status === 404) {
            alert("Erro ao criar Cliente: " + response.data);
          } else {
            alert("Cliente Cadastrado");
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
      <div className="flex pl-5 p-40">
        <Input
          type="email"
          placeholder="Email"
          className="bg-gray-200 text-black border-0"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          size={"sm"}
          variant={"ghost"}
          className="bg-amber-950 h-10"
          onClick={handleSignIn}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
