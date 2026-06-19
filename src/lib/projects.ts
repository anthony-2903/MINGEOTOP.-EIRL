import { supabase } from './supabase';
import { getProjectSectorLabelMap } from './projectSectors';

export type Project = {
  id: string;
  title: string;
  category: string;
  catName: string;
  location: string;
  specs: string;
  precision: string;
  color: string;
  image?: string;
  video?: string;
  poster?: string;
  // Admin-related fields
  status?: 'published' | 'draft' | 'review';
  sort_order?: number;
  image_url?: string;
  image_webp_url?: string;
  video_url?: string;
  video_optimized_url?: string;
  video_poster_url?: string;
};

export type ProjectRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string | null;
  precision_label: string | null;
  image_webp_url: string | null;
  image_url: string | null;
  video_optimized_url: string | null;
  video_url: string | null;
  video_poster_url: string | null;
  status: 'published' | 'draft' | 'review' | null;
  sort_order: number | null;
  created_at?: string;
};

const categoryLabels: Record<string, string> = {
  mineria: 'Minería',
  construccion: 'Construcción Civil',
  vias: 'Carreteras',
  dron: 'Drones & Catastro',
  catastro: 'Drones & Catastro',
};

const categoryColors: Record<string, string> = {
  mineria: 'from-brand-petrol via-brand-petrol-dark to-brand-green',
  construccion: 'from-brand-petrol via-[#1c3842] to-brand-yellow/40',
  vias: 'from-[#D97706] via-brand-petrol to-brand-green',
  dron: 'from-brand-green via-[#1f3a3a] to-brand-yellow/30',
  catastro: 'from-brand-green via-[#1f3a3a] to-brand-yellow/30',
};

function normalizeCategory(category: string) {
  return category.toLowerCase().trim();
}

function mapProject(row: ProjectRow, sectorLabels: Record<string, string> = categoryLabels): Project {
  const category = normalizeCategory(row.category);

  return {
    id: row.id,
    title: row.title,
    category,
    catName: sectorLabels[category] ?? categoryLabels[category] ?? row.category,
    location: row.location ?? 'Perú',
    specs: row.description,
    precision: row.precision_label ?? 'Alta precisión',
    color: categoryColors[category] ?? 'from-brand-petrol via-brand-dark to-brand-green',
    image: row.image_webp_url ?? row.image_url ?? undefined,
    video: row.video_optimized_url ?? row.video_url ?? undefined,
    poster: row.video_poster_url ?? row.image_webp_url ?? row.image_url ?? undefined,
    // Keep raw data for editing
    status: row.status ?? 'draft',
    sort_order: row.sort_order ?? 0,
    image_url: row.image_url ?? undefined,
    image_webp_url: row.image_webp_url ?? undefined,
    video_url: row.video_url ?? undefined,
    video_optimized_url: row.video_optimized_url ?? undefined,
    video_poster_url: row.video_poster_url ?? undefined,
  };
}

export async function getPublishedProjects() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('projects')
    .select(
      'id,title,description,category,location,precision_label,image_webp_url,image_url,video_optimized_url,video_url,video_poster_url,status,sort_order',
    )
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('No se pudieron cargar los proyectos desde Supabase:', error.message);
    return [];
  }

  const sectorLabels = await getProjectSectorLabelMap();
  return (data ?? []).map((project) => mapProject(project as ProjectRow, sectorLabels));
}

export async function getAllProjects() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('projects')
    .select(
      'id,title,description,category,location,precision_label,image_webp_url,image_url,video_optimized_url,video_url,video_poster_url,status,sort_order,created_at',
    )
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('No se pudieron cargar todos los proyectos desde Supabase:', error.message);
    return [];
  }

  const sectorLabels = await getProjectSectorLabelMap();
  return (data ?? []).map((project) => mapProject(project as ProjectRow, sectorLabels));
}

export async function createProject(projectData: Omit<ProjectRow, 'id'>) {
  if (!supabase) throw new Error('Supabase no está configurado.');

  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();

  if (error) {
    console.error('Error al crear el proyecto en Supabase:', error);
    throw error;
  }

  return mapProject(data as ProjectRow);
}

export async function updateProject(id: string, updates: Partial<ProjectRow>) {
  if (!supabase) throw new Error('Supabase no está configurado.');

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error al actualizar el proyecto en Supabase:', error);
    throw error;
  }

  return mapProject(data as ProjectRow);
}

export async function deleteProject(id: string) {
  if (!supabase) throw new Error('Supabase no está configurado.');

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar el proyecto en Supabase:', error);
    throw error;
  }

  return true;
}
