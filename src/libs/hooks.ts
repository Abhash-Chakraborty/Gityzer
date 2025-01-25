import { useEffect, useCallback, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { defaultConfig, isUrlComplete, defaultParams } from "@/libs/utils";
import { Config } from "@/libs/type";

export const useUpdateURL = (username: string, config: Config) => {
  useEffect(() => {
    const params = new URLSearchParams();
    const excludeKeys = ["username", "tagline", "lang", "UserName", "Tagline", "star_count", "fork_count", "repo_count", "update"];
    Object.entries(config).forEach(([key, value]) => {
      if (!excludeKeys.includes(key) && value !== false && value !== "" && value !== null) {
        params.set(key, value.toString());
      }
    });
    const newUrl = `/${username}?${params.toString()}`;
    history.replaceState(null, "", newUrl);
  }, [username, config]);
};

const getUrlParams = (config: Config, includeKeys: string[]): string => {
  const params = new URLSearchParams();
  Object.entries(config).forEach(([key, value]) => {
    if (includeKeys.includes(key) && value !== false && value !== "" && value !== null) {
      params.set(key, value.toString());
    }
  });
  return params.toString();
};

export const useFetchImage = (config: Config, username: string, setImageUrl: (url: string) => void) => {
  const fetchImage = useCallback(async () => {
    if (isUrlComplete(config, ["theme", "font", "pattern"])) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${username}/image?${getUrlParams(config, ["theme", "font", "pattern", "image", "star", "fork", "repo"])}`;
      setImageUrl(url);
    } else {
      setImageUrl("");
    }
  }, [config, username, setImageUrl]);

  useEffect(() => {
    fetchImage();
  }, [config, fetchImage]);
};

export const useHandleChange = (setConfig: React.Dispatch<React.SetStateAction<Config>>) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
};

export const useInitializeConfig = (username: string, setConfig: React.Dispatch<React.SetStateAction<Config>>, configCalled: React.MutableRefObject<boolean>, userConfigRef: React.MutableRefObject<Config>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const urlParams = Object.fromEntries(searchParams.entries());
    userConfigRef.current = urlParams as unknown as Config;
    const mergedConfig = { ...defaultConfig, ...urlParams } as Config;
    setConfig(mergedConfig);

    if (Object.keys(urlParams).length === 0 && !configCalled.current) {
      router.replace(`/${username}?${defaultParams}`, { scroll: false });
    }
  }, [searchParams, router, username, configCalled, setConfig, userConfigRef]);
};
