---
description: Push latest changes to GitHub (IL-MAESTRO-GH)
---

# Push IL MAESTRO updates to GitHub

Use this workflow whenever you want to push the latest code changes to GitHub.

// turbo-all
1. Stage all changes:
```
git -C "D:\IL MAESTRO" add .
```

// turbo
2. Commit with a timestamped message:
```
git -C "D:\IL MAESTRO" commit -m "update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
```

// turbo
3. Push to GitHub main branch:
```
git -C "D:\IL MAESTRO" push origin main
```

After running, the changes will be live on GitHub at:
https://github.com/eng13barada/IL-MAESTRO-GH

Vercel will auto-deploy if connected to this repo.
