
# Layout System

This document explains the layout system used in the PJIAE Digital Appraisal System.

## MainLayout Component

The `MainLayout` component provides a consistent structure for all pages in the application. It includes:

- Fixed TopBar navigation
- Collapsible sidebar
- Main content area with standardized spacing

### Usage

```tsx
import MainLayout from '@/components/layouts/MainLayout';

const MyPage = () => {
  return (
    <MainLayout>
      {/* Your page content here */}
      <PageHeader title="My Page" subtitle="Description" />
      <Card>
        {/* Card content */}
      </Card>
    </MainLayout>
  );
};
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | (required) | Page content |
| `fullWidth` | boolean | `false` | If true, content expands to full width of container |
| `className` | string | - | Optional additional classes for the main content area |

## Layout Variables

The layout system uses CSS variables to maintain consistent spacing:

- `--header-height`: 64px - Height of the fixed TopBar
- `--sidebar-width`: 280px - Width of the expanded sidebar

## Page Wrapper

For consistent vertical spacing between page elements, use the `.page-wrapper` utility class:

```tsx
<MainLayout>
  <div className="page-wrapper">
    <PageHeader title="My Page" subtitle="Description" />
    <Card>
      {/* Card content */}
    </Card>
    <Card>
      {/* Another card */}
    </Card>
  </div>
</MainLayout>
```

## Best Practices

1. **Always** use `MainLayout` as the wrapper for page components
2. Use `PageHeader` for consistent page titles
3. Avoid custom margin/padding on top-level page elements
4. Use the `space-y-6` utility (or `page-wrapper`) for consistent vertical spacing between components
5. For custom layouts, extend the `MainLayout` rather than building from scratch
