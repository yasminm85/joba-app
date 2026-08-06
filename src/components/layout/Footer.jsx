import React from "react"

export default function Footer () {
    return(
        <footer className="bg-[#2D2321] py-12 text-white border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="font-bold text-[#FF84BA] text-sm uppercase tracking-wider">JOBA AI TRACKER</p>
            <p className="uppercase font-medium tracking-tight text-white/50 text-[10px]">© 2026 JOBA. All Rights Reserved.</p>
          </div>
          <div className="flex gap-8 uppercase font-bold tracking-wider text-[10px] text-white/70">
            <a href="https://linkedin.com/in/nuryasminmb/" target="_blank" rel="noreferrer" className="hover:text-[#FF84BA] transition-colors">LinkedIn</a>
            <a href="https://github.com/yasminm85" target="_blank" rel="noreferrer" className="hover:text-[#FF84BA] transition-colors">GitHub</a>
            <a href="mailto:yasminmutiarabintang@gmail.com" className="hover:text-[#FF84BA] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    )
}
