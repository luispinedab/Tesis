import { NbMenuItem } from '@nebular/theme';



export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'MENU',
    group: true,
  },
  {
    title: 'Administrar',
    icon: 'star',
    children: [
      {
        title: 'Administrar Usuarios',
        link: '/pages/administrar/administrar-usuarios',
        
      },
      {
        title: 'Administrar Cursos',
        link: '/pages/administrar/administrar-cursos',
      },
      {
        title: 'Administrar Asignaturas',
        link: '/pages/administrar/administrar-asignaturas',
      },
      {
        title: 'Administrar Logros',
        link: '/pages/administrar/administrar-logros',
      },
    ],
  },
  {
    title: 'Admisión',
    icon: 'layout-outline',
    children: [
      {
        title: 'Enviar Formulario',
        link: '/pages/admision/admision-formulario',
      },
      {
        title: 'Evaluación',
        link: '/pages/admision/evaluacion',
      }
    ],
  },
  {
    title: 'Admisión',
    icon: 'layout-outline',
    children: [
      {
        title: 'Horario de Atención',
        link: '/pages/secretaria/admision-horario',
      },
      {
        title: 'Crear Usuario',
        link: '/pages/secretaria/crearusuario',
      },
      {
        title: 'Asignar Cursos',
        link: '/pages/secretaria/asignarcursos',
      },
      {
        title: 'Registrar Nota',
        link: '/pages/secretaria/registrarnota',
      },
    ],
  },
  {
    title: 'Consultar',
    icon: 'layout-outline',
    children: [
      {
        title: 'Consultar Información Estudiantes',
        link: '/pages/secretaria/descargarinfo',
      },
    ],
  },
  {
    title: 'Observaciones',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ver Observaciones',
        link: '/pages/comite/observaciones-ver',
      },
      {
        title: 'Agregar Observaciones',
        link: '/pages/comite/observaciones-add',
      },
      {
        title: 'Editar Observaciones',
        link: '/pages/comite/observaciones-edit',
      },
    ],
  },
  {
    title: 'Gestionar Notas',
    icon: 'layout-outline',
    children: [
      {
        title: 'Asignar logros',
        link: '/pages/docente/Asignarlogros',
      },
      {
        title: 'Gestionar Notas',
        link: '/pages/docente/Notas',
      }
    ],
  },
  {
    title: 'Reportar Fallas',
    icon: 'layout-outline',
    children: [
      {
        title: 'Reportar Fallas',
        link: '/pages/docente/Fallas',
      }
    ],
  },
  {
    title: 'Consultar',
    icon: 'layout-outline',
    children: [
      {
        title: 'Consultar Fallas',
        link: '/pages/estudiante/Consultarfallas',
      },
      {
        title: 'Consultar Observaciones',
        link: '/pages/estudiante/Consultarobservaciones',
      },
      {
        title: 'Consultar Notas',
        link: '/pages/estudiante/Consultarnotas',
      }
    ],
  },
];
