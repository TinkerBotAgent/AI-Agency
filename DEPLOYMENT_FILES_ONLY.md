# 🚀 BluePrinter - Deployment Files Only

## ✅ Files You NEED for Deployment

### **Core Application Files:**
```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx
│   │   └── components/
│   │       └── WorkflowBuilder.tsx
│   ├── api/
│   │   ├── figma/
│   │   │   └── route.ts
│   │   └── health/
│   │       └── route.ts
│   ├── blueprinter/
│   │   └── page.tsx
│   ├── bot-templates/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
```

### **Configuration Files:**
```
├── package.json
├── package-lock.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── netlify.toml
├── .gitignore
└── env.example
```

### **Database & Library Files:**
```
├── lib/
│   ├── db/
│   │   ├── schema.ts
│   │   └── migrate.ts
│   ├── code-generator.ts
│   └── figma-api.ts
```

### **Documentation (Optional):**
```
├── DEPLOYMENT_READY.md
├── NETLIFY_DEPLOYMENT.md
└── README files (if you want them)
```

## ❌ Files You DON'T Need (DELETE THESE):

### **Massive Space Wasters:**
- `node_modules/` - **DELETE THIS ENTIRE FOLDER** (Netlify will rebuild it)
- `.next/` - **DELETE THIS** (Netlify will build fresh)
- `package-lock.json` - Keep only if you want exact versions

### **Development Only:**
- `scripts/` folder
- `SECURE_DEPLOYMENT.md`
- `QUICK_START.md` 
- `DEPLOYMENT_CHECKLIST.md`
- Any `.log` files
- `.env.local` (if you have one)

### **Addon Packs (Optional):**
- `addon-packs/` - Keep only if you're using them

## 🎯 **Super Minimal Deployment** (Recommended):

**Just upload these folders/files:**
```
src/
package.json
next.config.js
tailwind.config.js
tsconfig.json
netlify.toml
env.example
lib/
```

**That's it!** Netlify will:
1. Run `npm install` (rebuilds node_modules)
2. Run `npm run build` (creates .next folder)
3. Deploy your site

## 💡 **Quick Cleanup Commands:**

If you want to clean up before zipping:
```bash
# Delete the big folders
rmdir /s node_modules
rmdir /s .next

# Your zip file will be 90% smaller!
```

## 📦 **Final Zip Contents:**
- **Before cleanup**: ~500MB+ with thousands of files
- **After cleanup**: ~5-10MB with ~50 files

**Much easier on your computer!** 🚀
