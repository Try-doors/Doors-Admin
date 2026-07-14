import usersEmptyIllustration from '#/assets/users-empty-state.png'

export function UsersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <img src={usersEmptyIllustration} alt="" className="h-[106px] w-[107px]" />
      <div className="flex flex-col items-center gap-0.5 text-center">
        <p className="text-[16px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
          No Users Yet
        </p>
        <p className="text-[14px] tracking-[-0.084px] text-[#31353F]">Check back later</p>
      </div>
    </div>
  )
}
