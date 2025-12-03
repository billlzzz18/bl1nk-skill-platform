'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface SkillVersion {
  id: string
  version: number
  content: string
  createdAt: Date
}

interface VersionHistoryProps {
  skillId: string
  currentVersion: number
  versions: SkillVersion[]
  onRestore: (version: number) => Promise<void>
  onClose: () => void
}

export function VersionHistory({
  skillId,
  currentVersion,
  versions,
  onRestore,
  onClose,
}: VersionHistoryProps) {
  const [restoring, setRestoring] = useState<number | null>(null)

  const handleRestore = async (version: number) => {
    if (!confirm(`Restore to version ${version}? This will create a new version.`)) {
      return
    }

    setRestoring(version)
    try {
      await onRestore(version)
    } finally {
      setRestoring(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-lg bg-gray-800 p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Version History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="max-h-96 space-y-2 overflow-y-auto">
          {versions.map((v) => (
            <div
              key={v.id}
              className={`rounded border p-3 ${
                v.version === currentVersion
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 bg-gray-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Version {v.version}</span>
                  {v.version === currentVersion && (
                    <span className="ml-2 text-xs text-blue-400">(Current)</span>
                  )}
                  <p className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(v.createdAt), { addSuffix: true })}
                  </p>
                </div>

                {v.version !== currentVersion && (
                  <button
                    onClick={() => handleRestore(v.version)}
                    disabled={restoring !== null}
                    className="rounded bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    {restoring === v.version ? 'Restoring...' : 'Restore'}
                  </button>
                )}
              </div>

              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-white">
                  View content
                </summary>
                <pre className="mt-2 max-h-32 overflow-auto rounded bg-gray-950 p-2 text-xs">
                  {v.content}
                </pre>
              </details>
            </div>
          ))}

          {versions.length === 0 && (
            <p className="py-8 text-center text-gray-400">No version history available</p>
          )}
        </div>
      </div>
    </div>
  )
}
