"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Scale,
  Clock,
  Gavel,
  FileText,
  ArrowUpRight,
  FileStack,
  Search,
  StickyNote,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/judges/shared/page-header";
import { getDashboardStats, getHearings, getActivityItems } from "@/lib/mock/api";
import type { DashboardStats, Hearing, ActivityItem } from "@/lib/mock/types";

const iconMap: Record<string, React.ElementType> = {
  gavel: Gavel,
  "file-text": FileText,
  scale: Scale,
  search: Search,
  "sticky-note": StickyNote,
  clock: Clock,
  "file-stack": FileStack,
};

const quickActions = [
  { label: "Generate Brief", href: "/judges/brief", icon: FileText, color: "bg-[#A21CAF]/10 text-[#A21CAF]" },
  { label: "Research Law", href: "/judges/research", icon: Search, color: "bg-blue-50 text-blue-600" },
  { label: "Draft Judgment", href: "/judges/judgment", icon: Gavel, color: "bg-amber-50 text-amber-600" },
  { label: "View Documents", href: "/judges/documents", icon: FileStack, color: "bg-emerald-50 text-emerald-600" },
  { label: "My Notes", href: "/judges/notes", icon: StickyNote, color: "bg-pink-50 text-pink-600" },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function JudgesDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getHearings().then(setHearings);
    getActivityItems().then(setActivity);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <p className="text-sm font-medium text-[#A21CAF] tracking-wide uppercase mb-1">
          {getGreeting()}
        </p>
        <h1 className="text-4xl font-bold font-serif text-gray-900">
          Justice <span className="text-[#A21CAF]">Ahmed</span>
        </h1>
        <p className="mt-2 text-gray-500">{today}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-[#A21CAF]/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-[#A21CAF]" />
              </div>
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />8.2%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stats?.activeCases ?? "—"}</p>
              <p className="text-sm text-gray-500">Active Cases</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stats?.todayHearings ?? "—"}</p>
              <p className="text-sm text-gray-500">Today&apos;s Hearings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Gavel className="h-5 w-5 text-amber-600" />
              </div>
              <span className="flex items-center gap-1 text-sm text-amber-600">
                <ArrowUpRight className="h-3 w-3" />15%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stats?.pendingJudgments ?? "—"}</p>
              <p className="text-sm text-gray-500">Pending Judgments</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stats?.documentsThisWeek ?? "—"}</p>
              <p className="text-sm text-gray-500">Documents This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hearings + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Hearings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s Hearings</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-3">
                {hearings.map((hearing) => (
                  <Link
                    key={hearing.id}
                    href={`/judges/brief/brief-001`}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {hearing.caseTitle}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {hearing.time} — {hearing.courtRoom}
                      </p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        {hearing.caseNumber}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        className={
                          hearing.status === "In Progress"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                            : hearing.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        }
                      >
                        {hearing.status}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start h-12"
                  asChild
                >
                  <Link href={action.href}>
                    <div className={`h-8 w-8 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                      <action.icon className="h-4 w-4" />
                    </div>
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {activity.map((item) => {
                const Icon = iconMap[item.icon] || FileText;
                return (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{item.text}</p>
                      <p className="text-xs text-gray-400">{item.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
