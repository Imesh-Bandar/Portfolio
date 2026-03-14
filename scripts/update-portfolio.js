const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, '../app/page.tsx');
let content = fs.readFileSync(pageFile, 'utf8');

console.log('🔧 Updating portfolio page...\n');

// Add onClick handlers to all sections
const updates = [
  {
    name: 'Skills Section',
    search: /(<motion\.div\s+key={skill\._id}\s+className="bg-slate-900)/,
    replace: `<motion.div\n                    key={skill._id}\n                    onClick={() => openModal(skill, 'skill')}\n                    className="bg-[#C1BFBE]/20 dark:bg-[#2E2622]`
  },
  {
    name: 'Projects Section',
    search: /(<motion\.div\s+key={project\._id}\s+className="group bg-slate-900)/,
    replace: `<motion.div\n                      key={project._id}\n                      onClick={() => openModal(project, 'project')}\n                      className="group bg-[#C1BFBE]/20 dark:bg-[#2E2622]`
  },
  {
    name: 'Experience Section',
    search: /(<div\s+className="bg-slate-900\/50 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-purple-500)/,
    replace: `<div\n                        onClick={() => openModal(exp, 'experience')}\n                        className="bg-[#C1BFBE]/20 dark:bg-[#2E2622] backdrop-blur border border-[#4C4D4E] rounded-xl p-6 hover:border-[#2E2622] cursor-pointer`
  },
  {
    name: 'Education Section',
    search: /(<div\s+className="bg-slate-900\/50 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-blue-500)/,
    replace: `<div\n                        onClick={() => openModal(edu, 'education')}\n                        className="bg-[#C1BFBE]/20 dark:bg-[#2E2622] backdrop-blur border border-[#4C4D4E] rounded-xl p-6 hover:border-[#2E2622] cursor-pointer`
  }
];

// Global color replacements
const colorReplacements = [
  ['bg-slate-900/50', 'bg-[#C1BFBE]/20 dark:bg-[#2E2622]'],
  ['bg-slate-900/30', 'bg-[#C1BFBE]/5'],
  ['bg-slate-900', 'bg-[#2E2622]'],
  ['bg-slate-950', 'bg-[#0C0C08]'],
  ['bg-slate-800', 'bg-[#4C4D4E]'],
  ['border-slate-800', 'border-[#4C4D4E]'],
  ['border-slate-700', 'border-[#5F5F60]'],
  ['text-white', 'text-[#C1BFBE]'],
  ['hover:bg-slate-700', 'hover:bg-[#4C4D4E]'],
  ['bg-white', 'bg-[#C1BFBE]/10'],
  ['border-gray-200', 'border-[#5F5F60]/30']
];

// Apply updates
let updateCount = 0;

updates.forEach(update => {
  if (content.match(update.search)) {
    content = content.replace(update.search, update.replace);
    console.log(`✅ ${update.name} - Click handler added`);
    updateCount++;
  } else {
    console.log(`⚠️  ${update.name} - Pattern not found`);
  }
});

console.log('\n🎨 Applying color scheme...\n');

colorReplacements.forEach(([oldColor, newColor]) => {
  const count = (content.match(new RegExp(oldColor, 'g')) || []).length;
  if (count > 0) {
    content = content.replaceAll(oldColor, newColor);
    console.log(`✅ Replaced ${count} instances of "${oldColor}"`);
    updateCount += count;
  }
});

// Write back
fs.writeFileSync(pageFile, content, 'utf8');

console.log(`\n🎉 Complete! Made ${updateCount} updates to page.tsx`);
console.log('\n📝 Next steps:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000/');
console.log('3. Click on any card to test!');
