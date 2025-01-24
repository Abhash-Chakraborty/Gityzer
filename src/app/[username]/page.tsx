"use client";
import { useEffect, useState, useRef, useCallback, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ExportOptions from "@/app/[username]/components/ExportOptions";
import CustomizeForm from "@/app/[username]/components/CustomizeForm";
import { defaultConfig, isUrlComplete, defaultParams } from "@/libs/utils";
import { updateURL, getUrlParams } from "@/libs/hooks";
import { PreviewCardProps, Config } from "@/libs/type";

export default function PreviewCard({ params }: PreviewCardProps) {
  const username = params?.username;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<Config>({} as Config);
  const prevConfigRef = useRef<Config>(config);
  const configCalled = useRef(false);
  const userConfigRef = useRef<Config>({} as Config);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!searchParams) return;

    const urlParams = Object.fromEntries(searchParams.entries());
    userConfigRef.current = urlParams as unknown as Config;
    const mergedConfig = { ...defaultConfig, ...urlParams } as Config;
    setConfig(mergedConfig);

    if (Object.keys(urlParams).length === 0 && !configCalled.current) {
      router.replace(`/${username}?${defaultParams}`, { scroll: false });
    }
  }, [searchParams, router, username]);

  useEffect(() => {
    if (JSON.stringify(prevConfigRef.current) !== JSON.stringify(config)) {
      // @ts-expect-error: Argument of type 'Config' is not assignable to parameter of type 'Record<string, string | number | boolean | null>'.
      updateURL(username, config);
      prevConfigRef.current = config;
    }
  }, [config, username]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchImage = useCallback(async () => {
    if (isUrlComplete(config, ["theme", "font", "pattern"])) {
      // @ts-expect-error: Argument of type 'Config' is not assignable to parameter of type 'Record<string, string | number | boolean | null>'.
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${username}/image?${getUrlParams(config, ["theme", "font", "pattern", "image", "star", "fork", "repo"])}`;
      setImageUrl(url);
    } else {
      setImageUrl("");
    }
  }, [config, username]);

  useEffect(() => {
    fetchImage();
  }, [config, fetchImage]);

  return (
    <div className='min-h-screen text-white relative flex flex-col gap-2' >
      <div className="flex gap-10 items-center justify-center mb-2 h-[360px]">
        <div className="w-[720px] h-[360px] flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {imageUrl && <img src={imageUrl} alt="" />}
        </div>
      </div>
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
