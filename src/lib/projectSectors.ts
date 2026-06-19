import { supabase } from './supabase';

export type ProjectSector = {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type ProjectSectorInput = {
  slug: string;
  name: string;
  sort_order?: number;
  is_active?: boolean;
};

export const defaultProjectSectors: ProjectSector[] = [
  { id: 'default-todos', slug: 'todos', name: 'Todos los sectores', sort_order: 0, is_active: true },
  { id: 'default-mineria', slug: 'mineria', name: 'Mineria', sort_order: 1, is_active: true },
  { id: 'default-construccion', slug: 'construccion', name: 'Construccion', sort_order: 2, is_active: true },
  { id: 'default-vias', slug: 'vias', name: 'Carreteras', sort_order: 3, is_active: true },
  { id: 'default-dron', slug: 'dron', name: 'Drones & Catastro', sort_order: 4, is_active: true },
];

export function normalizeSectorSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getFallbackProjectSectors(includeInactive = false) {
  return defaultProjectSectors.filter((sector) => includeInactive || sector.is_active);
}

export async function getProjectSectors(includeInactive = false) {
  if (!supabase) return getFallbackProjectSectors(includeInactive);

  let query = supabase
    .from('project_sectors')
    .select('id,slug,name,sort_order,is_active,created_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.warn('No se pudieron cargar los sectores desde Supabase:', error.message);
    return getFallbackProjectSectors(includeInactive);
  }

  const sectors = (data ?? []) as ProjectSector[];
  return sectors.length > 0 ? sectors : getFallbackProjectSectors(includeInactive);
}

export async function getProjectSectorLabelMap() {
  const sectors = await getProjectSectors(true);

  return sectors.reduce<Record<string, string>>((labels, sector) => {
    labels[sector.slug] = sector.name;
    return labels;
  }, {});
}

export async function createProjectSector(sector: ProjectSectorInput) {
  if (!supabase) throw new Error('Supabase no esta configurado.');

  const payload = {
    slug: normalizeSectorSlug(sector.slug || sector.name),
    name: sector.name,
    sort_order: sector.sort_order ?? 0,
    is_active: sector.is_active ?? true,
  };

  const { data, error } = await supabase
    .from('project_sectors')
    .insert([payload])
    .select('id,slug,name,sort_order,is_active,created_at')
    .single();

  if (error) {
    console.error('Error al crear el sector en Supabase:', error);
    throw error;
  }

  return data as ProjectSector;
}

export async function updateProjectSector(id: string, updates: Partial<ProjectSectorInput>) {
  if (!supabase) throw new Error('Supabase no esta configurado.');

  const payload = {
    ...updates,
    slug: updates.slug ? normalizeSectorSlug(updates.slug) : undefined,
  };

  const { data, error } = await supabase
    .from('project_sectors')
    .update(payload)
    .eq('id', id)
    .select('id,slug,name,sort_order,is_active,created_at')
    .single();

  if (error) {
    console.error('Error al actualizar el sector en Supabase:', error);
    throw error;
  }

  return data as ProjectSector;
}

export async function deleteProjectSector(id: string) {
  if (!supabase) throw new Error('Supabase no esta configurado.');

  const { error } = await supabase
    .from('project_sectors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar el sector en Supabase:', error);
    throw error;
  }

  return true;
}
