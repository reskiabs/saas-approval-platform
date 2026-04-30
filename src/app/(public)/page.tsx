"use client";

import { Code, Layers, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#0B0F1A] text-white min-h-screen overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#3B82F6,#8B5CF6,#14B8A6)] opacity-10 blur-3xl" />

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 backdrop-blur-md bg-white/5 border-b border-white/10 relative z-10">
        <h1 className="text-xl font-semibold tracking-wide">
          <span>Approve</span>
          <span className="text-blue-400">Lab</span>
        </h1>

        <div className="flex gap-6 text-sm text-gray-300">
          <a href="#">Features</a>
          <a href="#">Tech</a>
          <a href="#">GitHub</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-28 px-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Approve
          <span className="bg-[linear-gradient(135deg,#3B82F6,#8B5CF6,#14B8A6)] bg-clip-text text-transparent">
            Lab
          </span>
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Modern document approval platform built for speed, security, and
          seamless workflow automation.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href={"/login"}
            className="px-6 py-3 rounded-xl bg-[linear-gradient(135deg,#3B82F6,#8B5CF6,#14B8A6)] text-white font-medium shadow-lg hover:scale-105 transition"
          >
            Get Started
          </Link>

          <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
            View GitHub
          </button>
        </div>

        <p className="mt-10 text-sm tracking-widest text-gray-400">
          APPROVE WITH CONFIDENCE
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: Shield, title: "Secure" },
            { icon: Zap, title: "Fast" },
            { icon: Layers, title: "Scalable" },
            { icon: Code, title: "Built with Skill" },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center hover:scale-105 transition"
            >
              <f.icon className="mx-auto mb-4 text-blue-400" size={28} />
              <p className="text-gray-300">{f.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-10 text-gray-300">
            Built with Modern Technology
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Supabase",
              "Zustand",
              "React Query",
              "Shadcn UI",
            ].map((tech) => (
              <div
                key={tech}
                className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 border-t border-white/10 text-gray-500 text-sm relative z-10">
        © {new Date().getFullYear()} ApproveLab. Built with passion.
      </footer>
    </main>
  );
}
