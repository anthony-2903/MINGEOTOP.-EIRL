import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Eye,
  FileText,
  FolderKanban,
  Globe2,
  Image,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Pencil,
  Phone,
  Play,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import Logo from './Logo';
import LoginFeaturedProject from './LoginFeaturedProject';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  setLoginFeaturedProject,
  type Project,
} from '../lib/projects';
import {
  createProjectSector,
  deleteProjectSector,
  getFallbackProjectSectors,
  getProjectSectors,
  normalizeSectorSlug,
  updateProjectSector,
  type ProjectSector,
} from '../lib/projectSectors';
import { uploadImageToCloudinary, uploadVideoToCloudinary } from '../lib/cloudinary';

type AdminSectionId = 'servicios' | 'proyectos' | 'contacto';
type AdminToastType = 'success' | 'error' | 'warning' | 'info';

type EditableItem = {
  title: string;
  description: string;
  status: 'Publicado' | 'Borrador' | 'Revisión';
};

const sections: Array<{
  id: AdminSectionId;
  label: string;
  description: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: 'proyectos', label: 'Proyectos', description: 'Portafolio', icon: FolderKanban },
  { id: 'servicios', label: 'Servicios', description: 'Catálogo comercial', icon: Map },
  { id: 'contacto', label: 'Contacto', description: 'Canales y formulario', icon: Mail },
];

const initialContent: Record<AdminSectionId, EditableItem> = {
  servicios: {
    title: 'Soluciones geoespaciales y topografía especializada',
    description:
      'Administra levantamientos, replanteo, georreferenciación, control de obra, cubicación y fotogrametría.',
    status: 'Revisión',
  },
  proyectos: {
    title: 'Proyectos de precisión ejecutados con éxito',
    description:
      'Controla casos destacados con una imagen principal, descripción inferior transparente y modal ampliado para cada proyecto.',
    status: 'Publicado',
  },
  contacto: {
    title: 'Solicita tu cotización técnica sin compromiso',
    description:
      'Actualiza teléfono, WhatsApp, correo, dirección, servicios del formulario y mensaje de confirmación.',
    status: 'Publicado',
  },
};

const serviceItems = [
  { title: 'Levantamientos Topográficos', category: 'Campo', deliverable: 'Plano, curvas de nivel y nube de puntos' },
  { title: 'Replanteo de Obras', category: 'Obra', deliverable: 'Ejes, niveles y puntos de control' },
  { title: 'Georreferenciación', category: 'Geodesia', deliverable: 'Coordenadas, reporte técnico y puntos GNSS' },
  { title: 'Control Topográfico de Obra', category: 'Obra', deliverable: 'Reportes de avance y control geométrico' },
  { title: 'Curvas de Nivel', category: 'Terreno', deliverable: 'Superficies, perfiles y modelo digital' },
  { title: 'Planos Topográficos', category: 'Gabinete', deliverable: 'DWG, PDF, perfiles y cuadros de coordenadas' },
  { title: 'Cubicación', category: 'Volúmenes', deliverable: 'Cortes, rellenos y reporte comparativo' },
  { title: 'Movimiento de Tierras', category: 'Volúmenes', deliverable: 'Metrados, superficies y control de plataformas' },
  { title: 'Topografía Minera', category: 'Minería', deliverable: 'Taludes, botaderos y zonas operativas' },
  { title: 'Fotogrametría con Dron', category: 'Dron', deliverable: 'Ortomosaicos, modelos 3D y MDT/MDS' },
];


const contactChannels = [
  { label: 'WhatsApp', value: '+51 913 386 354', icon: MessageCircle },
  { label: 'Teléfono', value: '+51 913 386 354', icon: Phone },
  { label: 'Correo', value: 'mingeotop@gmail.com', icon: Mail },
  { label: 'Facebook', value: 'facebook.com/gimatc.2023', icon: Globe2 },
  { label: 'TikTok', value: '@mingeotop', icon: Globe2 },
];

const fieldClasses =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10';

function isManagedSection(section: AdminSectionId) {
  return section === 'servicios' || section === 'proyectos' || section === 'contacto';
}

function statusClasses(status: EditableItem['status']) {
  if (status === 'Publicado') return 'bg-brand-green/10 text-brand-green border-brand-green/20';
  if (status === 'Revisión') return 'bg-brand-yellow/10 text-brand-yellow-dark border-brand-yellow/20';
  return 'bg-gray-100 text-gray-500 border-gray-200';
}

