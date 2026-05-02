import { createClient } from '@supabase/supabase-js'
import { lessons } from '../src/data/lessonData'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

async function seedLessons() {
  const rows = lessons.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    description: lesson.description,
    order_index: index + 1,
    difficulty_level: Math.ceil((index + 1) / 8),
    unlocked_at_xp: index * 50,
    is_published: true,
  }))

  const { error } = await supabase
    .from('lessons')
    .upsert(rows, { onConflict: 'id' })

  if (error) console.error('❌ Seed error:', error)
  else console.log(`✅ ${rows.length} lessons seeded`)
}

seedLessons().catch(console.error)
