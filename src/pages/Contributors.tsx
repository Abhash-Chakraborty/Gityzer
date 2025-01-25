"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MyCard from "@/components/MyCard";
import { Contributor } from "@/libs/type";

function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>();

  useEffect(() => {
    async function fetchAllContributors() {
      try {
        const response = await axios.get("/api/fetch_contributors", { timeout: 5000 });
        const data: Contributor[] = response.data;
        setContributors(data);
      } catch (error) {
        console.error("Error fetching contributors data:", error);
      }
    }
    fetchAllContributors();
  }, []);

  return (
    <>
      <div className="flex text-xl font-bold text-white mb-10"> ❤️ Our Repo Contributors ❤️</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {contributors?.map((contributor) => {
          return (
            <MyCard
              key={contributor.login}
              login={contributor.login}
              img={contributor.avatar_url}
              url={contributor.html_url}
              contributions={contributor.contributions}
            />
          );
        })}
      </div>
    </>
  );
}

export default Contributors;
