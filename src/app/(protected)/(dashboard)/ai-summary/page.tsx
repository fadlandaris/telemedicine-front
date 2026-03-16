  "use client"

  import { useState } from "react"
  import PageBreadcrumb from "@/components/dashboard/common/PageBreadCrumb"
  import Button from "@/components/dashboard/ui/button/Button"
  import { DownloadIcon, PlusIcon } from "@phosphor-icons/react"
  import { useCreateRoom } from "@/hooks/useCreateRoom"

  export const filterData = [
    {
      title: "All",
      value: "all",
      count: 14
    },
    {
      title: "Completed",
      value: "completed",
      count: 3
    },
    {
      title: "In Progress",
      value: "in-progress",
      count: 4
    },
    {
      title: "Failed",
      value: "failed",
      count: 4
    },
  ]

  const CreateRoomButton: React.FC = () => {
    const { handleCreateRoom, isCreating } = useCreateRoom()

    return (
      <Button
        onClick={handleCreateRoom}
        startIcon={<PlusIcon weight="bold" />}
        disabled={isCreating}
      >
        {isCreating ? "Creating..." : "Create Room"}
      </Button>
    );
  }

  const kanbanColumns = [
    {
      title: "To Do",
      count: 3,
      tone: "bg-blue-50 text-blue-600",
      tasks: [
        {
          id: "todo-1",
          title: "Finish user onboarding",
          date: "Tomorrow",
          comments: 1,
          tag: { label: "Development", tone: "bg-orange-50 text-orange-600" },
          assignee: { initials: "AM", tone: "bg-blue-100 text-blue-700" }
        },
        {
          id: "todo-2",
          title: "Solve prioritization issue with the team",
          date: "Jan 08, 2027",
          comments: 1,
          tag: { label: "Marketing", tone: "bg-indigo-50 text-indigo-600" },
          assignee: { initials: "JR", tone: "bg-indigo-100 text-indigo-700" }
        },
        {
          id: "todo-3",
          title: "Change license and remove products",
          date: "Jan 11, 2027",
          comments: 2,
          tag: { label: "Legal", tone: "bg-gray-100 text-gray-600" },
          assignee: { initials: "KS", tone: "bg-gray-100 text-gray-700" }
        },
      ],
    },
    {
      title: "In Progress",
      count: 4,
      tone: "bg-yellow-50 text-yellow-600",
      tasks: [
        {
          id: "progress-1",
          title: "Work in progress (WIP) Dashboard",
          date: "Today",
          comments: 1,
          tag: { label: "Development", tone: "bg-gray-100 text-gray-600" },
          assignee: { initials: "NT", tone: "bg-yellow-100 text-yellow-700" }
        },
        {
          id: "progress-2",
          title: "Kanban manager",
          date: "Jan 08, 2027",
          comments: 8,
          tag: { label: "Template", tone: "bg-green-50 text-green-600" },
          assignee: { initials: "AL", tone: "bg-green-100 text-green-700" }
        },
        {
          id: "progress-3",
          title: "Product Update - Q4 (2024)",
          date: "Jan 12, 2027",
          comments: 3,
          tag: { label: "Design", tone: "bg-pink-50 text-pink-600" },
          assignee: { initials: "ME", tone: "bg-pink-100 text-pink-700" }
        },
        {
          id: "progress-4",
          title: "Final QA checklist",
          date: "Jan 14, 2027",
          comments: 2,
          tag: { label: "QA", tone: "bg-sky-50 text-sky-600" },
          assignee: { initials: "TS", tone: "bg-sky-100 text-sky-700" }
        },
      ],
    },
    {
      title: "Completed",
      count: 4,
      tone: "bg-green-50 text-green-600",
      tasks: [
        {
          id: "done-1",
          title: "Manage internal feedback",
          date: "Tomorrow",
          comments: 1,
          tag: { label: "Dev", tone: "bg-gray-100 text-gray-600" },
          assignee: { initials: "SR", tone: "bg-gray-100 text-gray-700" }
        },
        {
          id: "done-2",
          title: "React Native + Flutter R&D",
          date: "Jan 08, 2027",
          comments: 1,
          tag: { label: "Development", tone: "bg-orange-50 text-orange-600" },
          assignee: { initials: "FD", tone: "bg-orange-100 text-orange-700" }
        },
        {
          id: "done-3",
          title: "Design marketing assets",
          date: "Jan 10, 2027",
          comments: 2,
          tag: { label: "Marketing", tone: "bg-indigo-50 text-indigo-600" },
          assignee: { initials: "OP", tone: "bg-indigo-100 text-indigo-700" }
        },
        {
          id: "done-4",
          title: "Update release notes",
          date: "Jan 12, 2027",
          comments: 1,
          tag: { label: "Product", tone: "bg-purple-50 text-purple-600" },
          assignee: { initials: "YW", tone: "bg-purple-100 text-purple-700" }
        },
      ],
    },
  ]

  const AiSummary = () => {
    const [activeFilter, setActiveFilter] = useState(filterData[0]?.value ?? "")

    return (
      <main>
        <PageBreadcrumb pageTitle={"AI Summary"}/>
        <div className="border bg-white border border-gray-200 rounded-xl">
          <div className="flex items-start justify-between p-6">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#f2f4f7] p-0.5 text-sm">
              {filterData.map((item, i) => {
                const color = [
                  'bg-brand-50 text-primary',
                  "bg-green-50 text-green-600",
                  "bg-yellow-50 text-yellow-600",
                  "bg-red-50 text-red-600"
                ]
                const isActive = activeFilter === item.value
                return (
                  <button
                    key={i}
                    onClick={() => setActiveFilter(item.value)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium border transition-all duration-200  ${
                      isActive
                        ? "bg-white text-gray-900 shadow-theme-xs border-gray-200"
                        : "text-gray-600 hover:text-gray-800 border-transparent"
                    }`}
                  >
                    <span>{item.title}</span>
                    <span
                      className={`flex min-w-[1.5rem] items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isActive
                          ? `${color[i]}`
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-3 ">
              <Button variant="outline" startIcon={<DownloadIcon />}>
                Filter & Short
              </Button>
              <CreateRoomButton/>
            </div>
          </div>
          <div className="grid gap-6 border-t border-gray-100 p-6 lg:grid-cols-3">
            {kanbanColumns.map((column) => (
              <div key={column.title} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {column.title}
                    </h3>
                    <span
                      className={`flex min-w-[1.5rem] items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${column.tone}`}
                    >
                      {column.count}
                    </span>
                  </div>
                  <button className="rounded-full px-2 text-gray-400 hover:text-gray-600">
                    ...
                  </button>
                </div>

                <div className="space-y-4">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-gray-900">
                          {task.title}
                        </p>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${task.assignee.tone}`}
                        >
                          {task.assignee.initials}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-2">
                          <span className="inline-block h-3 w-3 rounded-sm border border-gray-300" />
                          {task.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="inline-block h-3 w-3 rounded-full border border-gray-300" />
                          {task.comments}
                        </span>
                      </div>

                      <div className="mt-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${task.tag.tone}`}
                        >
                          {task.tag.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  export default AiSummary
