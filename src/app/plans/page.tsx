"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { ArrowLeft, ChevronRight, ShoppingCart } from "lucide-react";

import Link from "next/link";

export default function Plans() {
   
    return (
        <>
            <div className="p-10">
                <Link href="/home">
                    <ArrowLeft />
                </Link>
            </div>
            <div className="flex items-center justify-center bg-white h-[77vh] w-auto">
                <div className="flex items-center justify-center gap-40">

                    <div className="flex flex-col bg-slate-200 items-center justify-between gap-10 rounded-lg max-w-sm w-96 h-[500px] shadow-xl">
                        <div className="flex p-3 justify-between border-b-2 border-b-slate-400 w-80">
                            <p className="p-2 font-bold text-orange-500 text-3xl">R$0</p>
                            <p className="p-2 font-bold text-orange-500 text-3xl">Free</p>
                        </div>
                        <div>
                            <div className="flex flex-col w-64 gap-3">
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                            </div>
                        </div>
                        <div className="flex items-center border-t-2 border-t-slate-400 p-5 justify-center text-justify w-80">
                            <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para </p>
                        </div>
                    </div>

                    <div className="flex flex-col bg-slate-200 items-center justify-between gap-10 rounded-lg w-96 h-[500px] shadow-xl">
                        <div className="flex p-3 justify-between border-b-2 border-b-slate-400 w-80">
                            <p className="p-2 font-bold text-orange-500 text-3xl">R$30</p>
                            <p className="p-2 font-bold text-orange-500 text-3xl">Medium</p>
                        </div>
                        <div>
                            <div className="flex flex-col w-64 gap-3">
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                            </div>
                        </div>
                        <div className="flex items-center border-t-2 border-t-slate-400 p-5 justify-center text-justify w-80">
                           <Button size="lg"
                           variant="default"
                           className="bg-amber-950 text-orange-500">
                            Shop Now 
                            <ShoppingCart />
                           </Button>
                        </div>
                    </div>

                    <div className="flex flex-col bg-slate-200 items-center justify-between gap-10 rounded-lg w-96 h-[500px] shadow-xl">
                        <div className="flex p-3 justify-between border-b-2 border-b-slate-400 w-80">
                            <p className="p-2 font-bold text-orange-500 text-3xl">R$40</p>
                            <p className="p-2 font-bold text-orange-500 text-3xl">Plus</p>
                        </div>
                        <div>
                            <div className="flex flex-col w-64 gap-3">
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                                <p className="font-bold text-justify">* Lorem Ipsum é simplesmente uma simulação de texto da </p>
                            </div>
                        </div>
                        <div className="flex items-center border-t-2 border-t-slate-400 p-5 justify-center text-justify w-80">
                        <Button size="lg"
                           variant="default"
                           className="bg-amber-950 text-orange-500">
                            Shop Now 
                            <ShoppingCart />
                           </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
