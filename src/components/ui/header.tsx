import Image from "next/image";
import React from "react";
import { Card } from "./card";

const Header = () => {
  return (
    <Card className="flex justify-between p-[1.875rem] max-h-40 w-auto items-center bg-amber-950 border-0 rounded-bl-lg rounded-br-lg">
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
    </Card>
  );
};

export default Header;
