-- Sectores dinamicos para el filtro exterior del portafolio y el select del admin.
-- Ejecutar en Supabase SQL Editor.

create extension if not exists pgcrypto;

alter table if exists public.projects
add column if not exists show_on_login boolean not null default false;

create index if not exists projects_show_on_login_idx
on public.projects (show_on_login, sort_order)
where status = 'published';

notify pgrst, 'reload schema';

create table if not exists public.project_sectors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint project_sectors_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create or replace function public.set_project_sectors_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists project_sectors_set_updated_at on public.project_sectors;

create trigger project_sectors_set_updated_at
before update on public.project_sectors
for each row
execute function public.set_project_sectors_updated_at();

alter table public.project_sectors enable row level security;

drop policy if exists "Public can read active project sectors" on public.project_sectors;
create policy "Public can read active project sectors"
on public.project_sectors
for select
using (is_active = true);

drop policy if exists "Admins can read project sectors" on public.project_sectors;
create policy "Admins can read project sectors"
on public.project_sectors
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can insert project sectors" on public.project_sectors;
create policy "Admins can insert project sectors"
on public.project_sectors
for insert
to authenticated
with check (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can update project sectors" on public.project_sectors;
create policy "Admins can update project sectors"
on public.project_sectors
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can delete project sectors" on public.project_sectors;
create policy "Admins can delete project sectors"
on public.project_sectors
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

insert into public.project_sectors (slug, name, sort_order, is_active)
values
  ('todos', 'Todos los sectores', 0, true),
  ('mineria', 'Mineria', 1, true),
  ('construccion', 'Construccion', 2, true),
  ('vias', 'Carreteras', 3, true),
  ('dron', 'Drones & Catastro', 4, true)
on conflict (slug) do update
set
  name = excluded.name,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

-- Opcional: activa esta llave foranea si quieres impedir que un proyecto use
-- una categoria que no exista como sector. No la ejecutes si tienes categorias
-- antiguas sin crear todavia en project_sectors.
--
-- alter table public.projects
-- add constraint projects_category_project_sectors_slug_fk
-- foreign key (category)
-- references public.project_sectors(slug)
-- on update cascade
-- on delete restrict;
