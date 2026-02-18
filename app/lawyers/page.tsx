"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Scale,
  Clock,
  FileText,
  Users,
  ArrowUpRight,
  FilePen,
  Search,
  BookOpen,
  ChevronRight,
  Bell,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getDashboardStats,
  getCalendarEvents,
  getActivityItems,
  getAmendments,
} from "@/lib/mock-lawyer/api";
import type {
  DashboardStats,
  CalendarEvent,
  ActivityItem,
  Amendment,
} from "@/lib/mock-lawyer/types";

const iconMap: Record<string, React.ElementType> = {
  scale: Scale,
  "file-text": FileText,
  search: Search,
  clock: Clock,
  users: Users,
  "file-pen": FilePen,
  "book-open": BookOpen,
  bell: Bell,
};

const quickActions = [
  { label: "Generate Brief", href: "/lawyers/brief", icon: FileText, color: "bg-[#2563EB]/10 text-[#2563EB]" },
  { label: "Draft Petition", href: "/lawyers/petition", icon: FilePen, color: "bg-purple-50 text-purple-600" },
  { label: "Legal Research", href: "/lawyers/research", icon: Search, color: "bg-emerald-50 text-emerald-600" },
  { label: "Find Case Law", href: "/lawyers/case-finder", icon: BookOpen, color: "bg-amber-50 text-amber-600" },
  { label: "Track Cases", href: "/lawyers/case-tracker", icon: Scale, color: "bg-rose-50 text-rose-600" },
  { label: "View Clients", href: "/lawyers/clients", icon: Users, color: "bg-blue-50 text-blue-600" },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function LawyerDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [amendments, setAmendments] = useState<Amendment[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getCalendarEvents().then((evts) => setEvents(evts.slice(0, 5)));
    getActivityItems().then(setActivity);
    getAmendments().then((amds) => setAmendments(amds.filter((a) => a.impact === "High").slice(0, 2)));
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
        <p className="text-sm font-medium text-[#2563EB] tracking-wide uppercase mb-1">
          {getGreeting()}
        </p>
        <h1 className="text-4xl font-bold font-serif text-gray-900">
          Advocate <span className="text-[#2563EB]">Fatima</span>
        </h1>
        <p className="mt-2 text-gray-500">{today}</p>
      </div>

      {/* Amendment Alert Banner */}
      {amendments.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-800">New Amendment Alerts</h3>
              <p className="text-xs text-amber-700 mt-1">
                {amendments.length} high-impact amendment{amendments.length > 1 ? "s" : ""} to tracked statutes
              </p>
              <Button variant="link" size="sm" className="text-amber-700 hover:text-amber-900 p-0 h-auto mt-1 text-xs" asChild>
                <Link href="/lawyers/amendments">View All Alerts <ArrowUpRight className="h-3 w-3 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-[#2563EB]" />
              </div>
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />12%
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
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stats?.upcomingHearings ?? "—"}</p>
              <p className="text-sm text-gray-500">Upcoming Hearings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <span className="flex items-center gap-1 text-sm text-amber-600">
                <ArrowUpRight className="h-3 w-3" />3 new
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stats?.pendingDrafts ?? "—"}</p>
              <p className="text-sm text-gray-500">Pending Drafts</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stats?.totalClients ?? "—"}</p>
              <p className="text-sm text-gray-500">Clients</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Today&apos;s Schedule</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <Link href="/lawyers/calendar">View Calendar</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {event.startTime} — {event.endTime}
                        {event.location && ` · ${event.location}`}
                      </p>
                      {event.caseTitle && (
                        <p className="text-xs text-gray-400 mt-0.5">{event.caseTitle}</p>
                      )}
                    </div>
                    <Badge className={
                      event.type === "Hearing"
                        ? "bg-[#2563EB]/10 text-[#2563EB] hover:bg-[#2563EB]/10"
                        : event.type === "Deadline"
                          ? "bg-red-100 text-red-700 hover:bg-red-100"
                          : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    }>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Button key={action.label} variant="ghost" className="w-full justify-start h-12" asChild>
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
