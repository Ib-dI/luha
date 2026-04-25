import { supabaseAdmin as supabase } from '../src/supabase-client'
import { lessons } from '../src/data/lessonData'

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
