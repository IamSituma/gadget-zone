"use client";

import { AnnouncementBanner } from "@/components/announcement-banner";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CompanyPage() {
  const commitment = [
    { title: "Optimize use of sustainable materials", image: "/commitment1.jpg" },
    { title: "Simplify the manufacturing line", image: "/commitment2.jpg" },
    { title: "Set up greener logistics", image: "/commitment3.jpg" },
  ];

  const faqs = [
    { question: "What products do you offer?", answer: "We offer smartphones, accessories, power solutions, and more." },
    { question: "Do you deliver nationwide?", answer: "Yes, we deliver across Uganda with fast, tracked shipping." },
    { question: "Are your products original?", answer: "All products are sourced from official, authorized distributors." },
    { question: "Do items come with warranty?", answer: "Yes, we provide valid manufacturer warranties." },
    { question: "Can I return an item?", answer: "Yes, defective or incorrect items can be returned within the policy window." },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />

      <section className="relative h-[750px] w-full">
        <img
          src="/about.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-6xl font-extrabold mb-4">Our Company</h1>
          <p className="max-w-3xl text-xl mb-8">
            Voltspire provides reliable electronics and power solutions, built on innovation
            and a strong customer-first philosophy.
          </p>
        </div>
      </section>

      <section className="bg-[#f7f7f7] py-32">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-5xl font-extrabold mb-4">Discover Voltspire</h2>
          <h3 className="text-4xl font-bold mb-8">Shaping the future together</h3>

          <p className="text-muted-foreground max-w-3xl mx-auto mb-20 text-xl leading-relaxed">
            We are committed to delivering innovative electronics and power solutions that
            empower users, blending smart technology with reliability and affordability.
          </p>

          {/* Mission & Vision Grid */}
          <div className="grid md:grid-cols-2 gap-20 relative max-w-5xl mx-auto">

            <div className="hidden md:block absolute left-1/2 top-0 h-full w-[1px] bg-gray-300"></div>

            {/* Mission */}
            <div className="px-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-[4px] bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-bold mb-6">Our mission</h3>
              <p className="text-muted-foreground leading-relaxed text-xl">
                To deliver high-quality, accessible tech products that improve everyday life
                through innovation, honesty, and customer-first values.
              </p>
            </div>

            {/* Vision */}
            <div className="px-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-[4px] bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-bold mb-6">Our vision</h3>
              <p className="text-muted-foreground leading-relaxed text-xl">
                To become the most trusted and user-loved tech brand in Africa, known for
                reliability, creativity, and seamless customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMITMENT SECTION
      ===================================================== */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-5xl font-bold text-center mb-6">Our commitment</h2>
        <p className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto">
          We are committed to building a sustainable world—designing responsibly and producing sustainably.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {commitment.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden relative h-[300px] cursor-pointer transition hover:scale-[1.03]"
            >
              <img
                src={item.image}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white font-semibold text-xl">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          STRATEGY SECTION — TALLER WITH BACKGROUND + OVERLAY
      ===================================================== */}
      <section className="relative py-52 px-4">
        <img
          src="/exp.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 container mx-auto text-left text-white max-w-4xl">
          <h2 className="text-5xl font-extrabold mb-8">Our Strategy</h2>
          <p className="text-2xl mb-12 leading-relaxed max-w-3xl">
            At Voltspire, our strategy is built on the framework:
            <span className="font-bold text-green-400"> “Customer × Technology × Experience”</span>.
            We focus on using innovation to deliver trusted, accessible products that elevate everyday life.
          </p>
        </div>
      </section>

      {/* =====================================================
          FAQ SECTION
      ===================================================== */}
      <section className="bg-green-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>

          <div className="max-w-4xl mx-auto space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-white/30 p-5 rounded-md cursor-pointer hover:bg-green-700 transition"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <h3 className="font-semibold text-xl">{faq.question}</h3>
                {openFaqIndex === index && (
                  <p className="mt-3 text-lg">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
