"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import Branding from "./branding";
import Details from "./details";
import Security from "./security";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function EditingTabs() {
  const [activeTab, setActiveTab] = useState("branding");
  return (
    <>
      <div className="w-full border-b sticky z-20 top-14 bg-background">
        <div className="studio-container space-x-10">
          {["branding", "details", "security"].map((tab, index) => {
            const isActive = tab === activeTab;
            return (
              <div
                role="button"
                className={cn(
                  "capitalize cursor-pointer inline-block pb-3 relative",
                  isActive ? "text-primary" : "text-secondary",
                )}
                key={index}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {isActive ? (
                  <motion.div
                    className="absolute left-0 bg-primary bottom-0 w-full h-[3px]"
                    layoutId="editingTab"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="studio-container max-w-2xl pt-3 pb-5 h-[calc(100vh-164px)] overflow-y-auto scroll">
        {activeTab === "branding" && (
          <div className="space-y-5">
            <Branding />
          </div>
        )}
        {activeTab === "details" && <Details />}
        {activeTab === "security" && <Security />}
      </div>
    </>
  );
  return (
    <Tabs defaultValue="branding">
      <TabsList className="sticky z-20 top-14 bg-background h-max p-0 rounded-none border-b w-full flex justify-start">
        <div className="studio-container space-x-10">
          <TabsTrigger
            className="font-normal text-foreground px-0"
            value="branding"
          >
            Branding
          </TabsTrigger>
          <TabsTrigger
            className="font-normal text-foreground px-0"
            value="details"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            className="font-normal text-foreground px-0"
            value="security"
          >
            Security
          </TabsTrigger>
        </div>
      </TabsList>
      <div className="studio-container py-3 h-[calc(100vh-164px)] overflow-y-auto scroll">
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
