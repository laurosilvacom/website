# Layout System

## Container Widths

The site uses a single `Container` component with semantic width presets. No
nested max-widths allowed.

### Width Presets

```tsx
import Container from '@/components/container'

// narrow: 680px - Reading width for blog posts and long-form content
<Container width="narrow">

// base: 1080px - Default for most pages (about, services, forms)
<Container width="base">

// wide: 1400px - Multi-column layouts (blog lists, grids, marketing)
<Container width="wide">

// full: no max-width - Hero sections, full-bleed images
<Container width="full">
```

### Horizontal Padding

Consistent across all widths:

- Mobile: `px-6` (24px)
- Desktop: `lg:px-12` (48px)

### Page Types

| Page Type                     | Width            | Usage                                               |
| ----------------------------- | ---------------- | --------------------------------------------------- |
| Blog post content             | `narrow`         | Optimal reading experience, ~65 characters per line |
| About, Services, Contact      | `base`           | Single-column pages with mixed content              |
| Blog list, Tags, Grid layouts | `wide`           | Multi-column card grids                             |
| Hero sections                 | `wide` or `full` | Large headers with imagery                          |

### Rules

1. **One container, one width** - Never nest `max-w-*` utilities inside
   `Container`
2. **No arbitrary widths** - Use semantic presets, not `max-w-3xl` or
   `max-w-[680px]`
3. **Prose inherits** - `.prose` class has no width constraint, inherits from
   container
4. **Content flows** - Let typography breathe within the container boundaries

### Example: Blog Post

```tsx
// Header section
<Container width="narrow">
  <h1>{title}</h1>
  <p>{summary}</p>
</Container>

// Article content
<Container width="base">
  <div className="grid lg:grid-cols-12 gap-20">
    <div className="lg:col-span-8">
      <div className="prose">
        <PortableText blocks={content} />
      </div>
    </div>
    <aside className="lg:col-span-4">
      <TocSidebar />
    </aside>
  </div>
</Container>
```

### Example: Marketing Page

```tsx
// Hero
<Container width="wide">
  <div className="grid lg:grid-cols-12 gap-16">
    <div className="lg:col-span-7">
      <h1>Title</h1>
      <p>Description</p>
    </div>
    <div className="lg:col-span-5">
      <Image />
    </div>
  </div>
</Container>

// Content sections
<Container width="base">
  <h2>Section Title</h2>
  <p>Section content flows naturally within base width</p>
</Container>
```

## Vertical Spacing

Consistent section spacing:

- Mobile: `py-16` (64px)
- Desktop: `lg:py-24` (96px)
- Headers: `pt-32 pb-16 lg:pt-40 lg:pb-24`

## Grid Layouts

Use Tailwind grid utilities inside containers:

```tsx
<Container width="wide">
	<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
		{/* Cards */}
	</div>
</Container>
```

## Migration Checklist

When updating pages:

1. ✅ Remove all `mx-auto max-w-*` wrapper divs
2. ✅ Change `size="sm|md|lg|xl"` to `width="narrow|base|wide|full"`
3. ✅ Remove nested `max-w-*` utilities from child elements
4. ✅ Let content use full container width
5. ✅ Use grid for multi-column layouts
