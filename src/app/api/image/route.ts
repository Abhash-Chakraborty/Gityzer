import satori from "satori";
import { NextResponse } from "next/server";
import RenderSVG from "@/app/api/image/components/RenderSVG";
import axios from "axios";

export const runtime = "edge";

export async function GET(req: Request): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);
    const username = query.username as string;

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
        return new NextResponse(JSON.stringify({ error: "BASE_URL is not defined" }), {
            status: 500,
            headers: {
                "content-type": "application/json",
                "cache-control": "public, max-age=0",
            },
        });
    }

    const requestBody = { username: username };

    const configRes = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config`, requestBody, { timeout: 10000 });

    if (configRes.status !== 200) {
        throw new Error("Failed to fetch config");
    }

    const configData = configRes.data;

    const config = {
        theme: query.theme || configData.theme || "",
        font: query.font || configData.font || "",
        pattern: query.pattern || configData.pattern || "",
        update: configData.update || "",
        image: query.image || configData.image || "",
        username: configData.username !== undefined ? configData.username : true,
        tagline: configData.tagline !== undefined ? configData.tagline : true,
        lang: configData.lang !== undefined ? configData.lang : false,
        star: query.star !== undefined ? true : configData.star !== undefined ? configData.star : false,
        fork: query.fork !== undefined ? true : configData.fork !== undefined ? configData.fork : false,
        repo: query.repo !== undefined ? true : configData.repo !== undefined ? configData.repo : false,
        UserName: configData.UserName || "",
        Tagline: configData.Tagline || "",
        star_count: configData.star_count || 0,
        fork_count: configData.fork_count || 0,
        repo_count: configData.repo_count || 0,
    };

    const svg = await satori(
        RenderSVG(...[config]),
        {
            width: 720,
            height: 360,
            fonts: [
                {
                    name: "Helvetica",
                    data: await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Helvetica.otf`, { responseType: "arraybuffer", timeout: 5000 }).then((res) => res.data),
                    weight: 400,
                    style: "normal",
                },
                {
                    name: "Arial",
                    data: await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Arial.ttf`, { responseType: "arraybuffer", timeout: 5000 }).then((res) => res.data),
                    weight: 400,
                    style: "normal",
                },
                {
                    name: "TimesNewRoman",
                    data: await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/TimesNewRoman.ttf`, { responseType: "arraybuffer", timeout: 5000 }).then((res) => res.data),
                    weight: 400,
                    style: "normal",
                },
                {
                    name: "Calibri",
                    data: await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Calibri.ttf`, { responseType: "arraybuffer", timeout: 5000 }).then((res) => res.data),
                    weight: 400,
                    style: "normal",
                },
                {
                    name: "Verdana",
                    data: await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Verdana.ttf`, { responseType: "arraybuffer", timeout: 5000 }).then((res) => res.data),
                    weight: 400,
                    style: "normal",
                },
                {
                    name: "Cascadia",
                    data: await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/CascadiaCode-Bold.otf`, { responseType: "arraybuffer", timeout: 5000 }).then((res) => res.data),
                    weight: 800,
                    style: "normal",
                },
            ],
        },
    );

    return new NextResponse(svg, {
        status: 200,
        headers: {
            "Content-Type": "image/svg+xml",
            "cache-control": "public, immutable, no-transform, max-age=0",
        },
    });
}