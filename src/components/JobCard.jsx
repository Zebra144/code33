import React from 'react'
import { assets /* , jobsData */ } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div
      className="
        relative overflow-hidden p-6 rounded-2xl
        bg-white/8 backdrop-blur-md
        border border-blue-400/40
        shadow-[0_10px_35px_rgba(0,0,0,.45)]
        transition
        hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(0,0,0,.55)]
        hover:border-cyan-300/60
      "
    >
      {/* keep your cyan space vibe under the glass */}
      <div
        aria-hidden
        className="
          absolute inset-0 -z-10
          bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900
          opacity-35
        "
      />
      {/* soft cyan glow */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -top-20 -right-24 h-56 w-56
          rounded-full bg-cyan-400/30 blur-3xl
        "
      />
      {/* diagonal sheen */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -inset-x-16 -top-24 h-24
          bg-gradient-to-r from-white/25 via-white/10 to-transparent
          rotate-12
        "
      />

      {/* header row */}
      <div className="flex justify-between items-center">
        <img className="h-8 drop-shadow" src={assets.company_icon} alt="" />
      </div>

      {/* Title — brighter, sharper */}
      <h4
        className="
          mt-3 text-2xl font-semibold tracking-tight
          text-white antialiased
          drop-shadow-[0_1px_1px_rgba(0,0,0,.45)]
        "
      >
        {job.title}
      </h4>

      {/* Meta chips — higher contrast, readable */}
      <div className="flex items-center gap-3 mt-3 text-[0.8rem]">
        <span className="px-4 py-1.5 rounded-lg border border-white/25 bg-white/15 text-white antialiased">
          {job.location}
        </span>
        <span className="px-4 py-1.5 rounded-lg border border-white/25 bg-white/15 text-white antialiased">
          {job.level}
        </span>
      </div>

      {/* Description — bigger, brighter, comfy leading */}
      <p
        className="
          text-base text-zinc-100/95 leading-relaxed mt-4 antialiased
          drop-shadow-[0_1px_1px_rgba(0,0,0,.35)]
        "
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      />

      {/* CTAs */}
      <div className="mt-5 flex gap-4 text-sm">
        <button
          onClick={() => { navigate(`/apply-job/${job._id}`); window.scrollTo(0, 0) }}
          className="
            px-6 py-2.5 rounded-xl font-semibold antialiased
            text-white
            bg-gradient-to-r from-cyan-400 to-blue-600
            shadow-[0_0_20px_rgba(6,182,212,.40)]
            hover:shadow-[0_0_30px_rgba(6,182,212,.60)]
            focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-black
            transition
          "
        >
          Apply now
        </button>

        <button
          onClick={() => { navigate(`/apply-job/${job._id}`); window.scrollTo(0, 0) }}
          className="
            px-6 py-2.5 rounded-xl font-semibold antialiased
            text-white
            border border-white/25 bg-white/10
            hover:bg-white/15 hover:border-white/35
            focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black
            transition
          "
        >
          Learn more
        </button>
      </div>
    </div>
  )
}

export default JobCard
