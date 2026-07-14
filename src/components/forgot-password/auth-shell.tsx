import type { ReactNode } from 'react'

import doorsLogoMark from '#/assets/doors-logo-mark.svg'

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-white font-['Inter',sans-serif]">
      <div className="absolute left-1/2 top-[35px] flex -translate-x-1/2 items-center gap-[4.66px]">
        <img src={doorsLogoMark} alt="" className="h-[17px] w-[17px]" />
        <p className="text-[23px] font-semibold tracking-[-0.93px] text-black">doors</p>
      </div>

      <div className="absolute left-1/2 top-1/2 flex w-[calc(100%-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6">
        {children}
      </div>
    </div>
  )
}
