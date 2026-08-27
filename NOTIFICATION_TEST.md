# 🔔 Notification System Testing Guide

## Quick Test (After Deployment ~2-3 min)

### Step 1: Open Admin Dashboard
1. Go to: https://great-delight-fastfood.vercel.app/admin/login
2. Login with:
   - Email: `admin@greatdelight.com`
   - Password: `admin123`
3. You'll be on the dashboard

### Step 2: Grant Notification Permission
- Browser will ask: "Allow notifications?"
- Click **"Allow"** ✅
- ⚠️ **IMPORTANT:** If you block, notifications won't work!

### Step 3: Open Browser Console (for debugging)
- Press `F12` (Windows) or `Cmd+Option+I` (Mac)
- Click "Console" tab
- Keep this open to see debug messages

### Step 4: Place Test Order
**In a NEW tab or window:**
1. Go to: https://great-delight-fastfood.vercel.app/menu/great-delight/main/table-01
2. Click any category (e.g., "Soups")
3. Click "Add to Cart" on any item
4. Click "View Cart" button
5. Fill in:
   - Name: `Test Customer`
   - Phone: `08012345678`
6. Click "Place Order"
7. Wait for "Order placed successfully!" message

### Step 5: Switch Back to Admin Dashboard
- **Wait up to 15 seconds** (auto-refresh interval)
- Watch the console for: `🔔 New order detected!`

### Expected Results:

Within 15 seconds you should see ALL of these:

1. **Console Log** ✅
   ```
   🔔 New order detected! GD-XXXXX
   ```

2. **Sound Alert** 🔊
   - Short beep sound (0.5 seconds)
   - 800Hz tone

3. **Browser Notification** 🔔
   - Popup outside browser
   - Title: "🔔 New Order Received!"
   - Body: Order number, customer name, total

4. **Visual Bell Badge** 
   - Bell icon turns blue
   - Red badge appears with "1"
   - Bell icon bounces

5. **Dashboard Flash**
   - Entire screen flashes blue briefly

6. **Order Card Highlight**
   - New order card has blue background
   - Pulse animation
   - "NEW" label with blue dot

---

## Troubleshooting

### Problem: No Sound
**Causes:**
- Browser volume muted
- System volume low
- Autoplay blocked (need user interaction first)

**Solution:**
- Check browser volume
- Click anywhere on dashboard before test
- Try different browser

### Problem: No Browser Notification
**Causes:**
- Permission denied
- Permissions not granted yet
- Using HTTP (needs HTTPS)

**Solution:**
1. Check browser notification settings
2. Go to site settings → Notifications → Allow
3. Refresh page and grant permission again

**Check Permissions:**
- Chrome: Click lock icon → Site settings → Notifications
- Firefox: Click shield icon → Permissions → Notifications
- Safari: Safari menu → Settings → Websites → Notifications

### Problem: No Visual Indicators
**Causes:**
- JavaScript error
- Old cached version
- Orders API not returning data

**Solution:**
1. Check console for errors (F12)
2. Hard refresh: `Ctrl+Shift+R`
3. Clear cache and reload
4. Try incognito window

### Problem: "🔔 New order detected!" Not in Console
**Causes:**
- Auto-refresh not working
- Order not marked as "NEW" status
- Network error

**Solution:**
1. Check network tab (F12 → Network)
2. Manually refresh dashboard
3. Verify order appears in orders list
4. Check if order status is "NEW"

---

## Manual Test (If Auto-Refresh Doesn't Work)

1. Open dashboard
2. Place order in another tab
3. **Manually refresh dashboard** (F5)
4. Check if visual indicators appear
5. If visual works but auto-refresh doesn't:
   - Check console for errors
   - Verify 15-second interval is running

---

## What's Working vs Not Working

### ✅ Confirmed Working:
- Admin login
- Dashboard loads
- Orders display
- Order status updates
- Menu with 10 categories (new items visible)

### 🔄 To Be Tested:
- Sound alert playback
- Browser notifications
- Visual bell badge
- Flash animation
- Pulse effect on orders
- Auto-refresh detection

### ⚠️ Known Limitations:
- **15-second delay:** Notifications only check every 15 seconds
- **First load:** Won't detect orders placed before dashboard opened
- **Browser limits:** Some browsers block autoplay audio
- **HTTPS only:** Notifications require secure connection (Vercel provides this)

---

##Expected Console Output

When working correctly, you should see:
```
🔔 New order detected! GD-00123
[Audio playing...]
[Notification shown]
```

If you see errors:
```
Failed to play notification sound: [error]
Failed to create notification beep: [error]
```

Share these errors for troubleshooting!

---

## Quick Video of What Should Happen

**Timeline:**
- 0:00 - Admin on dashboard
- 0:05 - Customer places order
- 0:20 - **BEEP!** 🔊
- 0:20 - Browser notification pops up 🔔
- 0:20 - Bell turns blue with badge "1"
- 0:20 - Dashboard flashes blue briefly
- 0:21 - New order card appears with pulse

**Total time:** Order → Notification = 15-20 seconds max

---

**Last Updated:** August 27, 2026  
**Status:** Notification code deployed, awaiting test  
**Deployment:** Wait 2-3 min after commit fe5f145
