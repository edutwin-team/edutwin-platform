import React from "react";
import { Link } from "react-router-dom";
import { FeatureCard } from "../../components/home/FeatureCard";
import { FiZap } from "react-icons/fi";
import { BsRainbow } from "react-icons/bs";
import { BiShield } from "react-icons/bi";

const Home: React.FC = () => {
  return (
    <div className="h-full  min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#0b1020] via-[#0c1226] to-[#0b1020] text-white flex items-center justify-center">
      
      <main className="flex mt-5 flex-col items-center text-center px-6">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/40 border border-indigo-700/40 text-indigo-300 text-xs font-semibold tracking-wide">
          ⚡ NEXT-GEN EDUCATIONAL TECH
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl">
          Simulate Students to{" "}
          <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Improve Learning Materials
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-gray-300 text-base md:text-lg">
          Create AI-powered Digital Twin students to test pedagogical content.
          Predict behaviors, identify gaps, and optimize your teaching strategy
          before it reaches the real classroom.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard"
            className="px-8 py-4 rounded-2xl bg-white text-gray-900 font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Teacher Dashboard →
          </Link>

          <Link
            to="/digital-twins"
            className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/20 transition"
          >
            Create Digital Twin
          </Link>
        </div>
     <div className="grid gap-6 md:grid-cols-3 mb-10 mt-10">
      <FeatureCard
        icon={<BsRainbow className="text-indigo-400" />}
        title="Digital Twin Concept"
        description="Digital twins are virtual replicas of physical students. In education, they model cognitive patterns, attention spans, and learning disabilities."
      />

      <FeatureCard
        icon={<FiZap className="text-yellow-400" />}
        title="AI Pedagogical Content"
        description="Test your course materials against various simulated student personas to identify misunderstood concepts."
      />

      <FeatureCard
        icon={<BiShield className="text-emerald-400" />}
        title="Inclusive Design"
        description="Simulate students with disabilities to ensure your materials are truly accessible."
      />
    </div>

      </main>
    </div>
  );
};

export default Home;
