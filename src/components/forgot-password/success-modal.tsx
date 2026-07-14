import successIllustration from '#/assets/success-illustration.png'

export function SuccessModal({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex w-full max-w-[440px] flex-col items-center gap-6 rounded-2xl bg-white p-8 text-center">
        <img src={successIllustration} alt="" className="h-[120px] w-[116px] object-contain" />
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[24px] font-semibold tracking-[-0.5px] text-[#0C111D]">
            Successfully Saved
          </h2>
          <p className="text-[14px] leading-[1.6] tracking-[-0.084px] text-[#525866]">
            Your account password has successfully been updated
          </p>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}
