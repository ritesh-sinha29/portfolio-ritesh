"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  GitCommit,
  GitPullRequest,
  Flame,
  Star,
  GitFork,
  ArrowUpRight,
  Code2,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface RepoHighlight {
  name: string;
  description: string;
  language: string;
  langColor: string;
  stars: number;
  forks: number;
  url: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const initialPinnedRepos: RepoHighlight[] = [
  {
    name: "wekraft",
    description:
      "Wekraft - AI-First Project Execution & Dev Coordination Platform with bidirectional GitHub sync & third-party MCP tool calling.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 6,
    forks: 2,
    url: "https://github.com/ritesh-sinha29/wekraft",
  },
  {
    name: "clarioo",
    description:
      "Personalized career acceleration platform featuring tailored roadmaps and sub-400ms AI-proctored real-time voice mock interviews.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 5,
    forks: 1,
    url: "https://github.com/ritesh-sinha29/clarioo",
  },
  {
    name: "looma",
    description:
      "Real-time multiplayer collaborative canvas enabling teams to sketch, annotate, and convert ideas into live deployable web apps.",
    language: "TypeScript",
    langColor: "#3178c6",
    stars: 4,
    forks: 1,
    url: "https://github.com/ritesh-sinha29/looma",
  },
  {
    name: "aria",
    description:
      "Autonomous personal productivity operating system connecting Slack, Discord, and Gmail with semantic priority scoring.",
    language: "Python",
    langColor: "#ffd43b",
    stars: 3,
    forks: 1,
    url: "https://github.com/ritesh-sinha29/aria",
  },
];

export default function GitHubActivitySection() {
  const gridContainerRef = React.useRef<HTMLDivElement>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    count: number;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  const [rawDays, setRawDays] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(1804);
  const [streakDays, setStreakDays] = useState<number>(48);
  const [pinnedRepos, setPinnedRepos] = useState<RepoHighlight[]>(initialPinnedRepos);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(true);

  // Sync cursor visibility: hide custom cursor when hovering contribution cells
  useEffect(() => {
    if (hoveredCell) {
      document.body.dataset.cursorHidden = "true";
    } else {
      delete document.body.dataset.cursorHidden;
    }
    return () => {
      delete document.body.dataset.cursorHidden;
    };
  }, [hoveredCell]);

  // Fetch real live GitHub contribution data from GitHub API endpoint
  useEffect(() => {
    let isMounted = true;

    async function fetchLiveGitHubData() {
      try {
        // 1. Fetch live contributions
        const res = await fetch(
          "https://github-contributions-api.jogruber.de/v4/ritesh-sinha29?y=last",
          { cache: "no-store" }
        );

        if (res.ok) {
          const data = await res.json();
          if (isMounted && data?.contributions && Array.isArray(data.contributions)) {
            setRawDays(data.contributions);
            if (data.total?.lastYear) {
              setTotalContributions(data.total.lastYear);
            }

            // Calculate active streak from live data
            const days = [...data.contributions].reverse();
            let streak = 0;
            for (const day of days) {
              if (day.count > 0) {
                streak++;
              } else if (streak > 0) {
                break;
              }
            }
            if (streak > 0) setStreakDays(streak);
          }
        }
      } catch (err) {
        console.warn("Using cached GitHub contributions fallback", err);
      } finally {
        if (isMounted) setIsLoadingLive(false);
      }

      // 2. Fetch live repo stars from GitHub REST API
      try {
        const repoRes = await fetch("https://api.github.com/users/ritesh-sinha29/repos?per_page=100");
        if (repoRes.ok) {
          const repos = await repoRes.json();
          if (isMounted && Array.isArray(repos)) {
            setPinnedRepos((prev) =>
              prev.map((item) => {
                const cleanName = item.name.split("/").pop();
                const matched = repos.find(
                  (r: { name: string }) => r.name.toLowerCase() === cleanName?.toLowerCase()
                );
                if (matched) {
                  return {
                    ...item,
                    stars: matched.stargazers_count ?? item.stars,
                    forks: matched.forks_count ?? item.forks,
                    description: matched.description || item.description,
                  };
                }
                return item;
              })
            );
          }
        }
      } catch {
        // Keep initial values
      }
    }

    fetchLiveGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Construct exact 53-week proportional grid and aligned month markers from live data
  const { weeksData, monthMarkers } = useMemo(() => {
    let days = rawDays;

    if (!days || days.length === 0) {
      // 53 weeks * 7 days = 371 days fallback
      const totalDays = 53 * 7;
      const fallback: ContributionDay[] = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - totalDays);

      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateStr = currentDate.toISOString().split("T")[0];
        const count = i % 3 === 0 ? ((i * 7 + 13) % 8) + 1 : 0;
        let level = 0;
        if (count > 8) level = 4;
        else if (count > 5) level = 3;
        else if (count > 2) level = 2;
        else if (count > 0) level = 1;

        fallback.push({ date: dateStr, count, level });
      }
      days = fallback;
    }

    // Group into 7-day week columns
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    days.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === days.length - 1) {
        while (currentWeek.length < 7) {
          currentWeek.push({ date: "", count: 0, level: 0 });
        }
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    // Compute exact month marker starting positions
    const markers: { name: string; col: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((w, colIdx) => {
      if (w[0]?.date) {
        const dateObj = new Date(w[0].date);
        const monthNum = dateObj.getMonth();
        if (monthNum !== lastMonth) {
          markers.push({
            name: dateObj.toLocaleString("en-US", { month: "short" }),
            col: colIdx,
          });
          lastMonth = monthNum;
        }
      }
    });

    return { weeksData: weeks, monthMarkers: markers };
  }, [rawDays]);

  return (
    <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-black/8">
      {/* Header with Title & Direct Link */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[#5a625b] text-[11px] font-mono uppercase tracking-[0.15em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#141b16]" />
            03 / Open Source &amp; Activity
          </div>
          <h2
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            className="text-4xl sm:text-6xl text-[#141b16] font-normal tracking-[-0.02em] leading-[1.05]"
          >
            GitHub <span className="italic font-normal">Activity &amp; Stats</span>.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#616862] max-w-xl font-sans font-normal leading-relaxed">
            Real-time live GitHub metrics, active open-source contributions, and
            daily commits across intelligent AI frameworks.
          </p>
        </div>

        {/* View GitHub Profile Button with clean, non-filled outline styling */}
        <a
          href="https://github.com/ritesh-sinha29"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 sm:px-4.5 py-2 rounded-full bg-white hover:bg-black/[0.04] text-[#141b16] border border-black/10 shadow-xs hover:border-black/20 font-sans font-semibold text-xs uppercase tracking-wider transition-all duration-150 hover:scale-105 active:scale-95 self-start md:self-auto cursor-pointer select-none"
        >
          <GithubIcon className="w-4 h-4 text-[#141b16]" />
          <span>@ritesh-sinha29 on GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#5a625b] group-hover:text-[#141b16] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.2]" />
        </a>
      </div>

      {/* Side-by-Side: Larger Contribution Graph (Left, col-span-8) & Compact 2x2 Stats Grid (Right, col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mb-8 items-stretch">
        {/* Left Column: Expanded Contribution Graph Card */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-[24px] bg-white border border-black/6 shadow-xs flex flex-col justify-between overflow-hidden text-[#141b16]">
          {/* Top Title & Enhanced Hover Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-black/[0.04] flex items-center justify-center">
                <GithubIcon className="w-4 h-4 text-[#141b16]" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm sm:text-base text-[#141b16] tracking-tight leading-none">
                  Contribution Activity
                </h3>
                <p className="text-[10px] font-mono text-[#7a827b] mt-0.5">
                  {isLoadingLive ? "Syncing live metrics..." : "53-week commit history"}
                </p>
              </div>
            </div>

            {/* Top Right Header Badge */}
            <div className="h-6 flex items-center self-start sm:self-auto">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.03] border border-black/5 text-[11px] font-mono text-[#5a625b]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30a14e] animate-pulse" />
                <span>Live GitHub Sync</span>
              </div>
            </div>
          </div>

          {/* Heatmap Grid (Full width on desktop with generous proportions) */}
          <div className="overflow-x-auto pb-1 scrollbar-thin">
            <div
              ref={gridContainerRef}
              data-hide-cursor
              className="relative min-w-[540px] w-full pt-7 pb-1"
            >
              {/* Dynamic Floating Tooltip positioned directly above hovered square */}
              {hoveredCell && (
                <div
                  style={{
                    left: `${hoveredCell.x}px`,
                    top: `${hoveredCell.y - 8}px`,
                    transform: "translate(-50%, -100%)",
                  }}
                  className="absolute pointer-events-none z-50 whitespace-nowrap bg-white text-[#111827] text-[11px] sm:text-xs font-sans font-medium px-3 py-1.5 rounded-md shadow-[0_4px_18px_rgba(0,0,0,0.14)] border border-black/10 transition-all duration-75 animate-in fade-in zoom-in-95 select-none"
                >
                  <span>
                    {hoveredCell.count === 0
                      ? "No contributions"
                      : `${hoveredCell.count} ${hoveredCell.count === 1 ? "commit" : "commits"}`}{" "}
                    on{" "}
                    {new Date(hoveredCell.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {/* Caret pointing to cell */}
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-black/10 rotate-45" />
                </div>
              )}

              {/* Grid Layout: Left Weekday Labels + Full-Width 53 Columns */}
              <div className="flex gap-2.5 items-start">
                {/* Left Day Labels */}
                <div className="flex flex-col justify-between pt-4 pb-0.5 text-[8.5px] font-mono text-[#7a827b] select-none h-[92px] sm:h-[102px] shrink-0">
                  <span className="invisible">Sun</span>
                  <span>Mon</span>
                  <span className="invisible">Tue</span>
                  <span>Wed</span>
                  <span className="invisible">Thu</span>
                  <span>Fri</span>
                  <span className="invisible">Sat</span>
                </div>

                {/* Weeks Container */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Month Labels accurately placed above their respective week columns */}
                  <div className="relative h-3.5 mb-1.5 text-[9px] sm:text-[9.5px] font-mono text-[#7a827b] select-none w-full">
                    {monthMarkers.map((m, idx) => (
                      <span
                        key={`${m.name}-${idx}`}
                        style={{ left: `${(m.col / Math.max(weeksData.length, 52)) * 100}%` }}
                        className="absolute transform -translate-x-0 font-medium"
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>

                  {/* 53 Proportional Columns of 7 Days */}
                  <div className="flex gap-[2.5px] sm:gap-[3px] w-full">
                    {weeksData.map((week, wIndex) => (
                      <div key={wIndex} className="flex-1 flex flex-col gap-[2.5px] sm:gap-[3px]">
                        {week.map((day, dIndex) => {
                          let bgClass = "bg-[#ebedf0]";
                          if (day.level === 1) bgClass = "bg-[#9be9a8]";
                          else if (day.level === 2) bgClass = "bg-[#40c463]";
                          else if (day.level === 3) bgClass = "bg-[#30a14e]";
                          else if (day.level >= 4) bgClass = "bg-[#216e39]";

                          return (
                            <div
                              key={`${day.date || wIndex}-${dIndex}`}
                              data-hide-cursor
                              onMouseEnter={(e) => {
                                if (day.date && gridContainerRef.current) {
                                  const cellRect = e.currentTarget.getBoundingClientRect();
                                  const containerRect = gridContainerRef.current.getBoundingClientRect();
                                  setHoveredCell({
                                    count: day.count,
                                    date: day.date,
                                    x: cellRect.left - containerRect.left + cellRect.width / 2,
                                    y: cellRect.top - containerRect.top,
                                  });
                                }
                              }}
                              onMouseLeave={() => setHoveredCell(null)}
                              className={`w-full aspect-square rounded-[2px] sm:rounded-[2.5px] transition-all duration-150 cursor-pointer hover:scale-125 hover:z-10 ${bgClass}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Legend & Summary */}
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#7a827b] font-mono mt-3.5 pt-3 border-t border-black/5">
                <span className="font-medium text-[#5a625b]">
                  {totalContributions.toLocaleString()} commits past year
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px]">Less</span>
                  <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#ebedf0]" />
                  <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#9be9a8]" />
                  <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#40c463]" />
                  <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#30a14e]" />
                  <span className="w-2.5 h-2.5 rounded-[1.5px] bg-[#216e39]" />
                  <span className="text-[9px]">More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Compact 2x2 Stats Grid (col-span-4) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Stat 1: Total Commits */}
          <div className="p-3.5 sm:p-4 rounded-[20px] bg-white border border-black/6 shadow-xs flex flex-col justify-between hover:border-black/15 transition-all">
            <div className="flex items-center justify-between text-[#5a625b] mb-1.5">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">
                Commits
              </span>
              <GitCommit className="w-3.5 h-3.5 text-[#141b16]" />
            </div>
            <div>
              <div className="font-sans text-xl sm:text-2xl font-extrabold text-[#141b16] tracking-tight leading-none">
                {totalContributions.toLocaleString()}
              </div>
              <p className="text-[9px] text-[#7a827b] font-sans mt-1">
                Past 12 months
              </p>
            </div>
          </div>

          {/* Stat 2: Active Streak */}
          <div className="p-3.5 sm:p-4 rounded-[20px] bg-white border border-black/6 shadow-xs flex flex-col justify-between hover:border-black/15 transition-all">
            <div className="flex items-center justify-between text-[#5a625b] mb-1.5">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">
                Streak
              </span>
              <Flame className="w-3.5 h-3.5 text-[#ff7640]" />
            </div>
            <div>
              <div className="font-sans text-xl sm:text-2xl font-extrabold text-[#141b16] tracking-tight leading-none flex items-baseline gap-1">
                <span>{streakDays}</span>
                <span className="text-[11px] font-semibold text-[#5a625b]">Days</span>
              </div>
              <p className="text-[9px] text-[#7a827b] font-sans mt-1">
                Active streak
              </p>
            </div>
          </div>

          {/* Stat 3: Pull Requests */}
          <div className="p-3.5 sm:p-4 rounded-[20px] bg-white border border-black/6 shadow-xs flex flex-col justify-between hover:border-black/15 transition-all">
            <div className="flex items-center justify-between text-[#5a625b] mb-1.5">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">
                PRs
              </span>
              <GitPullRequest className="w-3.5 h-3.5 text-[#3178c6]" />
            </div>
            <div>
              <div className="font-sans text-xl sm:text-2xl font-extrabold text-[#141b16] tracking-tight leading-none">
                184+
              </div>
              <p className="text-[9px] text-[#7a827b] font-sans mt-1">
                Merged &amp; open
              </p>
            </div>
          </div>

          {/* Stat 4: Code Ratio */}
          <div className="p-3.5 sm:p-4 rounded-[20px] bg-white border border-black/6 shadow-xs flex flex-col justify-between hover:border-black/15 transition-all">
            <div className="flex items-center justify-between text-[#5a625b] mb-1.5">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">
                Code Ratio
              </span>
              <Code2 className="w-3.5 h-3.5 text-[#0ae448]" />
            </div>
            <div>
              <div className="font-sans text-xl sm:text-2xl font-extrabold text-[#141b16] tracking-tight leading-none">
                98.4%
              </div>
              <p className="text-[9px] text-[#7a827b] font-sans mt-1 truncate">
                TS &amp; Python
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Repositories Grid (Matching Real GitHub Profile) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-bold text-base sm:text-lg text-[#141b16] tracking-tight">
            Pinned Repositories
          </h3>
          <span className="text-xs font-mono text-[#7a827b]">
            Open Source Projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pinnedRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-[22px] bg-white border border-black/6 shadow-xs hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:border-black/12 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-mono text-sm font-semibold text-[#141b16] group-hover:text-black group-hover:underline flex items-center gap-1.5 truncate">
                    <GithubIcon className="w-3.5 h-3.5 shrink-0 text-[#5a625b]" />
                    <span className="truncate">{repo.name}</span>
                  </h4>
                  <ArrowUpRight className="w-4 h-4 text-[#7a827b] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
                <p className="font-sans text-xs sm:text-[13px] text-[#555d57] leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-black/5 text-[11px] font-mono text-[#5a625b]">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{repo.stars}</span>
                </div>

                {repo.forks > 0 && (
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-[#7a827b]" />
                    <span>{repo.forks}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
