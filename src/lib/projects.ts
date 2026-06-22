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
  show_on_login?: boolean;
};

export type LoginProjectMedia = {
  image?: string;
  video?: string;
  poster?: string;
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
  show_on_login?: boolean | null;
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
    show_on_login: Boolean(row.show_on_login),
  };
}

const projectSelectFields =
  'id,title,description,category,location,precision_label,image_webp_url,image_url,video_optimized_url,video_url,video_poster_url,status,sort_order,show_on_login';

const projectSelectFieldsWithoutLogin =
  'id,title,description,category,location,precision_label,image_webp_url,image_url,video_optimized_url,video_url,video_poster_url,status,sort_order';

const loginProjectMediaSelectFields =
  'image_webp_url,image_url,video_optimized_url,video_url,video_poster_url';

function isMissingLoginFeaturedColumn(error: { message?: string } | null) {
  return Boolean(error?.message?.toLowerCase().includes('show_on_login'));
}

function mapLoginProjectMedia(row: Pick<ProjectRow, 'image_webp_url' | 'image_url' | 'video_optimized_url' | 'video_url' | 'video_poster_url'>): LoginProjectMedia {
  return {
    image: row.image_webp_url ?? row.image_url ?? undefined,
    video: row.video_optimized_url ?? row.video_url ?? undefined,
    poster: row.video_poster_url ?? row.image_webp_url ?? row.image_url ?? undefined,
  };
}

export async function getPublishedProjects() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('projects')
    .select(projectSelectFields)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    if (isMissingLoginFeaturedColumn(error)) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('projects')
        .select(projectSelectFieldsWithoutLogin)
        .eq('status', 'published')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!fallbackError) {
        const sectorLabels = await getProjectSectorLabelMap();
        return (fallbackData ?? []).map((project) => mapProject(project as ProjectRow, sectorLabels));
      }
    }

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
    .select(`${projectSelectFields},created_at`)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    if (isMissingLoginFeaturedColumn(error)) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('projects')
        .select(`${projectSelectFieldsWithoutLogin},created_at`)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!fallbackError) {
        const sectorLabels = await getProjectSectorLabelMap();
        return (fallbackData ?? []).map((project) => mapProject(project as ProjectRow, sectorLabels));
      }
    }

    console.warn('No se pudieron cargar todos los proyectos desde Supabase:', error.message);
    return [];
  }

  const sectorLabels = await getProjectSectorLabelMap();
  return (data ?? []).map((project) => mapProject(project as ProjectRow, sectorLabels));
}

export async function getLoginFeaturedProjectMedia() {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('projects')
    .select(loginProjectMediaSelectFields)
    .eq('status', 'published')
    .eq('show_on_login', true)
    .order('sort_order', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!error && data) {
    return mapLoginProjectMedia(data as ProjectRow);
  }

  if (error && !isMissingLoginFeaturedColumn(error)) {
    console.warn('No se pudo cargar el proyecto destacado del login:', error.message);
  }

  const { data: fallbackData, error: fallbackError } = await supabase
    .from('projects')
    .select(loginProjectMediaSelectFields)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fallbackError) {
    console.warn('No se pudo cargar el proyecto de respaldo para el login:', fallbackError.message);
    return null;
  }

  return fallbackData ? mapLoginProjectMedia(fallbackData as ProjectRow) : null;
}

export async function setLoginFeaturedProject(projectId: string) {
  if (!supabase) throw new Error('Supabase no estÃ¡ configurado.');

  const { error: resetError } = await supabase
    .from('projects')
    .update({ show_on_login: false })
    .neq('id', projectId);

  if (resetError) {
    throw resetError;
  }

  const { error: updateError } = await supabase
    .from('projects')
    .update({ show_on_login: true })
    .eq('id', projectId);

  if (updateError) {
    throw updateError;
  }

  return true;
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
