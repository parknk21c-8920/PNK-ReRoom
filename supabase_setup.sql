-- 1. profiles 테이블 생성 (유저 정보 및 크레딧 저장)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  credits integer not null default 3, -- 신규 가입 시 기본으로 지급할 무료 크레딧 (3장)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (id)
);

-- 2. Row Level Security (RLS) 활성화 (보안 설정)
alter table public.profiles enable row level security;

-- 3. 보안 정책: 유저는 자신의 프로필만 조회하고 수정할 수 있음
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 4. 트리거 생성: 누군가 새로 회원가입(auth.users)하면 자동으로 profiles 테이블에 데이터 생성
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, credits)
  values (new.id, new.email, 3); -- 3은 신규 가입 무료 크레딧
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
