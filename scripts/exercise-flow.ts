import { appRouter } from '../apps/server/src/routers/_app'
import { prisma } from '../apps/server/src/db/client'

async function main() {
  const caller = appRouter.createCaller({
    req: {} as any,
    res: {} as any,
    prisma,
  })

  const skill = await caller.skill.create({
    name: 'CLI Flow Skill',
    description: 'Created via automated flow',
    content: '# Flow Test\n\nTesting create endpoint.',
  })
  console.log('Skill created:', skill.id)

  const list = await caller.skill.list({
    search: 'CLI Flow Skill',
    limit: 5,
    offset: 0,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  })
  console.log('List returned items:', list.items.length, 'Total:', list.total)

  const status = await caller.chat.status()
  console.log('Chat ready:', status.ready, 'Provider:', status.provider ?? 'n/a')

  try {
    const chatResult = await caller.chat.sendMessage({
      skillContent: skill.content,
      messages: [],
      userMessage: 'Hello from automated test',
    })
    console.log('Chat response snippet:', chatResult.content.slice(0, 60))
  } catch (err) {
    console.log(
      'Chat send produced expected error:',
      err instanceof Error ? err.message : err
    )
  } finally {
    await prisma.skill.delete({ where: { id: skill.id } })
  }
}

main()
  .catch((err) => {
    console.error('Flow script failed:', err)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
