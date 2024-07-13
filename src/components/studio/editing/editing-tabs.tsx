"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Branding from "./branding";
import Details from "./details";
import Security from "./security";

function EditingTabs() {
  return (
    <Tabs defaultValue="branding">
      <TabsList className="sticky z-20 top-14 bg-background h-max p-0 rounded-none border-b w-full flex justify-start">
        <div className="container">
          <TabsTrigger className="font-normal text-foreground" value="branding">
            Branding
          </TabsTrigger>
          <TabsTrigger className="font-normal text-foreground" value="details">
            Details
          </TabsTrigger>
          <TabsTrigger className="font-normal text-foreground" value="security">
            Security
          </TabsTrigger>
        </div>
      </TabsList>
      <div className="container py-3 h-[calc(100vh-164px)] overflow-y-auto scroll">
        <div className="max-w-2xl">
          <TabsContent className="space-y-5" value="branding">
            <Branding />
          </TabsContent>
          <TabsContent value="details">
            <Details />
          </TabsContent>
          <TabsContent value="security">
            <Security />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}

export default EditingTabs;
