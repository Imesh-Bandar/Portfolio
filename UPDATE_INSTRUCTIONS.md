# Portfolio Update Instructions

## Add DetailModal to Main Page

### Step 1: Modal is already imported
```tsx
import DetailModal from '@/components/DetailModal';
```

### Step 2: Modal state is already added
```tsx
const [selectedItem, setSelectedItem] = useState<any>(null);
const [modalType, setModalType] = useState<...>('project');
const [isModalOpen, setIsModalOpen] = useState(false);
```

### Step 3: Add DetailModal component before closing return

Add this BEFORE the final `</>` closing tag in the return statement:

```tsx
{/* Detail Modal */}
<DetailModal
  isOpen={isModalOpen}
  onClose={closeModal}
  item={selectedItem}
  type={modalType}
/>
```

### Step 4: Make all cards clickable

## Technology Cards - ADD CLICK HANDLER

Find the technology cards section (around line 594) and add `onClick`:

```tsx
<motion.div
  key={tech._id}
  onClick={() => openModal(tech, 'technology')}  // ADD THIS LINE
  className="group bg-[#C1BFBE]/20 dark:bg-[#2E2622] backdrop-blur border-2..."
>
```

## Skills Cards - ADD CLICK HANDLER

Find skills section (around line 700) and add `onClick`:

```tsx
<motion.div
  key={skill._id}
  onClick={() => openModal(skill, 'skill')}  // ADD THIS LINE
  className="bg-slate-900/50 backdrop-blur..."
>
```

## Projects Cards - ADD CLICK HANDLER

Find projects section (around line 774) and add `onClick`:

```tsx
<motion.div
  key={project._id}
  onClick={() => openModal(project, 'project')}  // ADD THIS LINE
  className="group bg-slate-900/50 backdrop-blur..."
>
```

## Education Cards - ADD CLICK HANDLER

Find education section and add `onClick`:

```tsx
<motion.div
  key={edu._id}
  onClick={() => openModal(edu, 'education')}  // ADD THIS LINE
  className="bg-slate-900/50 backdrop-blur..."
>
```

## Experience Cards - ADD CLICK HANDLER

Find work experience section and add `onClick`:

```tsx
<motion.div
  key={exp._id}
  onClick={() => openModal(exp, 'experience')}  // ADD THIS LINE
  className="bg-slate-900/50..."
>
```

## Certifications Cards - ADD CLICK HANDLER

Find certifications section and add `onClick`:

```tsx
<motion.div
  key={cert._id}
  onClick={() => openModal(cert, 'certification')}  // ADD THIS LINE
  className="bg-slate-900/50..."
>
```

## Gallery Cards - ADD CLICK HANDLER

Find gallery section and add `onClick`:

```tsx
<motion.div
  key={item._id}
  onClick={() => openModal(item, 'gallery')}  // ADD THIS LINE
  className="relative..."
>
```

## Blog Cards - ADD CLICK HANDLER

Find blog section and add `onClick`:

```tsx
<motion.div
  key={blog._id}
  onClick={() => openModal(blog, 'blog')}  // ADD THIS LINE
  className="bg-slate-900/50..."
>
```

## UPDATE ALL COLORS TO CUSTOM SCHEME

### Background Colors:
Replace all instances of:
- `bg-slate-900` → `bg-[#2E2622]`
- `bg-slate-950` → `bg-[#0C0C08]`
- `bg-white` → `bg-white dark:bg-[#2E2622]`
- `bg-gray-50` → `bg-[#C1BFBE]/10`

### Border Colors:
- `border-slate-800` → `border-[#4C4D4E]`
- `border-gray-200` → `border-[#5F5F60]/30`

### Text Colors:
- `text-white` → `text-[#C1BFBE]`
- `text-gray-300` → `text-[#5F5F60]`
- `text-gray-900` → `text-[#0C0C08]`

### Hover Colors:
- `hover:border-blue-500` → `hover:border-[#2E2622]`
- `hover:bg-slate-700` → `hover:bg-[#4C4D4E]`

## Complete Example - Projects Section

```tsx
{/* Projects Section */}
{data.projects.length > 0 && (
  <section id="projects" className="py-24 relative bg-[#C1BFBE]/5">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#0C0C08] dark:text-[#C1BFBE]">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects
          .filter((p: any) => p.isFeatured)
          .slice(0, 6)
          .map((project: any, index: number) => (
            <motion.div
              key={project._id}
              onClick={() => openModal(project, 'project')}
              className="group bg-[#C1BFBE]/20 dark:bg-[#2E2622] backdrop-blur border-2 border-[#5F5F60]/30 hover:border-[#2E2622] dark:hover:border-[#C1BFBE]/50 rounded-2xl overflow-hidden transition-all cursor-pointer shadow-lg hover:shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              {/* Project card content */}
              <div className="relative h-56 bg-gradient-to-br from-[#2E2622] to-[#4C4D4E] overflow-hidden">
                {project.imageUrl && (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0C0C08] dark:text-[#C1BFBE] mb-2">
                  {project.title}
                </h3>
                <p className="text-[#4C4D4E] dark:text-[#5F5F60] text-sm line-clamp-2">
                  {project.description}
                </p>

                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#4C4D4E]/20 dark:bg-[#5F5F60]/30 text-[#2E2622] dark:text-[#C1BFBE] text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  </section>
)}

{/* ADD MODAL AT END */}
<DetailModal
  isOpen={isModalOpen}
  onClose={closeModal}
  item={selectedItem}
  type={modalType}
/>
```

## Testing

After updates:
1. Run `npm run dev`
2. Go to admin panel
3. Add content (projects, skills, technologies, etc.)
4. Visit http://localhost:3000/
5. **Click on any card** → Should open detail modal
6. Check all colors match your scheme
7. Test all sections (projects, skills, education, etc.)

## Color Reference

- **#0C0C08** - Very dark black (backgrounds, text)
- **#2E2622** - Dark brown (cards, accents)
- **#4C4D4E** - Dark grey (borders)
- **#5F5F60** - Medium grey (secondary text)
- **#C1BFBE** - Light grey (highlights, hover)
