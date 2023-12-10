"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Username() {
  const [username, setUsername] = useState("");

  function handleSignIn() {
    if (username === "") {
      alert("Falha no Login: Digite seu username.");
    } else {
      const endpoint = "/users/name";

      const requestData = {
        name: username,
      };
      const storedToken = Cookies.get("userToken");

      api
        .put(endpoint, requestData, {
          validateStatus: (status) => {
            return status < 405;
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: storedToken ? `Bearer ${storedToken}` : " ",
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            console.log("ok");
            window.location.href = "/home"; 
          } else {
            window.location.href = "/home"; 
          }
        })
        .catch((error) => {
          console.error(error);
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
              onClick={() => handleSignIn()}
            >
              <ChevronRight className="text-slate-50" />
            </Button>
        </div>
        <p className="pl-8">Create a username </p>
      </div>
    </div>
  );
}
