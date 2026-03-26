# Organizathor

Esta aplicación funciona con mi API de gestión personal. Ver la API aquí: https://github.com/Osunita/api-gestion-personal

Aplicación web de productividad para gestionar tareas, notas y categorías con categorización automática basada en palabras clave.

## 📋 Funcionalidades

- **Tareas**: Crear, editar, completar y eliminar tareas con prioridades (Baja, Media, Alta)
- **Notas**: Crear notas con colores personalizados
- **Categorización automática**: La API detecta palabras clave y asigna categorías automáticamente
- **Dashboard**: Estadísticas visuales con gráficos
- **Filtros**: Filtrar por fecha, prioridad, estado y categoría
- **Modo oscuro**: Soporte para tema claro y oscuro
- **JWT Auth**: Seguridad con tokens JWT

## 🛠️ Tecnologías

- **Angular 17+** - Framework SPA
- **Bootstrap 5** - Estilos y componentes
- **Chart.js** - Gráficos estadísticos
- **Angular CDK** - Drag & Drop

## 🚀 Cómo ejecutar

```bash
cd dashboard
npm install
npm start
```

La app estará en: `http://localhost:4200`

## 📁 Estructura

```
dashboard/
└── src/app/
    ├── auth/           # Login y registro
    ├── core/           # Modelos y servicios
    ├── dashboard/      # Página principal con gráficos
    ├── tasks/         # Gestión de tareas
    ├── notes/         # Gestión de notas
    └── shared/        # Componentes compartidos
```
