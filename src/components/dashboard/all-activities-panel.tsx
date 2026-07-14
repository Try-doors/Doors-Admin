import { useState } from 'react'
import { Bell, ChevronDown, Search, Trash2, UserCheck, UserPlus, UserRound } from 'lucide-react'

import { CircleAvatar } from '#/components/dashboard/circle-avatar'
import { DetailPanel } from '#/components/dashboard/detail-panel'
import { PanelFilterDropdown } from '#/components/dashboard/panel-filter-dropdown'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

const admins = [
  { name: 'Jide Kosoko', color: '#93C5FD' },
  { name: 'Jibike Alarape', color: '#A5B4FC' },
  { name: 'Desmond Tutu', color: '#FCA5A5' },
  { name: 'Baba Kaothat', color: '#67E8F9' },
  { name: 'Oladejo israel', color: '#F9A8D4' },
]

type ActivityItem = {
  icon: typeof Bell
  bg: string
  text: string
  time: string
  person: string
  personColor: string
}

const activityGroups: { label: string; items: ActivityItem[] }[] = [
  {
    label: 'Today',
    items: [
      {
        icon: Bell,
        bg: '#00359E',
        text: 'Created a new new property',
        time: '15 mins ago',
        person: 'Nneka Chukwu',
        personColor: '#C4B5FD',
      },
      {
        icon: UserPlus,
        bg: '#134E48',
        text: 'Added a new team member',
        time: '15 mins ago',
        person: 'Jide Kosoko',
        personColor: '#93C5FD',
      },
      {
        icon: UserPlus,
        bg: '#134E48',
        text: 'Added a new team member',
        time: '15 mins ago',
        person: 'Damilare Usman',
        personColor: '#FDBA74',
      },
      {
        icon: UserCheck,
        bg: '#851651',
        text: 'Updated your profile',
        time: '15 mins ago',
        person: 'Desmond Tutu',
        personColor: '#FCA5A5',
      },
      {
        icon: Trash2,
        bg: '#7A271A',
        text: 'Deleted a property',
        time: '15 mins ago',
        person: 'Adebayo Salami',
        personColor: '#86EFAC',
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        icon: Bell,
        bg: '#00359E',
        text: 'Created a new new property',
        time: '15 mins ago',
        person: 'Oladejo israel',
        personColor: '#F9A8D4',
      },
      {
        icon: UserPlus,
        bg: '#134E48',
        text: 'Added a new team member',
        time: '15 mins ago',
        person: 'Baba Kaothat',
        personColor: '#67E8F9',
      },
      {
        icon: UserPlus,
        bg: '#134E48',
        text: 'Added a new team member',
        time: '15 mins ago',
        person: 'Nneka Chukwu',
        personColor: '#C4B5FD',
      },
    ],
  },
  {
    label: 'August 24',
    items: [
      {
        icon: UserPlus,
        bg: '#134E48',
        text: 'Added a new team member',
        time: '15 mins ago',
        person: 'Nneka Chukwu',
        personColor: '#C4B5FD',
      },
      {
        icon: UserCheck,
        bg: '#851651',
        text: 'Updated your profile',
        time: '15 mins ago',
        person: 'Nneka Chukwu',
        personColor: '#C4B5FD',
      },
      {
        icon: Trash2,
        bg: '#7A271A',
        text: 'Deleted a property',
        time: '15 mins ago',
        person: 'Nneka Chukwu',
        personColor: '#C4B5FD',
      },
    ],
  },
]

function AdminFilterDropdown({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (name: string) => void
}) {
  const [search, setSearch] = useState('')
  const selectedAdmin = admins.find((admin) => admin.name === selected)
  const filtered = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg border border-[#31353F] bg-white p-1.5 text-[12px] font-normal text-[#0A0D14] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
        >
          {selectedAdmin ? (
            <CircleAvatar name={selectedAdmin.name} color={selectedAdmin.color} size={20} />
          ) : (
            <UserRound className="size-5 text-[#525866]" strokeWidth={1.75} />
          )}
          <span className="px-0.5">{selectedAdmin ? selectedAdmin.name : 'Filter by Admin'}</span>
          <ChevronDown className="size-5" strokeWidth={1.75} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[154px] gap-2 rounded-lg p-2.5">
        <p className="px-1 pb-2 text-[12px] font-semibold text-[#20232D]">Select Admin</p>
        <div className="mb-1 flex items-center gap-1.5 rounded-lg border border-[#E2E4E9] px-3 py-2 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
          <Search className="size-5 shrink-0 text-[#868C98]" strokeWidth={1.75} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full text-[14px] text-[#0A0D14] outline-none placeholder:text-[#868C98]"
          />
        </div>
        {filtered.map((admin) => (
          <DropdownMenuItem
            key={admin.name}
            onSelect={() => onSelect(admin.name)}
            className="gap-1.5 py-1 text-[12px] text-[#0A0D14]"
          >
            <CircleAvatar name={admin.name} color={admin.color} size={20} />
            {admin.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AllActivitiesPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [dateFilter, setDateFilter] = useState('All Time')
  const [admin, setAdmin] = useState<string | null>(null)

  const groups =
    admin === null
      ? activityGroups
      : activityGroups
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => item.person === admin),
          }))
          .filter((group) => group.items.length > 0)

  return (
    <DetailPanel
      open={open}
      onClose={onClose}
      title="All Activities"
      headerRight={
        <div className="flex items-center gap-2">
          <AdminFilterDropdown selected={admin} onSelect={setAdmin} />
          <PanelFilterDropdown
            label={dateFilter}
            options={['All Time', 'Today', '1 Week', '2 Week', 'Last Month', 'Custom']}
            onSelect={setDateFilter}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-4 pb-4">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">
              {group.label}
            </p>
            <div className="flex flex-col">
              {group.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 border-b border-[#F9FAFB] pt-3 pb-2 last:border-b-0"
                  >
                    <div
                      className="flex items-center justify-center rounded-full p-2"
                      style={{ backgroundColor: item.bg }}
                    >
                      <Icon className="size-4 text-white" strokeWidth={1.75} />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]">
                        {item.text}
                      </p>
                      <p className="text-[12px] text-[#525866]">{item.time}</p>
                      <div className="flex items-center gap-1.5 py-2">
                        <CircleAvatar name={item.person} color={item.personColor} size={20} />
                        <p className="text-[12px] text-[#0A0D14]">{item.person}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="py-8 text-center text-[14px] text-[#525866]">
            No activity found for this filter.
          </p>
        )}
      </div>
    </DetailPanel>
  )
}
