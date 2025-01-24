export const updateURL = (username: string, config: Record<string, string | boolean | number | null>) => {
  const params = new URLSearchParams();
  const excludeKeys = ["username", "tagline", "lang", "UserName", "Tagline", "star_count", "fork_count", "repo_count", "update"];
  Object.entries(config).forEach(([key, value]) => {
    if (!excludeKeys.includes(key) && value !== false && value !== "" && value !== null) {
      params.set(key, value.toString());
    }
  });
  const newUrl = `/${username}?${params.toString()}`;
  history.replaceState(null, "", newUrl);
};

export const getUrlParams = (config: Record<string, string | boolean | number | null>, includeKeys: string[]): string => {
  const params = new URLSearchParams();
  Object.entries(config).forEach(([key, value]) => {
    if (includeKeys.includes(key) && value !== false && value !== "" && value !== null) {
      params.set(key, value.toString());
    }
  });
  return params.toString();
};
