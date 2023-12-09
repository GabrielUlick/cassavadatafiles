"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Home() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get("userToken");
    if (typeof window !== "undefined") {
  
      if (!storedToken) {
       
      } else {
        window.location.href = "/home"; 
      }
    }
  }, []);

  async function handleSignIn() {
    if (email === "") {
      alert("Falha no Login: Digite seu Email.");
    } else {
      const endpoint = "sessions";
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
            setDone("/");
          } else {
            const uid = response.data.uid;
            console.log("UUID recebido:", uid);
            Cookies.set("uid", uid);
            setDone("/validation");
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
          <Link href={done} onClick={handleSignIn}>
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
