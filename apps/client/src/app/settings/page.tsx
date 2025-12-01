"use client"

/**
 * Settings Page
 *
 * Manage API credentials for:
 * - AWS Bedrock (Claude via AWS)
 * - OpenRouter (Claude via OpenRouter)
 *
 * Features:
 * - Provider selection tabs
 * - Credential forms with validation
 * - Test connection functionality
 * - Masked display of saved credentials
 */

import { useState, useEffect } from "react"
import Link from "next/link"
import { trpc } from "@/trpc/client"
import { cn } from "@/lib/utils"
import type { Provider } from "@claude-builder/shared"

type ProviderTab = Provider

interface BedrockFormData {
  name: string
  accessKeyId: string
  secretAccessKey: string
  region: string
}

interface OpenRouterFormData {
  name: string
  apiKey: string
}

const AWS_REGIONS = [
  "us-east-1",
  "us-east-2",
  "us-west-2",
  "eu-west-1",
  "eu-west-2",
  "eu-central-1",
  "ap-northeast-1",
  "ap-southeast-1",
  "ap-southeast-2",
]

export default function SettingsPage() {
  // Tab state
  const [activeTab, setActiveTab] = useState<ProviderTab>("bedrock")

  // Form state
  const [bedrockForm, setBedrockForm] = useState<BedrockFormData>({
    name: "My AWS Bedrock",
    accessKeyId: "",
    secretAccessKey: "",
    region: "us-east-1",
  })

  const [openRouterForm, setOpenRouterForm] = useState<OpenRouterFormData>({
    name: "My OpenRouter",
    apiKey: "",
  })

  // Status state
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  // tRPC queries
  const settingsQuery = trpc.settings.getAll.useQuery()
  const bedrockCredQuery = trpc.credential.getByProvider.useQuery(
    { provider: "bedrock" },
    { refetchOnWindowFocus: false }
  )
  const openRouterCredQuery = trpc.credential.getByProvider.useQuery(
    { provider: "openrouter" },
    { refetchOnWindowFocus: false }
  )

  // tRPC mutations
  const saveMutation = trpc.credential.save.useMutation({
    onSuccess: () => {
      bedrockCredQuery.refetch()
      openRouterCredQuery.refetch()
      settingsQuery.refetch()
      setTestResult({ success: true, message: "Credentials saved successfully!" })
    },
    onError: (error) => {
      setTestResult({ success: false, message: error.message })
    },
  })

  const deleteMutation = trpc.credential.delete.useMutation({
    onSuccess: () => {
      bedrockCredQuery.refetch()
      openRouterCredQuery.refetch()
      settingsQuery.refetch()
      setTestResult({ success: true, message: "Credentials deleted" })
      // Clear the form
      if (activeTab === "bedrock") {
        setBedrockForm({
          name: "My AWS Bedrock",
          accessKeyId: "",
          secretAccessKey: "",
          region: "us-east-1",
        })
      } else {
        setOpenRouterForm({
          name: "My OpenRouter",
          apiKey: "",
        })
      }
    },
    onError: (error) => {
      setTestResult({ success: false, message: error.message })
    },
  })

  const testMutation = trpc.credential.test.useMutation({
    onSuccess: (result) => {
      setTestResult({ success: true, message: result.message })
    },
    onError: (error) => {
      setTestResult({ success: false, message: error.message })
    },
  })

  const setActiveMutation = trpc.settings.updateMany.useMutation({
    onSuccess: () => {
      settingsQuery.refetch()
      setTestResult({ success: true, message: "Active provider updated!" })
    },
    onError: (error) => {
      setTestResult({ success: false, message: error.message })
    },
  })

  // Clear test result when tab changes
  useEffect(() => {
    setTestResult(null)
  }, [activeTab])

  // Handlers
  const handleSaveBedrock = async () => {
    if (!bedrockForm.accessKeyId || !bedrockForm.secretAccessKey || !bedrockForm.region) {
      setTestResult({ success: false, message: "Please fill in all required fields" })
      return
    }

    await saveMutation.mutateAsync({
      provider: "bedrock",
      name: bedrockForm.name,
      accessKeyId: bedrockForm.accessKeyId,
      secretAccessKey: bedrockForm.secretAccessKey,
      region: bedrockForm.region,
    })
  }

  const handleSaveOpenRouter = async () => {
    if (!openRouterForm.apiKey) {
      setTestResult({ success: false, message: "Please enter your API key" })
      return
    }

    await saveMutation.mutateAsync({
      provider: "openrouter",
      name: openRouterForm.name,
      apiKey: openRouterForm.apiKey,
    })
  }

  const handleDelete = async (provider: Provider) => {
    if (!confirm(`Are you sure you want to delete ${provider} credentials?`)) {
      return
    }
    await deleteMutation.mutateAsync({ provider })
  }

  const handleTest = async (provider: Provider) => {
    setTestResult(null)
    await testMutation.mutateAsync({ provider })
  }

  const handleSetActive = async (provider: Provider) => {
    await setActiveMutation.mutateAsync({ activeProvider: provider })
  }

  const isSaving = saveMutation.isPending
  const isDeleting = deleteMutation.isPending
  const isTesting = testMutation.isPending
  const isSettingActive = setActiveMutation.isPending

  const activeProvider = settingsQuery.data?.activeProvider
  const hasBedrockCreds = !!bedrockCredQuery.data
  const hasOpenRouterCreds = !!openRouterCredQuery.data

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Skills
            </Link>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
          {activeProvider && (
            <div className="text-sm text-gray-400">
              Active Provider:{" "}
              <span className="text-green-400 font-medium capitalize">
                {activeProvider}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Provider Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("bedrock")}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              activeTab === "bedrock"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            )}
          >
            AWS Bedrock
            {hasBedrockCreds && (
              <span className="ml-2 text-xs bg-green-600 px-1.5 py-0.5 rounded">
                Configured
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("openrouter")}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              activeTab === "openrouter"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            )}
          >
            OpenRouter
            {hasOpenRouterCreds && (
              <span className="ml-2 text-xs bg-green-600 px-1.5 py-0.5 rounded">
                Configured
              </span>
            )}
          </button>
        </div>

        {/* Status Message */}
        {testResult && (
          <div
            className={cn(
              "mb-6 p-4 rounded-lg",
              testResult.success
                ? "bg-green-900/30 border border-green-700 text-green-300"
                : "bg-red-900/30 border border-red-700 text-red-300"
            )}
          >
            {testResult.message}
          </div>
        )}

        {/* Bedrock Form */}
        {activeTab === "bedrock" && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">AWS Bedrock Configuration</h2>
              <p className="text-gray-400 text-sm">
                Configure your AWS credentials to use Claude via AWS Bedrock.
                Make sure your IAM user has the{" "}
                <code className="bg-gray-700 px-1 rounded">bedrock:InvokeModel</code>{" "}
                permission.
              </p>
            </div>

            {/* Show masked credentials if configured */}
            {bedrockCredQuery.data && (
              <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Current Credentials</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Access Key:</span>{" "}
                    <code className="text-gray-300">
                      {bedrockCredQuery.data.maskedData?.accessKeyId || "****"}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-500">Region:</span>{" "}
                    <code className="text-gray-300">
                      {bedrockCredQuery.data.maskedData?.region || "****"}
                    </code>
                  </div>
                </div>
                {activeProvider === "bedrock" ? (
                  <div className="mt-2 text-green-400 text-xs">✓ Active provider</div>
                ) : (
                  <button
                    onClick={() => handleSetActive("bedrock")}
                    disabled={isSettingActive}
                    className="mt-2 text-blue-400 hover:text-blue-300 text-xs underline"
                  >
                    Set as active provider
                  </button>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Credential Name
                </label>
                <input
                  type="text"
                  value={bedrockForm.name}
                  onChange={(e) =>
                    setBedrockForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="My AWS Bedrock"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  AWS Access Key ID *
                </label>
                <input
                  type="text"
                  value={bedrockForm.accessKeyId}
                  onChange={(e) =>
                    setBedrockForm((prev) => ({ ...prev, accessKeyId: e.target.value }))
                  }
                  placeholder="AKIA..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  AWS Secret Access Key *
                </label>
                <input
                  type="password"
                  value={bedrockForm.secretAccessKey}
                  onChange={(e) =>
                    setBedrockForm((prev) => ({
                      ...prev,
                      secretAccessKey: e.target.value,
                    }))
                  }
                  placeholder="Enter your secret key"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  AWS Region *
                </label>
                <select
                  value={bedrockForm.region}
                  onChange={(e) =>
                    setBedrockForm((prev) => ({ ...prev, region: e.target.value }))
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  {AWS_REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveBedrock}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {isSaving ? "Saving..." : "Save Credentials"}
              </button>

              {hasBedrockCreds && (
                <>
                  <button
                    onClick={() => handleTest("bedrock")}
                    disabled={isTesting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {isTesting ? "Testing..." : "Test Connection"}
                  </button>

                  <button
                    onClick={() => handleDelete("bedrock")}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* OpenRouter Form */}
        {activeTab === "openrouter" && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">OpenRouter Configuration</h2>
              <p className="text-gray-400 text-sm">
                Configure your OpenRouter API key to use Claude via OpenRouter.
                Get your API key from{" "}
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  openrouter.ai/keys
                </a>
              </p>
            </div>

            {/* Show masked credentials if configured */}
            {openRouterCredQuery.data && (
              <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Current Credentials</div>
                <div className="text-sm">
                  <span className="text-gray-500">API Key:</span>{" "}
                  <code className="text-gray-300">
                    {openRouterCredQuery.data.maskedData?.apiKey || "****"}
                  </code>
                </div>
                {activeProvider === "openrouter" ? (
                  <div className="mt-2 text-green-400 text-xs">✓ Active provider</div>
                ) : (
                  <button
                    onClick={() => handleSetActive("openrouter")}
                    disabled={isSettingActive}
                    className="mt-2 text-blue-400 hover:text-blue-300 text-xs underline"
                  >
                    Set as active provider
                  </button>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Credential Name
                </label>
                <input
                  type="text"
                  value={openRouterForm.name}
                  onChange={(e) =>
                    setOpenRouterForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="My OpenRouter"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  API Key *
                </label>
                <input
                  type="password"
                  value={openRouterForm.apiKey}
                  onChange={(e) =>
                    setOpenRouterForm((prev) => ({ ...prev, apiKey: e.target.value }))
                  }
                  placeholder="sk-or-v1-..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveOpenRouter}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {isSaving ? "Saving..." : "Save Credentials"}
              </button>

              {hasOpenRouterCreds && (
                <>
                  <button
                    onClick={() => handleTest("openrouter")}
                    disabled={isTesting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {isTesting ? "Testing..." : "Test Connection"}
                  </button>

                  <button
                    onClick={() => handleDelete("openrouter")}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Need help?</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>
              • <strong>AWS Bedrock</strong>: Make sure Claude models are enabled in your AWS Bedrock console
            </li>
            <li>
              • <strong>OpenRouter</strong>: Create an account and generate an API key at openrouter.ai
            </li>
            <li>
              • <strong>Testing</strong>: Use the "Test Connection" button to verify your credentials work
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
