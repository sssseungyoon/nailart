"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PromptBox } from "@/components/ui/PromptBox";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const name =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const avatar = user.user_metadata?.avatar_url;

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between px-4.5 py-3 border-b border-white/10">
        <h1 className="text-base font-bold tracking-tight">Nailart</h1>
        <div className="relative group">
          {avatar && (
            <img
              src={avatar}
              alt=""
              className="w-7 h-7 rounded-full cursor-pointer"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute right-0 top-full mt-1.5 w-52 border border-white/10 rounded-lg bg-black/90 backdrop-blur-md p-3 flex flex-col gap-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <div className="flex items-center gap-2.5">
              {avatar && (
                <img
                  src={avatar}
                  alt=""
                  className="w-8 h-8 rounded-full shrink-0"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-white font-medium truncate">{name}</span>
                <span className="text-[10px] text-white/50 truncate">{user.email}</span>
              </div>
            </div>
            <div className="h-px bg-white/10" />
            <button
              onClick={signOut}
              className="w-full text-left text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center px-6 py-32">
        <p className="text-2xl font-bold tracking-tight">
          Describe your thumbnail
        </p>
        <div className="w-full max-w-lg mt-12">
          <PromptBox />
        </div>
      </div>
    </main>
  );
}
