"use client";
import { useState, useRef } from "react";
import { Toaster } from "react-hot-toast";
import ExportOptions from "@/components/ExportOptions";
import CustomizeForm from "@/components/CustomizeForm";
import { useUpdateURL, useFetchImage, useHandleChange, useInitializeConfig } from "@/libs/hooks";
import { PreviewCardProps, Config } from "@/libs/type";

export default function PreviewCard({ params }: PreviewCardProps) {
  const username = params?.username;
  const [config, setConfig] = useState<Config>({} as Config);
  const configCalled = useRef(false);
  const userConfigRef = useRef<Config>({} as Config);
  const [imageUrl, setImageUrl] = useState("");

  useInitializeConfig(username, setConfig, configCalled, userConfigRef);
  useUpdateURL(username, config);
  useFetchImage(config, username, setImageUrl);

  const handleChange = useHandleChange(setConfig);

  return (
    <div className='min-h-screen text-white relative flex flex-col gap-2' >
      <div className="flex gap-10 items-center justify-center mb-2 h-[360px]">
        <div className="w-[720px] h-[360px] flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {imageUrl && <img src={imageUrl} alt="" />}
        </div>
      </div>
      <div className="h-9"></div>
      <ExportOptions 
        username={username}
        imageUrl={imageUrl}
      />
      <CustomizeForm 
        config={config} 
        handleChange={handleChange}
      />
      <Toaster />
    </div>
  );
}
