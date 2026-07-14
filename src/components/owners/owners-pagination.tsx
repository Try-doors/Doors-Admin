import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const pages = [1, 2, 3, '...', 8, 9, 10] as const

export function OwnersPagination({ total }: { total: number }) {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-[12px] text-[#525866]">
        <span>Showing</span>
        <button
          type="button"
          className="flex h-6 items-center gap-1 rounded-md border border-[#E2E4E9] bg-white px-1.5 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
        >
          10
          <ChevronDown className="size-3" strokeWidth={2} />
        </button>
        <span>owners out {total} users</span>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="flex items-center justify-center rounded-full border border-[#E2E4E9] bg-white p-1.5 shadow-[0px_1px_1px_0px_rgba(82,88,102,0.06)]"
        >
          <ChevronLeft className="size-5 text-[#31353F]" strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-0.5">
          {pages.map((page, index) =>
            page === '...' ? (
              <div
                key={`ellipsis-${index}`}
                className="flex size-8 items-center justify-center rounded-lg text-[14px] font-medium text-[#475467]"
              >
                ...
              </div>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={
                  'flex size-8 items-center justify-center rounded-lg text-[14px] font-medium ' +
                  (currentPage === page
                    ? 'border border-[#E2E4E9] bg-white text-[#0A0D14] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]'
                    : 'text-[#475467] hover:bg-[#F6F8FA]')
                }
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          onClick={() => setCurrentPage((p) => p + 1)}
          className="flex items-center justify-center rounded-full border border-[#E2E4E9] bg-white p-1.5 shadow-[0px_1px_1px_0px_rgba(82,88,102,0.06)]"
        >
          <ChevronRight className="size-5 text-[#31353F]" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}
