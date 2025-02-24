-- Create enum type for message roles
create type message_role as enum ('user', 'assistant');

-- Create messages table
create table messages (
  id serial primary key,
  content text not null,
  role message_role not null,
  timestamp timestamptz not null default now()
);

-- Create index on timestamp for better query performance
create index idx_messages_timestamp on messages(timestamp);

-- Set up Row Level Security (RLS)
alter table messages enable row level security;

-- Create a policy that allows all operations (for now)
create policy "Allow all operations" on messages
  for all
  using (true)
  with check (true);
