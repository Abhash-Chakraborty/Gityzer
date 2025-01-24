"use client";

import React, { useState, useEffect } from "react";
import MyCard from "@/components/MyCard";
import { Contributor } from "@/libs/type";

function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>();

  useEffect(() => {
    async function fetchAllContributors() {
      try {
        const response = await fetch("/api/fetch_contributors");
        const data: Contributor[] = await response.json();
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
