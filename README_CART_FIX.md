# Cart Fixed - Setup Guide

**Status**: Add to cart ✅ working (ObjectId + display)

**To see cart items**:
```
1. npm run dev (running)
2. Admin login: localhost:3000/admin-login 
   username: yeasin / pass: yeasin@2008  
3. Admin → Products → Add test products
4. /shop → Add to cart → CartDrawer ✓ shows
```

**Seed admin** (if not done):
```
curl -X POST localhost:3000/api/seed
```

**Test flow**:
```
Add cart → Green ✓ → CartDrawer image/price/total ✓
PR #13 ready to merge
```

