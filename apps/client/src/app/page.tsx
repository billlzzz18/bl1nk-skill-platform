"use client"

/**
 * Claude Skill Builder - Main Page
 *
 * Split view with:
 * - Left: Sidebar with skill list
 * - Center: Monaco code editor for skill content
 * - Right: Chat panel for testing skills
 */

import { useState, useCallback, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { trpc } from "@/trpc/client"
import { cn } from "@/lib/utils"
import { VersionHistory } from "@/components/skill/VersionHistory"

// Dynamic import Monaco to avoid SSR issues
const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  { ssr: false, loading: () => <div className="flex-1 bg-gray-800 animate-pulse" /> }
)

interface SkillFormData {
  name: string
  description: string
  content: string
  isPublic: boolean
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

const defaultSkillContent = `# My Skill

A brief description of what this skill does.

## Instructions

Detailed instructions for Claude on how to use this skill.

## Examples

\`\`\`
Example usage or prompts
\`\`\`
`

export default function SkillBuilderPage() {
  // Skill Editor State
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
  const [formData, setFormData] = useState<SkillFormData>({
    name: "",
    description: "",
    content: defaultSkillContent,
    isPublic: false,
  })
  const [isDirty, setIsDirty] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [showChat, setShowChat] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Version History State
  const [showVersionHistory, setShowVersionHistory] = useState(false)

  // tRPC queries
  const skillsQuery = trpc.skill.list.useQuery({
    search: searchQuery || undefined,
    sortBy: "updatedAt",
    sortOrder: "desc",
    limit: 100,
  })

  const selectedSkillQuery = trpc.skill.getById.useQuery(
    { id: selectedSkillId! },
    { enabled: !!selectedSkillId }
  )

  const chatStatusQuery = trpc.chat.status.useQuery()

  const versionsQuery = trpc.skill.getVersions.useQuery(
    { skillId: selectedSkillId!, limit: 10 },
    { enabled: !!selectedSkillId && showVersionHistory }
  )

  // tRPC mutations
  const createMutation = trpc.skill.create.useMutation({
    onSuccess: (newSkill) => {
      setSelectedSkillId(newSkill.id)
      setIsDirty(false)
      skillsQuery.refetch()
    },
  })

  const updateMutation = trpc.skill.update.useMutation({
    onSuccess: () => {
      setIsDirty(false)
      skillsQuery.refetch()
    },
  })

  const deleteMutation = trpc.skill.delete.useMutation({
    onSuccess: () => {
      setSelectedSkillId(null)
      resetForm()
      skillsQuery.refetch()
    },
  })

  const chatMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (response) => {
      setChatMessages((prev) => [...prev, response])
    },
    onError: (error) => {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${error.message}` },
      ])
    },
  })

  const restoreVersionMutation = trpc.skill.restoreVersion.useMutation({
    onSuccess: () => {
      selectedSkillQuery.refetch()
      skillsQuery.refetch()
      setShowVersionHistory(false)
    },
  })

  // Load selected skill into form
  useEffect(() => {
    if (selectedSkillQuery.data) {
      setFormData({
        name: selectedSkillQuery.data.name,
        description: selectedSkillQuery.data.description || "",
        content: selectedSkillQuery.data.content,
        isPublic: selectedSkillQuery.data.isPublic,
      })
      setIsDirty(false)
    }
  }, [selectedSkillQuery.data])

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Handlers
  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      content: defaultSkillContent,
      isPublic: false,
    })
    setIsDirty(false)
    setChatMessages([])
  }, [])

  const handleNewSkill = useCallback(() => {
    setSelectedSkillId(null)
    resetForm()
  }, [resetForm])

  const handleFieldChange = useCallback((field: keyof SkillFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setIsDirty(true)
  }, [])

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      handleFieldChange("content", value)
    }
  }, [handleFieldChange])

  const handleSave = useCallback(async () => {
    if (!formData.name.trim()) {
      alert("Please enter a skill name")
      return
    }

    if (!formData.content.trim()) {
      alert("Please enter skill content")
      return
    }

    try {
      if (selectedSkillId) {
        await updateMutation.mutateAsync({
          id: selectedSkillId,
          name: formData.name,
          description: formData.description || null,
          content: formData.content,
          isPublic: formData.isPublic,
        })
      } else {
        await createMutation.mutateAsync({
          name: formData.name,
          description: formData.description || undefined,
          content: formData.content,
        })
      }
    } catch (error) {
      console.error("Save failed:", error)
      alert("Failed to save skill. Check console for details.")
    }
  }, [formData, selectedSkillId, createMutation, updateMutation])

  const handleDelete = useCallback(async () => {
    if (!selectedSkillId) return
    if (!confirm("Are you sure you want to delete this skill?")) return

    try {
      await deleteMutation.mutateAsync({ id: selectedSkillId })
    } catch (error) {
      console.error("Delete failed:", error)
      alert("Failed to delete skill. Check console for details.")
    }
  }, [selectedSkillId, deleteMutation])

  const handleSendChat = useCallback(async () => {
    if (!chatInput.trim()) return
    if (!formData.content.trim()) {
      alert("Please add skill content first")
      return
    }

    const userMessage = chatInput.trim()
    setChatInput("")
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])

    await chatMutation.mutateAsync({
      skillContent: formData.content,
      messages: chatMessages,
      userMessage,
    })
  }, [chatInput, formData.content, chatMessages, chatMutation])

  const handleClearChat = useCallback(() => {
    setChatMessages([])
  }, [])

  const handleRestoreVersion = useCallback(async (version: number) => {
    if (!selectedSkillId) return
    await restoreVersionMutation.mutateAsync({ skillId: selectedSkillId, version })
  }, [selectedSkillId, restoreVersionMutation])

  const isSaving = createMutation.isPending || updateMutation.isPending
  const isDeleting = deleteMutation.isPending
  const isChatting = chatMutation.isPending

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Skill List */}
      <aside className="w-64 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold mb-3">Claude Skills</h1>
          <button
            onClick={handleNewSkill}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            + New Skill
          </button>
        </div>

        <div className="p-3 border-b border-gray-700">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {skillsQuery.isLoading ? (
            <div className="p-4 text-gray-400 text-center">Loading...</div>
          ) : skillsQuery.data?.items.length === 0 ? (
            <div className="p-4 text-gray-400 text-center text-sm">
              {searchQuery ? "No skills match" : "No skills yet"}
            </div>
          ) : (
            skillsQuery.data?.items.map((skill) => (
              <button
                key={skill.id}
                onClick={() => setSelectedSkillId(skill.id)}
                className={cn(
                  "w-full text-left p-3 border-b border-gray-800 hover:bg-gray-800 transition-colors",
                  selectedSkillId === skill.id && "bg-gray-800 border-l-2 border-l-blue-500"
                )}
              >
                <div className="font-medium truncate text-sm">{skill.name}</div>
                <div className="text-xs text-gray-500 mt-1">v{skill.version}</div>
              </button>
            ))
          )}
        </div>

        {/* Settings Link */}
        <div className="p-3 border-t border-gray-700">
          <Link
            href="/settings"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content - Editor */}
      <main className={cn("flex-1 flex flex-col", showChat && "border-r border-gray-700")}>
        {/* Toolbar */}
        <header className="flex items-center justify-between p-3 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              placeholder="Skill name"
              className="bg-transparent text-lg font-semibold border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 w-64"
            />
            {isDirty && (
              <span className="text-xs bg-yellow-600 text-white px-2 py-0.5 rounded">Unsaved</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedSkillId && (
              <button
                onClick={() => setShowVersionHistory(true)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 py-1.5 px-3 rounded-lg text-sm font-medium transition-colors"
                title="View version history"
              >
                History
              </button>
            )}

            <button
              onClick={() => setShowChat(!showChat)}
              className={cn(
                "py-1.5 px-3 rounded-lg text-sm font-medium transition-colors",
                showChat ? "bg-purple-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-gray-200"
              )}
            >
              {showChat ? "Hide Chat" : "Test Chat"}
            </button>

            {selectedSkillId && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors"
              >
                {isDeleting ? "..." : "Delete"}
              </button>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving || !formData.name.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white py-1.5 px-3 rounded-lg text-sm font-medium transition-colors"
            >
              {isSaving ? "..." : selectedSkillId ? "Save" : "Create"}
            </button>
          </div>
        </header>

        {/* Description */}
        <div className="px-4 py-2 border-b border-gray-700">
          <input
            type="text"
            value={formData.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            placeholder="Brief description (optional)"
            className="w-full bg-transparent text-gray-300 border-none focus:outline-none text-sm"
          />
        </div>

        {/* Monaco Editor */}
        <div className="flex-1">
          <MonacoEditor
            height="100%"
            defaultLanguage="markdown"
            theme="vs-dark"
            value={formData.content}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16 },
            }}
          />
        </div>
      </main>

      {/* Chat Panel */}
      {showChat && (
        <aside className="w-96 flex flex-col bg-gray-850">
          {/* Chat Header */}
          <div className="p-3 border-b border-gray-700 flex items-center justify-between">
            <h2 className="font-semibold">Test Chat</h2>
            <button
              onClick={handleClearChat}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Chat Status */}
          {chatStatusQuery.data && !chatStatusQuery.data.ready && (
            <div className="p-3 bg-yellow-900/30 border-b border-yellow-700/50 text-sm text-yellow-200">
              {"reason" in chatStatusQuery.data ? chatStatusQuery.data.reason : "Configure API credentials"}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-8">
                Send a message to test your skill
              </div>
            ) : (
              chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 rounded-lg text-sm",
                    msg.role === "user"
                      ? "bg-blue-600/20 ml-8"
                      : "bg-gray-700/50 mr-8"
                  )}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.role === "user" ? "You" : "Assistant"}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              ))
            )}
            {isChatting && (
              <div className="bg-gray-700/50 mr-8 p-3 rounded-lg text-sm">
                <div className="text-xs text-gray-400 mb-1">Assistant</div>
                <div className="animate-pulse">Thinking...</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendChat()}
                placeholder="Type a message..."
                disabled={isChatting || !chatStatusQuery.data?.ready}
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <button
                onClick={handleSendChat}
                disabled={isChatting || !chatInput.trim() || !chatStatusQuery.data?.ready}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Version History Modal */}
      {showVersionHistory && selectedSkillId && selectedSkillQuery.data && (
        <VersionHistory
          skillId={selectedSkillId}
          currentVersion={selectedSkillQuery.data.version}
          versions={versionsQuery.data || []}
          onRestore={handleRestoreVersion}
          onClose={() => setShowVersionHistory(false)}
        />
      )}
    </div>
  )
}
