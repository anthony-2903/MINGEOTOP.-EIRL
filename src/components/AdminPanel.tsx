import { useMemo, useState } from 'react';
import {
  BarChart3,
  Check,
  ChevronRight,
  Eye,
  FileText,
  FolderKanban,
  Globe2,
  Home,
  Image,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Map,
  Menu,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  User,
  Users,
  X,
} from 'lucide-react';
import Logo from './Logo';

type AdminSectionId =
  | 'resumen'
  | 'inicio'
  | 'nosotros'
  | 'servicios'
  | 'proyectos'
  | 'testimonios'
  | 'contacto'
  | 'seo';

type EditableItem = {
  title: string;
  description: string;
  status: 'Publicado' | 'Borrador' | 'Revision';
};

const sections: Array<{
  id: AdminSectionId;
  label: string;
  description: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: 'resumen', label: 'Resumen', description: 'Vista general', icon: LayoutDashboard },
  { id: 'inicio', label: 'Inicio', description: 'Hero y llamadas', icon: Home },
  { id: 'nosotros', label: 'Nosotros', description: 'Mision y valores', icon: Users },
  { id: 'servicios', label: 'Servicios', description: 'Catalogo comercial', icon: Map },
  { id: 'proyectos', label: 'Proyectos', description: 'Portafolio', icon: FolderKanban },
  { id: 'testimonios', label: 'Testimonios', description: 'Confianza social', icon: MessageCircle },
  { id: 'contacto', label: 'Contacto', description: 'Canales y formulario', icon: Mail },
  { id: 'seo', label: 'SEO', description: 'Busqueda y metadata', icon: Search },
];

const initialContent: Record<Exclude<AdminSectionId, 'resumen'>, EditableItem> = {
  inicio: {
    title: 'Ingenieria Topografica con Precision Milimetrica',
    description:
      'Soluciones integrales de topografia, geodesia y fotogrametria con drones para proyectos mineros, civiles, rurales, urbanos e industriales.',
    status: 'Publicado',
  },
  nosotros: {
    title: 'Comprometidos con la precision, tecnologia y experiencia en campo',
    description:
      'Presenta la trayectoria, mision, vision, valores y cobertura nacional de MINGEOTOP E.I.R.L.',
    status: 'Publicado',
  },
  servicios: {
    title: 'Soluciones geoespaciales y topografia especializada',
    description:
      'Administra levantamientos, replanteo, georreferenciacion, control de obra, cubicacion y fotogrametria.',
    status: 'Revision',
  },
  proyectos: {
    title: 'Proyectos de precision ejecutados con exito',
    description:
      'Controla casos destacados, categorias, clientes, ubicaciones, fichas tecnicas e imagenes del portafolio.',
    status: 'Publicado',
  },
  testimonios: {
    title: 'Opiniones de clientes y aliados',
    description:
      'Gestiona testimonios, cargos, empresas, calificaciones y mensajes visibles en la landing.',
    status: 'Borrador',
  },
  contacto: {
    title: 'Solicita tu cotizacion tecnica sin compromiso',
    description:
      'Actualiza telefono, WhatsApp, correo, direccion, servicios del formulario y mensaje de confirmacion.',
    status: 'Publicado',
  },
  seo: {
    title: 'MINGEOTOP E.I.R.L. | Topografia, Geodesia y Drones en Peru',
    description:
      'Define titulo del sitio, descripcion para buscadores, palabras clave, imagen social y estado de indexacion.',
    status: 'Revision',
  },
};

const quickStats = [
  { label: 'Secciones', value: '9', icon: LayoutDashboard },
  { label: 'Servicios', value: '10', icon: Map },
  { label: 'Proyectos', value: '6', icon: FolderKanban },
  { label: 'Leads demo', value: '24', icon: BarChart3 },
];

const recentChanges = [
  'Hero actualizado para resaltar precision milimetrica',
  'Servicios topograficos ordenados por prioridad comercial',
  'Portafolio segmentado por mineria, construccion, vias y drones',
  'Canales de contacto listos para WhatsApp, telefono y correo',
];

const heroActions = [
  { label: 'Boton principal', value: 'Solicitar Cotizacion', target: '#contacto' },
  { label: 'Boton secundario', value: 'Ver Servicios', target: '#servicios' },
  { label: 'Indicador clave', value: '+150 proyectos', target: 'Hero stats' },
];

const aboutBlocks = [
  { title: 'Nuestra Mision', text: 'Servicios topograficos y geodesicos de alta precision.' },
  { title: 'Nuestra Vision', text: 'Socio estrategico geoespacial a nivel nacional.' },
  { title: 'Valores Clave', text: 'Precision, seguridad, etica y trato personalizado.' },
];