function AdminProjectRowsSkeleton() {
  return (
    <div className="mt-6 divide-y divide-gray-100">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between first:pt-0">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <div className="skeleton-shimmer absolute inset-0" />
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <div className="relative h-4 w-40 overflow-hidden rounded bg-gray-100">
                <div className="skeleton-shimmer absolute inset-0" />
              </div>
              <div className="relative h-5 w-64 max-w-full overflow-hidden rounded bg-gray-100">
                <div className="skeleton-shimmer absolute inset-0" />
              </div>
              <div className="relative h-3 w-52 max-w-full overflow-hidden rounded bg-gray-100">
                <div className="skeleton-shimmer absolute inset-0" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-center">
            <div className="relative h-9 w-20 overflow-hidden rounded-lg bg-gray-100">
              <div className="skeleton-shimmer absolute inset-0" />
            </div>
            <div className="relative h-9 w-24 overflow-hidden rounded-lg bg-gray-100">
              <div className="skeleton-shimmer absolute inset-0" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState<AdminSectionId>('proyectos');
  const [projectAdminTab, setProjectAdminTab] = useState<'projects' | 'sectors'>('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(false);
  const [serviceSearch, setServiceSearch] = useState('');

  // DB projects states
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'mineria',
    location: '',
    description: '',
    precision_label: '',
    sort_order: 0,
    status: 'draft' as 'draft' | 'published' | 'review',
    image_url: '',
    image_webp_url: '',
    video_url: '',
    video_optimized_url: '',
    video_poster_url: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [isSavingLoginProjectId, setIsSavingLoginProjectId] = useState<string | null>(null);
  const [isMediaDragging, setIsMediaDragging] = useState(false);
  const [sectorToDelete, setSectorToDelete] = useState<ProjectSector | null>(null);
  const [toast, setToast] = useState<{ type: AdminToastType; message: string } | null>(null);
  const [projectSectors, setProjectSectors] = useState<ProjectSector[]>(() => getFallbackProjectSectors(true));
  const [sectorForm, setSectorForm] = useState({
    id: '',
    name: '',
    slug: '',
    sort_order: 0,
    is_active: true,
  });
  const [isSavingSector, setIsSavingSector] = useState(false);
  const uploadProgressTimer = useRef<number | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = (type: AdminToastType, message: string) => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }

    setToast({ type, message });
    toastTimer.current = window.setTimeout(() => {
      setToast(null);
      toastTimer.current = null;
    }, 4200);
  };

  const loadProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const [list, sectors] = await Promise.all([
        getAllProjects(),
        getProjectSectors(true),
      ]);
      setDbProjects(list);
      setProjectSectors(sectors);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const startUploadFeedback = (message: string) => {
    if (uploadProgressTimer.current) {
      window.clearInterval(uploadProgressTimer.current);
    }

    setIsUploading(true);
    setUploadProgress(message);
    setUploadPercent(8);
    uploadProgressTimer.current = window.setInterval(() => {
      setUploadPercent((current) => {
        if (current >= 92) return current;
        return Math.min(92, current + Math.max(1, Math.round((92 - current) / 6)));
      });
    }, 300);
  };

  const finishUploadFeedback = (message: string, percent = 100) => {
    if (uploadProgressTimer.current) {
      window.clearInterval(uploadProgressTimer.current);
      uploadProgressTimer.current = null;
    }
    setUploadPercent(percent);
    setUploadProgress(message);
  };

  const uploadImageFile = async (file: File) => {
    startUploadFeedback('Subiendo imagen a Cloudinary...');
    try {
      const res = await uploadImageToCloudinary(file);
      setProjectForm(prev => ({
        ...prev,
        image_url: res.originalUrl,
        image_webp_url: res.webpUrl
      }));
      finishUploadFeedback('Imagen subida con exito.');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      showToast('error', 'Error al subir la imagen: ' + err.message);
      finishUploadFeedback('Error al subir imagen.', 0);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadVideoFile = async (file: File) => {
    startUploadFeedback('Subiendo video a Cloudinary...');
    try {
      const res = await uploadVideoToCloudinary(file);
      setProjectForm(prev => ({
        ...prev,
        video_url: res.originalUrl,
        video_optimized_url: res.optimizedUrl,
        video_poster_url: res.posterUrl
      }));
      finishUploadFeedback('Video subido con exito.');
    } catch (err: any) {
      console.error('Error uploading video:', err);
      showToast('error', 'Error al subir el video: ' + err.message);
      finishUploadFeedback('Error al subir video.', 0);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMediaFile = async (file: File) => {
    if (file.type.startsWith('image/')) {
      await uploadImageFile(file);
      return;
    }

    if (file.type.startsWith('video/')) {
      await uploadVideoFile(file);
      return;
    }

    showToast('warning', 'Por favor, selecciona una imagen o un video valido.');
  };

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadMediaFile(file);
    }
    event.target.value = '';
  };

  const handleMediaDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsMediaDragging(true);
  };

  const handleMediaDragLeave = () => {
    setIsMediaDragging(false);
  };

  const handleMediaDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsMediaDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await uploadMediaFile(file);
    }
  };

  const openAddProjectModal = () => {
    const firstProjectSector = projectSectors.find((sector) => sector.is_active && sector.slug !== 'todos');

    setEditingProject(null);
    setProjectForm({
      title: '',
      category: firstProjectSector?.slug ?? 'mineria',
      location: '',
      description: '',
      precision_label: '',
      sort_order: Math.max(0, ...dbProjects.map(project => project.sort_order ?? 0)) + 1,
      status: 'published',
      image_url: '',
      image_webp_url: '',
      video_url: '',
      video_optimized_url: '',
      video_poster_url: '',
    });
    setUploadProgress('');
    setUploadPercent(0);
    setProjectModalOpen(true);
  };

  const resetSectorForm = () => {
    setSectorForm({
      id: '',
      name: '',
      slug: '',
      sort_order: Math.max(0, ...projectSectors.map((sector) => sector.sort_order ?? 0)) + 1,
      is_active: true,
    });
  };

  const handleEditSector = (sector: ProjectSector) => {
    setSectorForm({
      id: sector.id,
      name: sector.name,
      slug: sector.slug,
      sort_order: sector.sort_order ?? 0,
      is_active: sector.is_active,
    });
  };

  const handleSaveSector = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!sectorForm.name.trim()) {
      showToast('warning', 'Ingresa el nombre del sector.');
      return;
    }

    const nextSlug = normalizeSectorSlug(sectorForm.slug || sectorForm.name);

    if (!nextSlug) {
      showToast('warning', 'Ingresa un slug valido para el sector.');
      return;
    }

    setIsSavingSector(true);
    try {
      const payload = {
        name: sectorForm.name.trim(),
        slug: nextSlug,
        sort_order: Number(sectorForm.sort_order) || 0,
        is_active: sectorForm.is_active,
      };

      if (sectorForm.id) {
        await updateProjectSector(sectorForm.id, payload);
      } else {
        await createProjectSector(payload);
      }

      const sectors = await getProjectSectors(true);
      setProjectSectors(sectors);
      setSectorForm({
        id: '',
        name: '',
        slug: '',
        sort_order: Math.max(0, ...sectors.map((sector) => sector.sort_order ?? 0)) + 1,
        is_active: true,
      });
      showToast('success', sectorForm.id ? 'Sector actualizado correctamente.' : 'Sector creado correctamente.');
    } catch (err: any) {
      console.error('Error saving sector:', err);
      showToast('error', 'Error al guardar el sector: ' + err.message);
    } finally {
      setIsSavingSector(false);
    }
  };

  const handleDeleteSector = async (sector: ProjectSector) => {
    if (sector.slug === 'todos') {
      showToast('warning', 'El sector "Todos los sectores" no se debe eliminar porque controla el filtro general.');
      return;
    }

    const isUsed = dbProjects.some((project) => project.category === sector.slug);
    if (isUsed) {
      showToast('warning', 'Este sector esta asignado a uno o mas proyectos. Cambia esos proyectos antes de eliminarlo.');
      return;
    }

    setSectorToDelete(sector);
  };

  const handleConfirmDeleteSector = async () => {
    if (!sectorToDelete) return;
    try {
      await deleteProjectSector(sectorToDelete.id);
      const sectors = await getProjectSectors(true);
      setProjectSectors(sectors);
      if (sectorForm.id === sectorToDelete.id) {
        resetSectorForm();
      }
      setSectorToDelete(null);
      showToast('success', 'Sector eliminado correctamente.');
    } catch (err: any) {
      console.error('Error deleting sector:', err);
      showToast('error', 'Error al eliminar el sector: ' + err.message);
    }
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      category: project.category,
      location: project.location,
      description: project.specs,
      precision_label: project.precision,
      sort_order: project.sort_order ?? 0,
      status: (project.status as any) || 'draft',
      image_url: project.image_url || '',
      image_webp_url: project.image_webp_url || '',
      video_url: project.video_url || '',
      video_optimized_url: project.video_optimized_url || '',
      video_poster_url: project.video_poster_url || '',
    });
    setUploadProgress('');
    setUploadPercent(0);
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!projectForm.title) {
      showToast('warning', 'Por favor ingrese un titulo.');
      return;
    }

    setIsSavingProject(true);
    try {
      const nextSortOrder = editingProject
        ? Number(editingProject.sort_order ?? projectForm.sort_order ?? 0)
        : Math.max(0, ...dbProjects.map(project => project.sort_order ?? 0)) + 1;

      const payload: any = {
        title: projectForm.title,
        category: projectForm.category,
        location: projectForm.location || null,
        description: projectForm.description,
        precision_label: null,
        sort_order: nextSortOrder,
        status: 'published',
        image_url: projectForm.image_url || null,
        image_webp_url: projectForm.image_webp_url || null,
        video_url: projectForm.video_url || null,
        video_optimized_url: projectForm.video_optimized_url || null,
        video_poster_url: projectForm.video_poster_url || null,
      };

      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await createProject(payload);
      }

      await loadProjects();
      setProjectModalOpen(false);
      setEditingProject(null);
      showToast('success', editingProject ? 'Proyecto actualizado correctamente.' : 'Proyecto creado correctamente.');
    } catch (err: any) {
      console.error('Error saving project:', err);
      showToast('error', 'Error al guardar el proyecto: ' + err.message);
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeletingProject(true);
    try {
      await deleteProject(projectToDelete.id);
      await loadProjects();
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
      showToast('success', 'Proyecto eliminado correctamente.');
    } catch (err: any) {
      console.error('Error deleting project:', err);
      showToast('error', 'Error al eliminar el proyecto: ' + err.message);
    } finally {
      setIsDeletingProject(false);
    }
  };

  const handleSetLoginProject = async (project: Project) => {
    if (project.status !== 'published') {
      showToast('warning', 'Solo puedes destacar en el login un proyecto publicado.');
      return;
    }

    setIsSavingLoginProjectId(project.id);
    try {
      await setLoginFeaturedProject(project.id);
      setDbProjects((current) =>
        current.map((item) => ({
          ...item,
          show_on_login: item.id === project.id,
        })),
      );
      showToast('success', 'Proyecto destacado actualizado para el login.');
    } catch (err: any) {
      console.error('Error setting login project:', err);
      const isMissingColumn = err?.code === 'PGRST204' || String(err?.message ?? '').includes('show_on_login');
      showToast(
        'error',
        isMissingColumn
          ? 'Falta ejecutar el SQL de Supabase para crear show_on_login y recargar el esquema.'
          : 'No se pudo actualizar el proyecto del login.',
      );
    } finally {
      setIsSavingLoginProjectId(null);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    return () => {
      if (uploadProgressTimer.current) {
        window.clearInterval(uploadProgressTimer.current);
      }
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const editableSection = activeSection;
  const selectedContent = content[editableSection];
  const isCurrentSectionManaged = isManagedSection(activeSection);
  const filteredServices = serviceItems.filter((service) => {
    const search = serviceSearch.trim().toLowerCase();
    if (!search) return true;
    return [service.title, service.category, service.deliverable].some((value) =>
      value.toLowerCase().includes(search),
    );
  });
  const activeProjectSectors = projectSectors.filter((sector) => sector.is_active && sector.slug !== 'todos');
  const selectedLoginProject = dbProjects.find((project) => project.show_on_login);

  useEffect(() => {
    if (!supabase) {
      setIsCheckingSession(false);
      setLoginError('Supabase no está configurado. Revisa las variables VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.');
      return;
    }

    const supabaseClient = supabase;

    const checkAdminAccess = async (userId: string) => {
      const { data: adminUser } = await supabaseClient
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      return Boolean(adminUser);
    };

    supabaseClient.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        setIsAuthenticated(false);
        setIsCheckingSession(false);
        return;
      }

      setIsAuthenticated(await checkAdminAccess(data.session.user.id));
      setIsCheckingSession(false);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(await checkAdminAccess(session.user.id));
      if (session.user) {
        setLoginError('');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateContent = (field: keyof EditableItem, value: string) => {
    setContent((current) => ({
      ...current,
      [editableSection]: {
        ...current[editableSection],
        [field]: value,
      },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSupabaseConfigured || !supabase) {
      setLoginError('Supabase no está configurado para iniciar sesión.');
      return;
    }

    setIsLoggingIn(true);
    setLoginError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email.trim(),
      password: loginData.password,
    });

    if (error) {
      setIsLoggingIn(false);
      setLoginError('Credenciales incorrectas o usuario no registrado en Supabase.');
      return;
    }

    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', data.user.id)
      .maybeSingle();

    setIsLoggingIn(false);

    if (!adminUser) {
      await supabase.auth.signOut();
      setLoginError('Tu usuario existe, pero no está autorizado como administrador.');
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }

    setIsAuthenticated(false);
    setLoginData({ email: '', password: '' });
    setActiveSection('proyectos');
  };

  const renderSectionEditor = () => {
    if (activeSection === 'proyectos') {
      return (
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-dark font-outfit">
                  Portafolio de Proyectos
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-brand-petrol font-outfit">
                  Gestión de Proyectos
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Agrega, edita y elimina los proyectos que se muestran en el portafolio de la landing page.
                </p>
              </div>
              {projectAdminTab === 'projects' ? (
                <button
                  type="button"
                  onClick={openAddProjectModal}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-petrol px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-brand-petrol-dark transition duration-300 cursor-pointer"
                >
                  <Plus className="h-5 w-5" />
                  Agregar Proyecto
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetSectorForm}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-brand-petrol transition hover:border-brand-yellow hover:bg-brand-light"
                >
                  <Plus className="h-5 w-5" />
                  Nuevo sector
                </button>
              )}
            </div>

            <div className="mt-5 flex w-fit rounded-xl border border-gray-200 bg-brand-light p-1">
              <button
                type="button"
                onClick={() => setProjectAdminTab('projects')}
                className={`rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] transition ${
                  projectAdminTab === 'projects'
                    ? 'bg-brand-petrol text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-petrol'
                }`}
              >
                Proyectos
              </button>
              <button
                type="button"
                onClick={() => setProjectAdminTab('sectors')}
                className={`rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] transition ${
                  projectAdminTab === 'sectors'
                    ? 'bg-brand-petrol text-white shadow-sm'
                    : 'text-gray-500 hover:text-brand-petrol'
                }`}
              >
                Sectores
              </button>
            </div>

            {projectAdminTab === 'projects' ? (
              isLoadingProjects ? (
              <AdminProjectRowsSkeleton />
            ) : dbProjects.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <FolderKanban className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-base font-semibold">No hay proyectos registrados en Supabase</p>
                <p className="mt-2 text-sm text-gray-400">Usa el botón de arriba para registrar tu primer proyecto.</p>
              </div>
            ) : (
              <div className="mt-6">
                <div className="mb-5 rounded-lg border border-brand-yellow/25 bg-brand-yellow/10 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-yellow-dark">
                        Proyecto visible en login
                      </p>
                      <h3 className="mt-1 truncate font-outfit text-lg font-extrabold text-brand-petrol">
                        {selectedLoginProject?.title ?? 'Aun no seleccionaste un proyecto'}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        Usa el boton con estrella de la lista para escoger que proyecto reemplaza al componente 3D.
                      </p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-brand-yellow-dark shadow-sm">
                      <Star className={`h-5 w-5 ${selectedLoginProject ? 'fill-current' : ''}`} />
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                {dbProjects.map((project) => (
                  <div key={project.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-brand-dark">
                        {project.video ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white z-10">
                            <Play className="h-5 w-5 fill-current animate-pulse" />
                          </div>
                        ) : null}
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className={`h-full w-full bg-gradient-to-br ${project.color}`} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-semibold text-brand-petrol">
                            {project.catName}
                          </span>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            project.status === 'published'
                              ? 'bg-brand-green/10 text-brand-green border-brand-green/20'
                              : project.status === 'review'
                              ? 'bg-brand-yellow/10 text-brand-yellow-dark border-brand-yellow/20'
                              : 'bg-gray-100 text-gray-500 border-gray-200'
                          }`}>
                            {project.status === 'published' ? 'Publicado' : project.status === 'review' ? 'Revisión' : 'Borrador'}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            Orden: {project.sort_order}
                          </span>
                        </div>
                        <h4 className="mt-1 text-base font-outfit font-extrabold text-brand-petrol truncate sm:max-w-md">
                          {project.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-brand-yellow-dark" />
                          {project.location} • {project.precision}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {project.specs}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleSetLoginProject(project)}
                        disabled={isSavingLoginProjectId === project.id || project.status !== 'published'}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition duration-200 ${
                          project.show_on_login
                            ? 'border-brand-yellow bg-brand-yellow text-brand-dark shadow-sm'
                            : 'border-gray-200 bg-white text-brand-petrol hover:border-brand-yellow hover:bg-brand-light'
                        } disabled:cursor-not-allowed disabled:opacity-55`}
                        title={project.status === 'published' ? 'Mostrar este proyecto en el login' : 'Publica el proyecto para destacarlo en el login'}
                      >
                        <Star className={`h-3.5 w-3.5 ${project.show_on_login ? 'fill-current' : ''}`} />
                        {isSavingLoginProjectId === project.id ? 'Guardando' : project.show_on_login ? 'En login' : 'Login'}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditProjectModal(project)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-brand-petrol hover:border-brand-yellow hover:bg-brand-light transition duration-200 cursor-pointer"
                        title="Editar proyecto"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(project)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-red-600 hover:border-red-300 hover:bg-red-50 transition duration-200 cursor-pointer"
                        title="Eliminar proyecto"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              </div>
              )
            ) : null}
          </div>

          {projectAdminTab === 'sectors' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-dark font-outfit">
                  Filtro exterior del portafolio
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-brand-petrol font-outfit">
                  Sectores de Proyectos
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-gray-500">
                  Administra las opciones que aparecen en el selector publico y en el formulario de proyectos.
                </p>
              </div>
              <button
                type="button"
                onClick={resetSectorForm}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-brand-petrol transition hover:border-brand-yellow hover:bg-brand-light"
              >
                <Plus className="h-5 w-5" />
                Nuevo sector
              </button>
            </div>

            <form onSubmit={handleSaveSector} className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_120px_auto] lg:items-end">
              <label className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Nombre visible</span>
                <input
                  value={sectorForm.name}
                  onChange={(event) => {
                    const name = event.target.value;
                    setSectorForm((current) => ({
                      ...current,
                      name,
                      slug: current.id ? current.slug : normalizeSectorSlug(name),
                    }));
                  }}
                  className={fieldClasses}
                  placeholder="Ej. Obras urbanas"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Slug</span>
                <input
                  value={sectorForm.slug}
                  onChange={(event) => setSectorForm((current) => ({ ...current, slug: normalizeSectorSlug(event.target.value) }))}
                  className={fieldClasses}
                  placeholder="obras-urbanas"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Orden</span>
                <input
                  type="number"
                  value={sectorForm.sort_order}
                  onChange={(event) => setSectorForm((current) => ({ ...current, sort_order: Number(event.target.value) }))}
                  className={fieldClasses}
                />
              </label>

              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <input
                    type="checkbox"
                    checked={sectorForm.is_active}
                    onChange={(event) => setSectorForm((current) => ({ ...current, is_active: event.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300 text-brand-yellow focus:ring-brand-yellow"
                  />
                  Activo
                </label>
                <button
                  type="submit"
                  disabled={isSavingSector}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow-light disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSavingSector ? 'Guardando' : sectorForm.id ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>

            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-[1fr_120px_100px] gap-3 bg-gray-50 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:grid-cols-[1fr_1fr_100px_140px]">
                <span>Sector</span>
                <span className="hidden sm:block">Slug</span>
                <span>Estado</span>
                <span className="text-right">Acciones</span>
              </div>
              <div className="divide-y divide-gray-100">
                {projectSectors.map((sector) => {
                  const usedCount = dbProjects.filter((project) => project.category === sector.slug).length;

                  return (
                    <div key={sector.id} className="grid grid-cols-[1fr_120px_100px] gap-3 px-4 py-4 text-sm sm:grid-cols-[1fr_1fr_100px_140px] sm:items-center">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-brand-petrol">{sector.name}</p>
                        <p className="mt-1 text-xs text-gray-400">{usedCount} proyecto(s)</p>
                      </div>
                      <span className="hidden truncate font-mono text-xs text-gray-500 sm:block">{sector.slug}</span>
                      <span className={`w-fit rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        sector.is_active
                          ? 'border-brand-green/20 bg-brand-green/10 text-brand-green'
                          : 'border-gray-200 bg-gray-100 text-gray-500'
                      }`}>
                        {sector.is_active ? 'Activo' : 'Oculto'}
                      </span>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditSector(sector)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-brand-petrol transition hover:border-brand-yellow hover:bg-brand-light"
                          title="Editar sector"
                          aria-label="Editar sector"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSector(sector)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={sector.slug === 'todos' || usedCount > 0}
                          title="Eliminar sector"
                          aria-label="Eliminar sector"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          )}
        </div>
      );
    }

    if (activeSection === 'servicios') {
      return (
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-dark font-outfit">
                  Catalogo comercial
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-brand-petrol font-outfit">
                  Gestion de Servicios
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-gray-500">
                  Revisa los servicios visibles en la landing y el alcance comercial que se comunica al cliente.
                </p>
              </div>
              <span className="inline-flex w-fit items-center rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-xs font-bold text-brand-green">
                Publicado
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-100 bg-brand-light p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Servicios</span>
                <strong className="mt-1 block text-2xl font-extrabold text-brand-petrol">{serviceItems.length}</strong>
              </div>
              <div className="rounded-lg border border-gray-100 bg-brand-light p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Categorias</span>
                <strong className="mt-1 block text-2xl font-extrabold text-brand-petrol">
                  {new Set(serviceItems.map(service => service.category)).size}
                </strong>
              </div>
              <div className="rounded-lg border border-brand-yellow/20 bg-brand-yellow/10 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-yellow-dark">Estado</span>
                <strong className="mt-1 block text-2xl font-extrabold text-brand-petrol">Activo</strong>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Titulo principal</span>
                <input
                  value={selectedContent.title}
                  onChange={(event) => updateContent('title', event.target.value)}
                  className={fieldClasses}
                />
              </label>

              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Descripcion</span>
                <textarea
                  value={selectedContent.description}
                  onChange={(event) => updateContent('description', event.target.value)}
                  rows={4}
                  className={fieldClasses}
                />
              </label>

              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Buscar servicio</span>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    value={serviceSearch}
                    onChange={(event) => setServiceSearch(event.target.value)}
                    className={`${fieldClasses} pl-10`}
                    placeholder="Buscar por nombre, categoria o entregable"
                  />
                </div>
              </label>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
                  <h3 className="font-extrabold text-brand-petrol">Servicios visibles</h3>
                  <span className="text-xs font-bold text-gray-400">
                    {filteredServices.length} de {serviceItems.length}
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {filteredServices.map((service, index) => (
                    <div key={service.title} className="grid gap-3 px-4 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                      <span className="inline-flex h-9 w-12 items-center justify-center rounded-lg bg-brand-petrol text-xs font-extrabold text-white">
                        MT-{String(serviceItems.findIndex(item => item.title === service.title) + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-bold text-brand-petrol">{service.title}</p>
                          <span className="rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            {service.category}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500">{service.deliverable}</p>
                      </div>
                      <span className="inline-flex w-fit items-center rounded-full border border-brand-green/20 bg-brand-green/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-green">
                        Visible
                      </span>
                    </div>
                  ))}

                  {filteredServices.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm font-semibold text-gray-500">
                      No se encontraron servicios con ese criterio.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-brand-petrol/10 bg-brand-light px-4 py-3 text-sm leading-relaxed text-gray-600">
                El catalogo visible se mantiene sincronizado con el componente publico de servicios. Para cambiar iconos, orden o descripciones de cada tarjeta se edita el codigo del componente.
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow-light"
              >
                {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                {saved ? 'Cambios guardados' : 'Guardar contenido'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-dark sm:block">
              Canales de atencion
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-brand-petrol">
              {sections.find((section) => section.id === activeSection)?.label}
            </h2>
          </div>
          <span
            className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold ${statusClasses(
              selectedContent.status,
            )}`}
          >
            {selectedContent.status}
          </span>
          {!isCurrentSectionManaged && (
            <span className="inline-flex w-fit items-center rounded-full border border-brand-petrol/15 bg-brand-petrol/5 px-3 py-1 text-xs font-bold text-brand-petrol">
              Fijo en código
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-5">
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Título principal
            </span>
            <input
              value={selectedContent.title}
              onChange={(event) => updateContent('title', event.target.value)}
              disabled={!isCurrentSectionManaged}
              className={`${fieldClasses} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {activeSection === 'contacto' ? 'Mensaje de conversión' : 'Descripción'}
            </span>
            <textarea
              value={selectedContent.description}
              onChange={(event) => updateContent('description', event.target.value)}
              rows={5}
              disabled={!isCurrentSectionManaged}
              className={`${fieldClasses} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
            />
          </label>

          {!isCurrentSectionManaged && (
            <div className="rounded-lg border border-brand-petrol/10 bg-brand-light px-4 py-3 text-sm leading-relaxed text-gray-600">
              Esta sección queda como contenido estático de código. Los cambios estructurales se hacen en componentes para mantener estable la identidad de la landing.
            </div>
          )}

          {activeSection === 'contacto' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div key={channel.label} className="rounded-lg border border-gray-200 bg-brand-light p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-lg bg-brand-green/10 p-2 text-brand-green">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{channel.label}</p>
                        <p className="text-sm font-extrabold text-brand-petrol">{channel.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Estado</span>
            <select
              value={selectedContent.status}
              onChange={(event) => updateContent('status', event.target.value as EditableItem['status'])}
              disabled={!isCurrentSectionManaged}
              className={`${fieldClasses} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
            >
              <option value="Publicado">Publicado</option>
              <option value="Revisión">Revisión</option>
              <option value="Borrador">Borrador</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={!isCurrentSectionManaged}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-brand-petrol transition hover:border-brand-yellow disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Image className="h-4 w-4" />
            Gestionar imágenes
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isCurrentSectionManaged}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? 'Cambios guardados' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    );
  };

  const renderContextPanel = () => {
    if (activeSection === 'servicios') {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm space-y-5">
          <div>
            <h3 className="font-extrabold text-brand-petrol">Resumen de Servicios</h3>
            <p className="mt-1 text-xs text-gray-500">Lectura rapida del catalogo visible en la landing.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[...new Set(serviceItems.map(service => service.category))].map((category) => (
              <div key={category} className="rounded-lg border border-gray-100 bg-brand-light px-3 py-2">
                <span className="block text-sm font-extrabold text-brand-petrol">
                  {serviceItems.filter(service => service.category === category).length}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{category}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-outfit">Nota operativa</h4>
            <p className="text-xs leading-relaxed text-gray-500">
              Los servicios individuales son tarjetas del componente publico. Esta vista sirve para revisar contenido y guardar textos generales.
            </p>
          </div>
        </div>
      );
    }

    if (activeSection === 'proyectos') {
      const total = dbProjects.length;
      const published = dbProjects.filter(p => p.status === 'published').length;
      const drafts = dbProjects.filter(p => p.status === 'draft').length;
      const reviews = dbProjects.filter(p => p.status === 'review').length;

      return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm space-y-5">
          <div>
            <h3 className="font-extrabold text-brand-petrol font-outfit">Resumen de Proyectos</h3>
            <p className="text-xs text-gray-500 mt-1">Estadísticas del portafolio en tiempo real.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-brand-light p-3 text-center border border-gray-100">
              <span className="block text-2xl font-extrabold text-brand-petrol">{total}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 font-outfit">Total</span>
            </div>
            <div className="rounded-lg bg-brand-green/10 p-3 text-center border border-brand-green/10">
              <span className="block text-2xl font-extrabold text-brand-green">{published}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green font-outfit">Publicados</span>
            </div>
            <div className="rounded-lg bg-gray-100 p-3 text-center border border-gray-200">
              <span className="block text-2xl font-extrabold text-gray-500">{drafts}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-outfit">Borradores</span>
            </div>
            <div className="rounded-lg bg-brand-yellow/10 p-3 text-center border border-brand-yellow/10">
              <span className="block text-2xl font-extrabold text-brand-yellow-dark">{reviews}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-yellow-dark font-outfit">Revisión</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-outfit">Ayuda y Consejos</h4>
            <ul className="text-xs text-gray-500 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>El <strong>Orden</strong> define la posición de los proyectos en la landing (orden ascendente).</li>
              <li>Sube imágenes optimizadas en formato <strong>WebP</strong> o usa el cargador automático.</li>
              <li>Los videos deben tener formato MP4 optimizado para web.</li>
            </ul>
          </div>
        </div>
      );
    }

    if (activeSection === 'contacto') {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-extrabold text-brand-petrol">Formulario</h3>
            <button className="inline-flex items-center gap-2 rounded-lg bg-brand-petrol px-3 py-2 text-xs font-bold text-white">
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {['Nombre completo', 'Celular / Teléfono', 'Correo corporativo', 'Servicio requerido', 'Detalle del proyecto'].map((field) => (
              <div key={field} className="flex items-center justify-between gap-3 rounded-lg bg-brand-light px-3 py-2">
                <span className="text-sm font-semibold text-brand-petrol">{field}</span>
                <button className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 hover:text-brand-petrol" title="Editar campo">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-brand-petrol">Vista previa</h3>
          <FileText className="h-5 w-5 text-brand-yellow-dark" />
        </div>
        <div className="mt-4 rounded-lg border border-gray-200 bg-brand-light p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-green">
            {sections.find((section) => section.id === editableSection)?.label}
          </p>
          <h4 className="mt-2 text-lg font-extrabold leading-tight text-brand-petrol">
            {selectedContent.title}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{selectedContent.description}</p>
        </div>
      </div>
    );
  };

  if (isCheckingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-petrol text-white">
        <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-5 text-center shadow-2xl">
          <LockKeyhole className="mx-auto h-7 w-7 text-brand-yellow" />
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-300">
            Verificando sesión
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-dvh bg-brand-petrol text-white">
        <div className="grid min-h-dvh lg:grid-cols-12">
          <section className="relative hidden h-dvh min-h-dvh overflow-hidden bg-brand-petrol-dark px-8 py-8 lg:col-span-7 lg:flex lg:flex-col xl:px-10 xl:py-12">
            <LoginFeaturedProject className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,183,77,0.12)_0%,rgba(45,91,55,0.08)_38%,transparent_70%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-48 bg-gradient-to-r from-transparent to-brand-petrol" />
            <div className="absolute left-8 top-8 z-10 opacity-88 xl:left-10 xl:top-10">
              <Logo textColor="light" className="scale-90 origin-top-left" />
            </div>
          </section>

          <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-5 sm:px-6 sm:py-8 lg:col-span-5 lg:px-8 xl:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,92,0,0.18),transparent_34%),linear-gradient(180deg,rgba(21,23,28,0.92),rgba(15,31,36,1))] lg:hidden" />
            <div className="relative z-10 w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[440px]">
              <div className="mb-5 flex justify-center lg:hidden">
                <Logo textColor="light" />
              </div>

              <div className="-mx-4 mb-5 h-[clamp(180px,42vw,320px)] overflow-hidden sm:-mx-6 lg:hidden">
                <LoginFeaturedProject className="h-full w-full" />
              </div>

              <form onSubmit={handleLogin} className="relative overflow-hidden rounded-2xl border border-white/70 bg-white p-5 text-brand-dark shadow-[0_34px_90px_rgba(4,12,18,0.32)] sm:p-7">
                <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-brand-yellow/14 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-brand-green/10 blur-3xl" />

                <div className="relative mb-7 text-center">
                  <div className="mx-auto flex justify-center">
                    <Logo className="h-auto w-52 max-w-full sm:w-64" />
                  </div>
                  
                </div>

                <div className="relative space-y-4">
                  <label className="space-y-2 block">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Correo</span>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-petrol/45" />
                      <input
                        type="email"
                        value={loginData.email}
                        onChange={(event) => setLoginData((current) => ({ ...current, email: event.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pl-11 text-sm text-brand-dark outline-none transition placeholder:text-gray-400 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10"
                        placeholder="Insertar usuario"
                      />
                    </div>
                  </label>

                  <label className="space-y-2 block">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Contrasena</span>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-petrol/45" />
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(event) => setLoginData((current) => ({ ...current, password: event.target.value }))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pl-11 text-sm text-brand-dark outline-none transition placeholder:text-gray-400 focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10"
                        placeholder="Contrasena"
                      />
                    </div>
                  </label>
                </div>

                {loginError && (
                  <p className="relative mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-yellow px-4 py-3.5 text-sm font-extrabold text-brand-dark shadow-[0_18px_34px_rgba(255,92,0,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-light disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70 cursor-pointer"
                >
                  <LockKeyhole className="h-4 w-4" />
                  {isLoggingIn ? 'Ingresando...' : 'Ingresar'}
                </button>
              
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6f8] text-brand-dark">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-brand-petrol text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <Logo textColor="light" className="scale-90 origin-left" />
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Cerrar menu lateral"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                    isActive
                      ? 'bg-brand-yellow text-brand-dark shadow-lg shadow-brand-yellow/20'
                      : 'text-gray-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold leading-tight">{section.label}</span>
                    <span className={`block text-xs ${isActive ? 'text-brand-dark/70' : 'text-gray-500'}`}>
                      {section.description}
                    </span>
                  </span>
                  <ChevronRight className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-30'}`} />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center justify-center gap-3 border-t border-white/10 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:border-brand-yellow hover:bg-white/10"
              title="Cerrar sesion"
              aria-label="Cerrar sesion"
            >
              <LockKeyhole className="h-5 w-5" />
            </button>
            <a
              href="/"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
              title="Ver landing"
              aria-label="Ver landing"
            >
              <Eye className="h-5 w-5" />
            </a>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-brand-dark/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar panel lateral"
        />
      )}

      {toast && (
        <div className="fixed right-4 top-4 z-[140] w-[calc(100%-2rem)] max-w-sm sm:right-6 sm:top-6">
          <div
            className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-2xl shadow-brand-petrol/15 ${
              toast.type === 'success'
                ? 'border-brand-green/25'
                : toast.type === 'error'
                ? 'border-red-200'
                : toast.type === 'warning'
                ? 'border-brand-yellow/30'
                : 'border-gray-200'
            }`}
          >
            <div
              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                toast.type === 'success'
                  ? 'bg-brand-green/10 text-brand-green'
                  : toast.type === 'error'
                  ? 'bg-red-50 text-red-600'
                  : toast.type === 'warning'
                  ? 'bg-brand-yellow/12 text-brand-yellow-dark'
                  : 'bg-brand-light text-brand-petrol'
              }`}
            >
              {toast.type === 'success' ? <Check className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-brand-petrol">
                {toast.type === 'success' ? 'Operacion completada' : toast.type === 'error' ? 'No se pudo completar' : 'Atencion'}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-brand-petrol"
              aria-label="Cerrar alerta"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-3 px-3 py-3 sm:px-5 lg:px-6 xl:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg border border-gray-200 bg-white p-2 text-brand-petrol shadow-sm lg:hidden"
                aria-label="Abrir menu lateral"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-dark">
                  Panel administrativo
                </p>
                <h1 className="truncate text-base font-extrabold text-brand-petrol sm:text-xl lg:text-2xl">
                  Administración
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-brand-petrol transition hover:border-brand-yellow"
                title="Ver landing"
                aria-label="Ver landing"
              >
                <Eye className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-yellow px-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow-light sm:px-4"
              >
                {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                <span className="hidden sm:inline">{saved ? 'Guardado' : 'Guardar'}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="px-3 py-4 sm:px-5 sm:py-6 lg:px-6 xl:px-8">
          <section className="grid gap-5 lg:grid-cols-12 xl:gap-6">
            <div className="lg:col-span-8">{renderSectionEditor()}</div>

            <aside className="space-y-5 lg:col-span-4 xl:space-y-6">
              {renderContextPanel()}

              <div className="rounded-lg border border-gray-200 bg-brand-petrol p-5 text-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-yellow p-2 text-brand-dark">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold">Configuración lista</h3>
                    <p className="text-xs text-gray-300">Preparado para conectar CMS, API o base de datos.</p>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
      {/* Project Form Modal */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-2 backdrop-blur-sm sm:p-4">
          <div className="relative flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setProjectModalOpen(false)}
              className="absolute right-4 top-4 z-20 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-brand-petrol"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="shrink-0 border-b border-gray-100 px-5 py-4 pr-16 sm:px-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-yellow-dark">Portafolio</p>
              <h3 className="mt-1 font-outfit text-xl font-extrabold text-brand-petrol sm:text-2xl">
                {editingProject ? 'Editar Proyecto' : 'Agregar Nuevo Proyecto'}
              </h3>
            </div>
            
            <form onSubmit={handleSaveProject} className="min-h-0 flex-1 overflow-y-auto">
              <div className="grid gap-0 lg:grid-cols-[minmax(300px,0.9fr)_minmax(420px,1.1fr)]">
                <div className="bg-brand-petrol-dark p-4 text-white sm:p-5 lg:sticky lg:top-0 lg:h-[calc(94dvh-89px)]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-yellow">Vista previa</p>
                      <p className="mt-1 text-xs text-white/55">Imagen o video completo del proyecto</p>
                    </div>
                    {(projectForm.image_url || projectForm.video_url) && (
                      <span className="rounded-full bg-brand-green/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-green-light">
                        Cargado
                      </span>
                    )}
                  </div>
                  <div className="flex h-[min(52dvh,520px)] min-h-[260px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/30 lg:h-[calc(100%-58px)] lg:min-h-0">
                    {projectForm.video_url ? (
                      <video
                        src={projectForm.video_optimized_url || projectForm.video_url}
                        poster={projectForm.video_poster_url || projectForm.image_webp_url || projectForm.image_url}
                        className="h-full w-full object-contain"
                        controls
                        playsInline
                      />
                    ) : projectForm.image_url ? (
                      <img
                        src={projectForm.image_webp_url || projectForm.image_url}
                        className="h-full w-full object-contain"
                        alt="Vista completa del proyecto"
                      />
                    ) : (
                      <div className="px-6 text-center">
                        <Image className="mx-auto h-12 w-12 text-white/25" />
                        <p className="mt-3 text-sm font-bold text-white/80">Sin archivo multimedia</p>
                        <p className="mt-1 text-xs leading-relaxed text-white/45">Sube una imagen o video para verlo aqui completo.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 bg-white p-4 shadow-sm sm:p-5">
                  <div className="border-b border-gray-100 pb-3">
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-yellow-dark">Datos del proyecto</p>
                    <p className="mt-1 text-sm text-gray-500">Completa la informacion visible en el portafolio.</p>
                  </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 block sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Título del Proyecto</span>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={e => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                    className={fieldClasses}
                    placeholder="Ej. Control Volumétrico y Estabilidad de Taludes"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-outfit">Categoría</span>
                  <select
                    value={projectForm.category}
                    onChange={e => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                    className={fieldClasses}
                  >
                    {activeProjectSectors.map((sector) => (
                      <option key={sector.id} value={sector.slug}>
                        {sector.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 block">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Ubicación</span>
                  <input
                    type="text"
                    required
                    value={projectForm.location}
                    onChange={e => setProjectForm(prev => ({ ...prev, location: e.target.value }))}
                    className={fieldClasses}
                    placeholder="Ej. Pasco, Perú"
                  />
                </label>

                <div className="space-y-1 block sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Descripcion / Detalles Tecnicos</span>
                  <textarea
                    required
                    rows={4}
                    value={projectForm.description}
                    onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    className={fieldClasses}
                    placeholder="Describe los trabajos realizados..."
                  />
                </div>

                <div className="border border-gray-200 rounded-xl p-4 sm:col-span-2 bg-gray-50 space-y-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-petrol block font-outfit">Archivo multimedia</span>
                    <span className="text-[11px] font-semibold text-gray-500">Imagen o video para el proyecto</span>
                  </div>

                  {(projectForm.image_url || projectForm.video_url) && (
                    <div className="flex flex-wrap gap-2">
                      {projectForm.image_url && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-green">
                          <Check className="h-4 w-4" /> Imagen cargada
                        </span>
                      )}
                      {projectForm.video_url && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-green">
                          <Check className="h-4 w-4" /> Video cargado
                        </span>
                      )}
                    </div>
                  )}

                  <label
                    onDragOver={handleMediaDragOver}
                    onDragLeave={handleMediaDragLeave}
                    onDrop={handleMediaDrop}
                    className={[
                      'flex min-h-28 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white p-4 text-center transition',
                      isMediaDragging ? 'border-brand-yellow bg-brand-yellow/5' : 'border-gray-300 hover:bg-gray-50',
                      isUploading ? 'cursor-wait opacity-80' : 'cursor-pointer',
                    ].join(' ')}
                  >
                    <Upload className={[
                      'h-7 w-7 text-gray-400',
                      isMediaDragging || isUploading ? 'animate-bounce text-brand-yellow-dark' : 'animate-pulse',
                    ].join(' ')} />
                    <span className="mt-2 text-sm font-bold text-brand-petrol">
                      {isMediaDragging ? 'Suelta el archivo aqui' : 'Subir o arrastrar imagen/video'}
                    </span>
                    <span className="mt-1 text-xs font-semibold text-gray-500">Formatos aceptados: imagenes y videos</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>

                  {uploadProgress && (
                    <div className="rounded-lg border border-brand-yellow/20 bg-brand-yellow/10 px-4 py-3">
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-brand-petrol">
                        <span className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-brand-yellow animate-ping" />
                          {uploadProgress}
                        </span>
                        <span>{uploadPercent}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80">
                        <div
                          className="h-full rounded-full bg-brand-yellow transition-all duration-300 ease-out"
                          style={{ width: uploadPercent + '%' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>

              <div className="sticky bottom-0 -mx-4 flex justify-end gap-3 border-t border-gray-100 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-5 sm:px-5">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-brand-petrol hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject || isUploading}
                  className="rounded-lg bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-dark shadow-lg hover:bg-brand-yellow-light transition disabled:opacity-50 cursor-pointer"
                >
                  {isSavingProject ? 'Guardando...' : 'Guardar Proyecto'}
                </button>
              </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {sectorToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="border-b border-gray-100 bg-brand-light px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">Confirmar eliminacion</p>
                  <h3 className="font-outfit text-xl font-extrabold text-brand-petrol">Eliminar sector</h3>
                </div>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm leading-relaxed text-gray-600">
                Vas a eliminar el sector <strong className="text-brand-petrol">"{sectorToDelete.name}"</strong>. Esta accion no se puede deshacer.
              </p>
              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSectorToDelete(null)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-brand-petrol transition hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteSector}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
                >
                  Eliminar sector
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
            <h3 className="font-outfit text-xl font-extrabold text-brand-petrol mb-3">
              ¿Eliminar Proyecto?
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              ¿Estás seguro de que deseas eliminar el proyecto <strong className="text-brand-petrol">"{projectToDelete?.title}"</strong>? Esta acción no se puede deshacer y el proyecto se eliminará definitivamente de Supabase.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-brand-petrol hover:bg-gray-50 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeletingProject}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
              >
                {isDeletingProject ? 'Eliminando...' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
