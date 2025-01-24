// app

export interface Params {
    username: string;
}

export interface PreviewCardProps {
    params: {
        username: string;
    };
}

// components
export interface RenderSVGProps {
    star?: boolean;
    star_count?: number;
    fork?: boolean;
    fork_count?: number;
    repo?: boolean;
    repo_count?: number;
    theme: string;
    pattern?: string;
    image: string;
    username?: string;
    UserName?: string;
    tagline?: string;
    Tagline?: string;
    font: string;
}

export interface Stat {
    label: string;
    color: string;
    count: number;
}

export interface MyCardProps {
    login: string;
    img: string;
    url: string;
    contributions: number;
}

// pages
export interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

// api

export interface RequestData {
    prompt: string;
}

export interface ResponseData {
    response?: string;
    success: boolean;
    error?: string;
}

export interface GitHubRepo {
    language: string | null;
    description: string | null;
    stargazers_count: number | null;
    forks_count: number | null;
    owner: { login: string };
    name: string;
};

export interface Config {
    theme: string;
    font: string;
    pattern: string;
    update: string;
    image: string;
    username: boolean;
    tagline: boolean;
    lang: boolean;
    star: boolean;
    fork: boolean;
    repo: boolean;
    UserName: string;
    Tagline: string;
    star_count: number;
    fork_count: number;
    repo_count: number;
};

export interface GenerateTaglineParams {
    username: string;
    Languages: Record<string, number>;
    Description: Record<string, string>;
    config: {
        star_count: number;
        fork_count: number;
        repo_count: number;
    };
}

export interface ApiResponse {
    response: string;
    error?: string;
}

export interface GitHubRepo {
    language: string | null;
    description: string | null;
    stargazers_count: number | null;
    forks_count: number | null;
    name: string;
}

export interface RequestBody {
    username: string;
}

// pages
export interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
}