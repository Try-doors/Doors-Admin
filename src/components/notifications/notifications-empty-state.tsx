import notificationsEmptyIllustration from '#/assets/notifications-empty-state.png'

export function NotificationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <img src={notificationsEmptyIllustration} alt="" className="h-[132px] w-[137px]" />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">
          No Notifications
        </p>
        <p className="text-[14px] tracking-[-0.084px] text-[#868C98]">Check back later</p>
      </div>
    </div>
  )
}
