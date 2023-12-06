"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Card } from "./card";
import axios from "axios";
import { Ghost, LogOut, User } from "lucide-react";
import { Button } from "./button";
import Cookies from "js-cookie";

const Header = () => {
  const [data, setData] = useState("");
  const storedToken = Cookies.get("userToken");

  function handleLogout() {
    Cookies.remove("userToken");
    location.reload();
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.olhai.me/v1/users", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setData(response.data?.name);
        console.log(response);
        console.log("AQUI ESTA O QUE VEIO DO BANCO", response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-between p-[1.875rem] max-h-40 w-auto items-center bg-amber-950 border-0 rounded-bl-3xl rounded-br-3xl">
      <Image
        src={"/LogoCassava.png"}
        alt={"Cassava DataFiles"}
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto w-auto max-w-[15%] max-h-[20%]"
        style={{
          objectFit: "contain",
        }}
      />
      <div>
        {storedToken ? (
          <div className="flex mt-16 items-center gap-2 text-orange-500">
            <div className="flex gap-2 border-white">
              <User /> {data}
            </div>
            <Button variant={"ghost"} onClick={handleLogout}>
              <LogOut size={15} />
            </Button>
          </div>
        ) : (
          <div>
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
