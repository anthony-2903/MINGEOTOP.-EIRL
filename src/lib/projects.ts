import { supabase } from './supabase';

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
};

type ProjectRow = {
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

function mapProject(row: ProjectRow): Project {
  const category = normalizeCategory(row.category);

  return {
    id: row.id,
    title: row.title,
    category,
    catName: categoryLabels[category] ?? row.category,
    location: row.location ?? 'Perú',
    specs: row.description,
    precision: row.precision_label ?? 'Alta precisión',
    color: categoryColors[category] ?? 'from-brand-petrol via-brand-dark to-brand-green',
    image: row.image_webp_url ?? row.image_url ?? undefined,
    video: row.video_optimized_url ?? row.video_url ?? undefined,
    poster: row.video_poster_url ?? row.image_webp_url ?? row.image_url ?? undefined,
  };
}

export async function getPublishedProjects() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('projects')
    .select(
      'id,title,description,category,location,precision_label,image_webp_url,image_url,video_optimized_url,video_url,video_poster_url',
    )
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('No se pudieron cargar los proyectos desde Supabase:', error.message);
    return [];
  }

  return (data ?? []).map((project) => mapProject(project as ProjectRow));
}
