-- Extensions
create extension if not exists pg_trgm;
create extension if not exists "uuid-ossp";

-- lessons
create table lessons (
  id                integer primary key,
  title             text not null,
  description       text,
  order_index       integer not null,
  difficulty_level  integer default 1 check (difficulty_level between 1 and 5),
  unlocked_at_xp    integer default 0,
  is_published      boolean default false,
  created_at        timestamptz default now()
);

-- vocabulary
create table vocabulary (
  id            uuid primary key default gen_random_uuid(),
  french        text not null unique,
  shimaoré      text[] not null,
  category      text,
  lesson_id     integer references lessons(id) on delete set null,
  audio_url     text,
  is_verified   boolean default false,
  created_at    timestamptz default now()
);

-- exercises
create table exercises (
  id               uuid primary key default gen_random_uuid(),
  lesson_id        integer references lessons(id) on delete cascade,
  vocabulary_id    uuid references vocabulary(id) on delete set null,
  type             text not null,
  difficulty       integer default 1 check (difficulty between 1 and 3),
  question         jsonb not null,
  correct_answer   text not null,
  accepted_answers text[] not null,
  choices          text[],
  hint             text,
  generated_by     text default 'human',
  is_approved      boolean default false,
  created_at       timestamptz default now()
);

-- user_progress
create table user_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade,
  lesson_id    integer references lessons(id),
  completed    boolean default false,
  score        integer default 0 check (score between 0 and 100),
  attempts     integer default 0,
  last_seen_at timestamptz,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

-- user_vocabulary (spaced repetition)
create table user_vocabulary (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete cascade,
  vocabulary_id    uuid references vocabulary(id) on delete cascade,
  status           text default 'new' check (status in ('new', 'learning', 'reviewing', 'mastered')),
  strength         integer default 0 check (strength between 0 and 5),
  next_review_at   timestamptz default now(),
  mistake_count    integer default 0,
  correct_count    integer default 0,
  last_reviewed_at timestamptz,
  unique(user_id, vocabulary_id)
);

-- user_stats
create table user_stats (
  user_id             uuid primary key references auth.users(id) on delete cascade,
  xp                  integer default 0,
  level               integer default 1,
  streak_days         integer default 0,
  streak_shield_count integer default 1,
  last_activity_date  date,
  total_sessions      integer default 0,
  total_words_learned integer default 0,
  updated_at          timestamptz default now()
);

-- conversation_sessions
create table conversation_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete cascade,
  scenario         text not null,
  mode             text default 'tutor' check (mode in ('tutor', 'free')),
  messages         jsonb default '[]'::jsonb,
  feedback_summary jsonb,
  xp_earned        integer default 0,
  started_at       timestamptz default now(),
  ended_at         timestamptz
);

-- RLS
alter table user_progress enable row level security;
alter table user_vocabulary enable row level security;
alter table user_stats enable row level security;
alter table conversation_sessions enable row level security;

create policy "user_progress_own" on user_progress for all using (auth.uid() = user_id);
create policy "user_vocabulary_own" on user_vocabulary for all using (auth.uid() = user_id);
create policy "user_stats_own" on user_stats for all using (auth.uid() = user_id);
create policy "conversation_sessions_own" on conversation_sessions for all using (auth.uid() = user_id);

create policy "vocabulary_read_all" on vocabulary for select using (auth.role() = 'authenticated');
create policy "lessons_read_all" on lessons for select using (auth.role() = 'authenticated');
create policy "exercises_read_approved" on exercises for select using (auth.role() = 'authenticated' and is_approved = true);

-- Fonction IMMUTABLE pour indexer le tableau shimaoré en texte
create or replace function shimaore_array_to_text(arr text[])
  returns text language sql immutable strict as
  $$ select array_to_string(arr, ' ') $$;

-- Index
create index vocabulary_french_trgm on vocabulary using gin (french gin_trgm_ops);
create index vocabulary_shimaoré_trgm on vocabulary using gin (shimaore_array_to_text(shimaoré) gin_trgm_ops);
create index user_vocab_review_idx on user_vocabulary (user_id, next_review_at, strength) where status != 'mastered';
create index exercises_lesson_idx on exercises (lesson_id, difficulty) where is_approved = true;
create index vocabulary_category_idx on vocabulary (category);
create index vocabulary_lesson_idx on vocabulary (lesson_id) where lesson_id is not null;
create index user_progress_lesson_idx on user_progress (user_id, lesson_id);
create index conversation_user_idx on conversation_sessions (user_id, started_at desc);

-- Recherche approximative FR→Shimaoré
create or replace function search_vocabulary_fr(
  search_term text,
  result_limit int default 20
)
returns table (french text, shimaoré text[], sim float) as $$
  select french, shimaoré, similarity(french, search_term) as sim
  from vocabulary
  where french % search_term
     or french ilike '%' || search_term || '%'
  order by sim desc, french
  limit result_limit;
$$ language sql stable;
