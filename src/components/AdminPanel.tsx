import { useEffect, useState } from 'react';
import {
  BarChart3,
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
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
  User,
  X,
} from 'lucide-react';
import Logo from './Logo';
import minaTajoAbiertoImg from '../assets/mina_tajo_abierto.png';
import tunelSubterraneoImg from '../assets/tunel_subterraneo.png';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from '../lib/projects';
import { uploadImageToCloudinary, uploadVideoToCloudinary } from '../lib/cloudinary';

type AdminSectionId = 'servicios' | 'proyectos' | 'contacto';

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

const quickStats = [
  { label: 'Secciones', value: '3', icon: LayoutDashboard },
  { label: 'Gestionables', value: '3', icon: FolderKanban },
  { label: 'Leads demo', value: '24', icon: BarChart3 },
  { label: 'Publicación', value: 'Web', icon: ShieldCheck },
];

const serviceItems = [
  'Levantamientos Topográficos',
  'Replanteo de Obras',
  'Georreferenciación',
  'Control Topográfico de Obra',
  'Curvas de Nivel',
  'Planos Topográficos',
  'Cubicación',
  'Movimiento de Tierras',
  'Topografía Minera',
  'Fotogrametría con Dron',
];

const projectItems = [
  {
    title: 'Control Volumétrico y Taludes',
    category: 'Minería',
    location: 'Pasco, Perú',
    description: 'Cubicación mensual de stock y control de estabilidad en zona minera.',
    precision: '+/-2 cm instrumental',
    image: minaTajoAbiertoImg,
  },
  {
    title: 'Levantamiento Catastral y Ortomosaico',
    category: 'Drones',
    location: 'Lima Provincias',
    description: 'Fotogrametría con dron, ortofoto digital y documentación técnica.',
    precision: 'GSD 3.2 cm/px',
  },
  {
    title: 'Replanteo de Ejes y Verticalidad',
    category: 'Construcción',
    location: 'Lima Metropolitana',
    description: 'Control geométrico de cimentaciones, anclajes y verticalidad estructural.',
    precision: '+/-1.5 mm angular',
  },
  {
    title: 'Topografía Subterránea y Galerías',
    category: 'Minería',
    location: 'Arequipa, Perú',
    description: 'Registro técnico de túneles, galerías y frentes de avance.',
    precision: '+/-1 mm nube de puntos',
    image: tunelSubterraneoImg,
  },
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

const ADMIN_EMAIL = 'admin@mingeotop.com';

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
  const [loginData, setLoginData] = useState({ email: ADMIN_EMAIL, password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState<AdminSectionId>('proyectos');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(false);

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
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeletingProject, setIsDeletingProject] = useState(false);

  // Drag and Drop States
  const [isImageDragging, setIsImageDragging] = useState(false);
  const [isVideoDragging, setIsVideoDragging] = useState(false);

  const loadProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const list = await getAllProjects();
      setDbProjects(list);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const uploadImageFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress('Subiendo imagen a Cloudinary...');
    try {
      const res = await uploadImageToCloudinary(file);
      setProjectForm(prev => ({
        ...prev,
        image_url: res.originalUrl,
        image_webp_url: res.webpUrl
      }));
      setUploadProgress('Imagen subida con éxito.');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      alert('Error al subir la imagen: ' + err.message);
      setUploadProgress('Error al subir imagen.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImageFile(file);
    }
  };

  const uploadVideoFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress('Subiendo video a Cloudinary (esto puede tardar)...');
    try {
      const res = await uploadVideoToCloudinary(file);
      setProjectForm(prev => ({
        ...prev,
        video_url: res.originalUrl,
        video_optimized_url: res.optimizedUrl,
        video_poster_url: res.posterUrl
      }));
      setUploadProgress('Video subido con éxito.');
    } catch (err: any) {
      console.error('Error uploading video:', err);
      alert('Error al subir el video: ' + err.message);
      setUploadProgress('Error al subir video.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadVideoFile(file);
    }
  };

  // Drag and Drop Event Handlers
  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsImageDragging(true);
  };
  const handleImageDragLeave = () => {
    setIsImageDragging(false);
  };
  const handleImageDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsImageDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await uploadImageFile(file);
    } else if (file) {
      alert('Por favor, arrastra un archivo de imagen válido.');
    }
  };

  const handleVideoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsVideoDragging(true);
  };
  const handleVideoDragLeave = () => {
    setIsVideoDragging(false);
  };
  const handleVideoDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsVideoDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      await uploadVideoFile(file);
    } else if (file) {
      alert('Por favor, arrastra un archivo de video válido.');
    }
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'mineria',
      location: '',
      description: '',
      precision_label: '',
      sort_order: dbProjects.length + 1,
      status: 'draft',
      image_url: '',
      image_webp_url: '',
      video_url: '',
      video_optimized_url: '',
      video_poster_url: '',
    });
    setUploadProgress('');
    setProjectModalOpen(true);
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
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!projectForm.title) {
      alert('Por favor ingrese un título.');
      return;
    }

    setIsSavingProject(true);
    try {
      const payload: any = {
        title: projectForm.title,
        category: projectForm.category,
        location: projectForm.location || null,
        description: projectForm.description,
        precision_label: projectForm.precision_label || null,
        sort_order: Number(projectForm.sort_order),
        status: projectForm.status,
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
    } catch (err: any) {
      console.error('Error saving project:', err);
      alert('Error al guardar el proyecto: ' + err.message);
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
    } catch (err: any) {
      console.error('Error deleting project:', err);
      alert('Error al eliminar el proyecto: ' + err.message);
    } finally {
      setIsDeletingProject(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const editableSection = activeSection;
  const selectedContent = content[editableSection];
  const isCurrentSectionManaged = isManagedSection(activeSection);

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
    setLoginData({ email: ADMIN_EMAIL, password: '' });
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
                  Gestión de Proyectos en Supabase
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Agrega, edita y elimina los proyectos que se muestran en el portafolio de la landing page.
                </p>
              </div>
              <button
                type="button"
                onClick={openAddProjectModal}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-petrol px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-brand-petrol-dark transition duration-300 cursor-pointer"
              >
                <Plus className="h-5 w-5" />
                Agregar Proyecto
              </button>
            </div>

            {isLoadingProjects ? (
              <AdminProjectRowsSkeleton />
            ) : dbProjects.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <FolderKanban className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-base font-semibold">No hay proyectos registrados en Supabase</p>
                <p className="mt-2 text-sm text-gray-400">Usa el botón de arriba para registrar tu primer proyecto.</p>
              </div>
            ) : (
              <div className="mt-6 divide-y divide-gray-100">
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
                    <div className="flex gap-2 self-end sm:self-center">
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
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-dark">
              {activeSection === 'servicios'
                ? 'Catálogo comercial'
                : activeSection === 'contacto'
                  ? 'Canales de atención'
                  : 'Editor de contenido'}
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

          {activeSection === 'servicios' && (
            <div className="rounded-lg border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <h3 className="font-extrabold text-brand-petrol">Servicios visibles</h3>
                <button className="inline-flex items-center gap-2 rounded-lg bg-brand-petrol px-3 py-2 text-xs font-bold text-white">
                  <Plus className="h-4 w-4" />
                  Agregar
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {serviceItems.slice(0, 6).map((service, index) => (
                  <div key={service} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-brand-petrol">{service}</p>
                      <p className="text-xs text-gray-500">Código MT-0{index + 1}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-brand-petrol">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'contacto' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div key={channel.label} className="rounded-lg border border-gray-200 bg-brand-light p-4">
                    <div className="flex items-center gap-3">
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
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="font-extrabold text-brand-petrol">Listado completo</h3>
          <div className="mt-4 space-y-2">
            {serviceItems.map((service, index) => (
              <button key={service} className="flex w-full items-center justify-between rounded-lg bg-brand-light px-3 py-2 text-left text-sm hover:bg-brand-yellow/10">
                <span className="font-semibold text-brand-petrol">{service}</span>
                <span className="text-xs font-bold text-gray-400">MT-{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
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
      <div className="min-h-screen bg-brand-petrol text-white">
        <div className="grid min-h-screen lg:grid-cols-12">
          <section className="hidden bg-topo-grid bg-topo-contour px-10 py-12 lg:col-span-7 lg:flex lg:flex-col lg:justify-between">
            <Logo textColor="light" />
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-yellow">
                Acceso administrativo
              </p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight font-outfit">
                Controla la landing page desde un panel privado.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-gray-300">
                Gestiona secciones, mensajes comerciales, estado de publicación y datos de contacto de MINGEOTOP E.I.R.L.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <ShieldCheck className="h-5 w-5 text-brand-green-light" />
              <span>Base visual preparada para autenticacion real con backend.</span>
            </div>
          </section>

          <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:col-span-5 lg:px-10">
            <div className="w-full max-w-md">
              <div className="mb-8 flex justify-center lg:hidden">
                <Logo textColor="light" />
              </div>

              <form onSubmit={handleLogin} className="rounded-lg border border-white/10 bg-white p-6 text-brand-dark shadow-2xl sm:p-8">
                <div className="mb-6">
                  <div className="mb-4 inline-flex rounded-lg bg-brand-yellow/10 p-3 text-brand-yellow-dark">
                    <LockKeyhole className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-dark">
                    Login
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold text-brand-petrol font-outfit">
                    Panel administrativo
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Ingresa con las credenciales de administración para modificar la landing.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="space-y-2 block">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Correo</span>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={loginData.email}
                        onChange={(event) => setLoginData((current) => ({ ...current, email: event.target.value }))}
                        className={`${fieldClasses} pl-11`}
                        placeholder="admin@mingeotop.com"
                      />
                    </div>
                  </label>

                  <label className="space-y-2 block">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Contraseña</span>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(event) => setLoginData((current) => ({ ...current, password: event.target.value }))}
                        className={`${fieldClasses} pl-11`}
                        placeholder="Contraseña"
                      />
                    </div>
                  </label>
                </div>

                {loginError && (
                  <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow-light disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  <LockKeyhole className="h-4 w-4" />
                  {isLoggingIn ? 'Ingresando...' : 'Ingresar al panel'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsAuthenticated(true);
                    setIsCheckingSession(false);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-brand-petrol transition hover:bg-brand-light cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4 text-brand-green" />
                  Acceso Rápido (Desarrollo)
                </button>

                <div className="mt-5 rounded-lg bg-brand-light p-4 text-xs leading-relaxed text-gray-500">
                  <strong className="text-brand-petrol">Usuario admin:</strong> {ADMIN_EMAIL}
                  <br />
                  La contraseña se valida directamente con Supabase Auth.
                </div>
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

          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-brand-yellow hover:bg-white/10"
            >
              <LockKeyhole className="h-4 w-4" />
              Cerrar sesión
            </button>
            <a
              href="/"
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
            >
              <Eye className="h-4 w-4" />
              Ver landing
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

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
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
                <h1 className="text-xl font-extrabold text-brand-petrol sm:text-2xl">
                  Administración de landing page
                </h1>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-brand-petrol transition hover:border-brand-yellow"
              >
                <Eye className="h-4 w-4" />
                Previsualizar
              </a>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow-light"
              >
                {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                {saved ? 'Guardado' : 'Guardar'}
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</p>
                      <p className="mt-2 text-3xl font-extrabold text-brand-petrol">{stat.value}</p>
                    </div>
                    <div className="rounded-lg bg-brand-green/10 p-3 text-brand-green">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-12">
            <div className="xl:col-span-8">{renderSectionEditor()}</div>

            <aside className="space-y-6 xl:col-span-4">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setProjectModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-brand-petrol hover:bg-gray-100 p-2 rounded-lg transition"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-outfit text-2xl font-extrabold text-brand-petrol mb-6">
              {editingProject ? 'Editar Proyecto' : 'Agregar Nuevo Proyecto'}
            </h3>
            
            <form onSubmit={handleSaveProject} className="space-y-4">
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
                    <option value="mineria">Minería</option>
                    <option value="construccion">Construcción Civil</option>
                    <option value="vias">Carreteras</option>
                    <option value="dron">Drones & Catastro</option>
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

                <label className="space-y-1 block">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Precisión Instrumental</span>
                  <input
                    type="text"
                    required
                    value={projectForm.precision_label}
                    onChange={e => setProjectForm(prev => ({ ...prev, precision_label: e.target.value }))}
                    className={fieldClasses}
                    placeholder="Ej. ±2 cm instrumental"
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Orden de Visualización</span>
                  <input
                    type="number"
                    min="0"
                    required
                    value={projectForm.sort_order}
                    onChange={e => setProjectForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    className={fieldClasses}
                  />
                </label>

                <label className="space-y-1 block">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-outfit">Estado</span>
                  <select
                    value={projectForm.status}
                    onChange={e => setProjectForm(prev => ({ ...prev, status: e.target.value as any }))}
                    className={fieldClasses}
                  >
                    <option value="published">Publicado</option>
                    <option value="draft">Borrador</option>
                    <option value="review">Revisión</option>
                  </select>
                </label>

                <div className="space-y-1 block sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Descripción / Detalles Técnicos</span>
                  <textarea
                    required
                    rows={3}
                    value={projectForm.description}
                    onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    className={fieldClasses}
                    placeholder="Describe los trabajos realizados..."
                  />
                </div>

                {/* Multimedia - Image */}
                <div className="border border-gray-200 rounded-xl p-4 sm:col-span-2 bg-gray-50 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-petrol block font-outfit">Imagen de Portada (Requerido)</span>
                  
                  {projectForm.image_url && (
                    <div className="relative h-28 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white">
                      <img src={projectForm.image_url} className="h-full w-full object-cover" alt="Vista previa" />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <label
                      onDragOver={handleImageDragOver}
                      onDragLeave={handleImageDragLeave}
                      onDrop={handleImageDrop}
                      className={`flex-1 flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-4 bg-white hover:bg-gray-50 cursor-pointer transition ${
                        isImageDragging ? 'border-brand-yellow bg-brand-yellow/5' : 'border-gray-300'
                      }`}
                    >
                      <Upload className={`h-6 w-6 text-gray-400 ${isImageDragging ? 'animate-bounce text-brand-yellow-dark' : 'animate-pulse'}`} />
                      <span className="mt-1 text-xs text-gray-500 font-semibold">
                        {isImageDragging ? '¡Suelta la imagen aquí!' : 'Subir o arrastrar imagen a Cloudinary'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                    
                    <div className="flex-1 flex flex-col justify-end space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">URL directa de imagen</span>
                      <input
                        type="text"
                        value={projectForm.image_url}
                        onChange={e => setProjectForm(prev => ({ ...prev, image_url: e.target.value, image_webp_url: e.target.value }))}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-brand-dark outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Multimedia - Video */}
                <div className="border border-gray-200 rounded-xl p-4 sm:col-span-2 bg-gray-50 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-petrol block font-outfit">Video del Proyecto (Opcional)</span>
                  
                  {projectForm.video_url && (
                    <div className="text-xs text-brand-green font-medium flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Video cargado: {projectForm.video_url.split('/').pop()}
                    </div>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <label
                      onDragOver={handleVideoDragOver}
                      onDragLeave={handleVideoDragLeave}
                      onDrop={handleVideoDrop}
                      className={`flex-1 flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-4 bg-white hover:bg-gray-50 cursor-pointer transition ${
                        isVideoDragging ? 'border-brand-yellow bg-brand-yellow/5' : 'border-gray-300'
                      }`}
                    >
                      <Upload className={`h-6 w-6 text-gray-400 ${isVideoDragging ? 'animate-bounce text-brand-yellow-dark' : 'animate-pulse'}`} />
                      <span className="mt-1 text-xs text-gray-500 font-semibold">
                        {isVideoDragging ? '¡Suelta el video aquí!' : 'Subir o arrastrar video a Cloudinary'}
                      </span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>

                    <div className="flex-1 flex flex-col justify-end space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">URL directa de video</span>
                      <input
                        type="text"
                        value={projectForm.video_url}
                        onChange={e => setProjectForm(prev => ({ ...prev, video_url: e.target.value, video_optimized_url: e.target.value }))}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-brand-dark outline-none"
                      />
                    </div>
                  </div>
                </div>

                {uploadProgress && (
                  <div className="sm:col-span-2 text-xs font-semibold text-brand-petrol bg-brand-yellow/10 rounded-lg px-4 py-2 border border-brand-yellow/20 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
                    {uploadProgress}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
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
            </form>
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
