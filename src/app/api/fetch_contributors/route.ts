import { NextResponse } from "next/server";
import { Contributor } from "@/libs/type";
import axios from "axios";

export async function GET() {
  const contributors: Contributor[] = [];
  let page = 1;
  const perPage = 100;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  try {
    while (true) {
      const response = await axios.get(
        `https://api.github.com/repos/vansh-codes/Gityzer/contributors?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
          timeout: 5000
        }
      );
      const data: Contributor[] = response.data;

      if (data.length === 0) break;

      contributors.push(...data);
      page++;
    }
  } catch { 
    return NextResponse.json({ error: "Error fetching contributors data" }, { status: 500 });
  }

  return NextResponse.json(contributors);
}
