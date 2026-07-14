import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { FilterChip, ViewAllButton } from '#/components/dashboard/filter-chip'
import { TrendBadge } from '#/components/dashboard/trend-badge'

type Agent = {
  name: string
  count: number
  color: string
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}

const purchaseAgents: Agent[] = [
  { name: 'Adebayo Salami', count: 240, color: '#93C5FD' },
  { name: 'Nneka Chukwu', count: 240, color: '#C4B5FD' },
  { name: 'Desmond Tutu', count: 240, color: '#525866' },
  { name: 'Adegboyoga Precious', count: 240, color: '#F9A8D4' },
  { name: 'Jide Kosoko', count: 240, color: '#FDBA74' },
]

function AgentList({ agents }: { agents: Agent[] }) {
  return (
    <div className="flex flex-col">
      {agents.map((agent) => (
        <div
          key={agent.name}
          className="flex items-center gap-2 border-b border-[#F6F8FA] px-3 py-2 last:border-b-0"
        >
          <div className="flex flex-1 items-center gap-1.5">
            <Avatar>
              <AvatarFallback
                style={{ backgroundColor: agent.color }}
                className="text-[12px] font-medium text-white"
              >
                {initials(agent.name)}
              </AvatarFallback>
            </Avatar>
            <p className="truncate text-[14px] tracking-[-0.084px] text-[#0A0D14]">
              {agent.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-medium tracking-[-0.084px] text-black">
              {agent.count}
            </p>
            <TrendBadge direction="up" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function TopAgentsCard({ onViewAll }: { onViewAll?: () => void }) {
  return (
    <div className="flex h-[408px] w-[348px] shrink-0 flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">Top Agents</p>
        <FilterChip label="All Time" />
      </div>
      <AgentList agents={purchaseAgents} />
      <ViewAllButton onClick={onViewAll} />
    </div>
  )
}