const serviceItems = [
  'Levantamientos Topograficos',
  'Replanteo de Obras',
  'Georreferenciacion',
  'Control Topografico de Obra',
  'Curvas de Nivel',
  'Planos Topograficos',
  'Cubicacion',
  'Movimiento de Tierras',
  'Topografia Minera',
  'Fotogrametria con Dron',
];

const projectItems = [
  { title: 'Control Volumetrico y Taludes', category: 'Mineria', location: 'Pasco, Peru' },
  { title: 'Levantamiento Catastral y Ortomosaico', category: 'Drones', location: 'Lima Provincias' },
  { title: 'Replanteo de Ejes y Verticalidad', category: 'Construccion', location: 'Lima Metropolitana' },
  { title: 'Red Geodesica de Apoyo WGS84', category: 'Catastro', location: 'Huancavelica' },
];

const testimonialItems = [
  { name: 'Ing. Carlos Ramirez', role: 'Jefe de Proyecto', rating: 5 },
  { name: 'Mariela Torres', role: 'Administradora de Obra', rating: 5 },
  { name: 'Oscar Medina', role: 'Supervisor de Campo', rating: 4 },
];

const contactChannels = [
  { label: 'WhatsApp', value: '+51 913 386 354', icon: MessageCircle },
  { label: 'Telefono', value: '+51 913 386 354', icon: Phone },
  { label: 'Correo', value: 'mingeotop@gmail.com', icon: Mail },
  { label: 'TikTok', value: '@mingeotop', icon: Globe2 },
];

const seoChecks = [
  'Titulo menor a 60 caracteres',
  'Descripcion comercial clara',
  'Palabras clave por servicio',
  'Imagen social configurada',
  'URL canonica definida',
];

const fieldClasses =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/10';

const ADMIN_EMAIL = 'admin@mingeotop.com';
const ADMIN_PASSWORD = 'Mingeotop2026';
const AUTH_STORAGE_KEY = 'mingeotop-admin-auth';

function statusClasses(status: EditableItem['status']) {
  if (status === 'Publicado') return 'bg-brand-green/10 text-brand-green border-brand-green/20';
  if (status === 'Revision') return 'bg-brand-yellow/10 text-brand-yellow-dark border-brand-yellow/20';
  return 'bg-gray-100 text-gray-500 border-gray-200';
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  );
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState<AdminSectionId>('resumen');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [saved, setSaved] = useState(false);

  const editableSection = activeSection === 'resumen' ? 'inicio' : activeSection;
  const selectedContent = content[editableSection];

  const completion = useMemo(() => {
    const published = Object.values(content).filter((item) => item.status === 'Publicado').length;
    return Math.round((published / Object.keys(content).length) * 100);
  }, [content]);

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

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginData.email === ADMIN_EMAIL && loginData.password === ADMIN_PASSWORD) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
      return;
    }

    setLoginError('Credenciales incorrectas. Revisa el correo o la contrasena.');
  };

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setLoginData({ email: '', password: '' });
    setActiveSection('resumen');
  };

  const renderSectionEditor = () => {
    if (activeSection === 'resumen') {
      return (
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow-dark">
                  Estado general
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-brand-petrol">
                  La landing esta lista para administrarse por secciones
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
                  Cada area tiene su propio tipo de contenido, controles y listado lateral para revisar lo publicado sin perder contexto.
                </p>
              </div>
              <div className="rounded-lg bg-brand-petrol px-5 py-4 text-center text-white">
                <p className="text-3xl font-extrabold text-brand-yellow">{completion}%</p>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-300">Publicado</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-brand-petrol">Cambios recientes</h3>
            <div className="mt-4 space-y-3">
              {recentChanges.map((change) => (
                <div key={change} className="flex items-start gap-3 rounded-lg bg-brand-light p-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" />
                  <span className="text-sm text-gray-700">{change}</span>
                </div>
              ))}
            </div>
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
                ? 'Catalogo comercial'
                : activeSection === 'proyectos'
                  ? 'Portafolio publicado'
                  : activeSection === 'contacto'
                    ? 'Canales de atencion'
                    : activeSection === 'seo'
                      ? 'Configuracion de busqueda'
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
        </div>

        <div className="mt-6 grid gap-5">
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {activeSection === 'seo' ? 'Titulo SEO' : 'Titulo principal'}
            </span>
            <input
              value={selectedContent.title}
              onChange={(event) => updateContent('title', event.target.value)}
              className={fieldClasses}
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {activeSection === 'contacto' ? 'Mensaje de conversion' : 'Descripcion'}
            </span>
            <textarea
              value={selectedContent.description}
              onChange={(event) => updateContent('description', event.target.value)}
              rows={activeSection === 'inicio' ? 4 : 5}
              className={fieldClasses}
            />
          </label>

          {activeSection === 'inicio' && (
            <div className="grid gap-3 sm:grid-cols-3">
              {heroActions.map((action) => (
                <div key={action.label} className="rounded-lg border border-gray-200 bg-brand-light p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{action.label}</p>
                  <p className="mt-2 text-sm font-extrabold text-brand-petrol">{action.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{action.target}</p>
                </div>
              ))}
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
                      <p className="text-xs text-gray-500">Codigo MT-0{index + 1}</p>
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
              className={fieldClasses}
            >
              <option value="Publicado">Publicado</option>
              <option value="Revision">Revision</option>
              <option value="Borrador">Borrador</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-brand-petrol transition hover:border-brand-yellow"
          >
            <Image className="h-4 w-4" />
            Gestionar imagenes
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow-light"
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
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-extrabold text-brand-petrol">Proyectos cargados</h3>
            <button className="inline-flex items-center gap-2 rounded-lg bg-brand-petrol px-3 py-2 text-xs font-bold text-white">
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {projectItems.map((project) => (
              <div key={project.title} className="flex items-start justify-between gap-3 rounded-lg border border-gray-100 p-3">
                <div>
                  <p className="text-sm font-extrabold text-brand-petrol">{project.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{project.category} - {project.location}</p>
                </div>
                <button className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-brand-petrol" title="Editar proyecto">
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === 'nosotros') {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-extrabold text-brand-petrol">Bloques de contenido</h3>
            <button className="inline-flex items-center gap-2 rounded-lg bg-brand-petrol px-3 py-2 text-xs font-bold text-white">
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {aboutBlocks.map((block) => (
              <div key={block.title} className="flex items-start justify-between gap-3 rounded-lg bg-brand-light p-3">
                <div>
                  <p className="text-sm font-extrabold text-brand-petrol">{block.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{block.text}</p>
                </div>
                <button className="rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:text-brand-petrol" title="Editar bloque">
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === 'testimonios') {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-extrabold text-brand-petrol">Opiniones</h3>
            <button className="inline-flex items-center gap-2 rounded-lg bg-brand-petrol px-3 py-2 text-xs font-bold text-white">
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {testimonialItems.map((testimonial) => (
              <div key={testimonial.name} className="flex items-start justify-between gap-3 rounded-lg border border-gray-100 p-3">
                <div>
                  <div className="flex gap-1 text-brand-yellow-dark">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <Star key={index} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-extrabold text-brand-petrol">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
                <button className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:text-brand-petrol" title="Editar testimonio">
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            ))}
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
            {['Nombre completo', 'Celular / Telefono', 'Correo corporativo', 'Servicio requerido', 'Detalle del proyecto'].map((field) => (
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

    if (activeSection === 'seo') {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-extrabold text-brand-petrol">Checklist SEO</h3>
            <button className="inline-flex items-center gap-2 rounded-lg bg-brand-petrol px-3 py-2 text-xs font-bold text-white">
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {seoChecks.map((check) => (
              <div key={check} className="flex items-center justify-between gap-3 rounded-lg bg-brand-light p-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-brand-green" />
                  <span className="text-sm font-semibold text-brand-petrol">{check}</span>
                </div>
                <button className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-500 hover:text-brand-petrol" title="Editar criterio SEO">
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
                Gestiona secciones, mensajes comerciales, estado de publicacion, SEO y datos de contacto de MINGEOTOP E.I.R.L.
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
                    Ingresa con las credenciales de administracion para modificar la landing.
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
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Contrasena</span>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(event) => setLoginData((current) => ({ ...current, password: event.target.value }))}
                        className={`${fieldClasses} pl-11`}
                        placeholder="Contrasena"
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
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-yellow/20 transition hover:bg-brand-yellow-light"
                >
                  <LockKeyhole className="h-4 w-4" />
                  Ingresar al panel
                </button>

                <div className="mt-5 rounded-lg bg-brand-light p-4 text-xs leading-relaxed text-gray-500">
                  <strong className="text-brand-petrol">Demo:</strong> {ADMIN_EMAIL} / {ADMIN_PASSWORD}
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
              Cerrar sesion
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
                  Administracion de landing page
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
                    <h3 className="font-extrabold">Configuracion lista</h3>
                    <p className="text-xs text-gray-300">Preparado para conectar CMS, API o base de datos.</p>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
