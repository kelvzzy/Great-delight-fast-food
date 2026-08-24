# GREAT DELIGHT - TESTING GUIDE
**Version:** 1.0  
**Last Updated:** August 20, 2026

---

## 🎯 TESTING OBJECTIVES

This guide covers manual testing required before production deployment (P1 priority items).

**Estimated Time:** 2-3 hours  
**Required:** Before production launch

---

## 🚀 SETUP

### 1. Start Application

```bash
# Terminal 1 - Database (if using Docker)
docker-compose up -d postgres

# Terminal 2 - Application
npm run dev
```

### 2. Verify Database
```bash
# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed
```

### 3. Verify Application Started
- App should be running at: http://localhost:3000
- No errors in console

---

## 📱 TEST 1: CUSTOMER ORDERING FLOW (30-45 min)

### Test Case 1.1: QR Code Access
**Objective:** Verify customers can access menu via QR code URL

**Steps:**
1. Navigate to: `http://localhost:3000/menu/great-delight/main/table-01`
2. Verify page loads without errors
3. Verify restaurant name displays correctly
4. Verify table number shows "TABLE 01"

**Expected Results:**
- ✅ Page loads successfully
- ✅ No 404 or 500 errors
- ✅ Table info displays correctly
- ✅ "Browse Menu" button visible

**Pass/Fail:** _______

---

### Test Case 1.2: Menu Browsing
**Objective:** Verify menu displays all categories and items

**Steps:**
1. Click "Browse Menu" button
2. Verify categories display: Soups, Rice & Combos, Quick Meals, Pepper Soup, Proteins
3. Click on "Soups" category
4. Verify menu items load
5. Check at least 3 items display correctly with:
   - Name
   - Description
   - Price (in Naira)
   - Image placeholder
   - "Add to Cart" button

**Expected Results:**
- ✅ All 5 categories visible
- ✅ Items load when category clicked
- ✅ Prices display in ₦ format
- ✅ No missing data
- ✅ Images load or show placeholder

**Pass/Fail:** _______

---

### Test Case 1.3: Item with Variants
**Objective:** Verify variant selection works correctly

**Steps:**
1. Find "Jollof Rice" in Rice & Combos
2. Click "Add to Cart"
3. Verify variant modal opens
4. Check variants display:
   - Beef Full Combo (₦4,000)
   - Beef Mini Combo (₦3,000)
   - Goat Meat Full Combo (₦4,500)
   - Goat Meat Mini Combo (₦3,500)
5. Select "Beef Full Combo"
6. Click "Add to Cart" in modal

**Expected Results:**
- ✅ Modal opens smoothly
- ✅ All variants display with correct prices
- ✅ Selection works
- ✅ Item added to cart
- ✅ Success message shown

**Pass/Fail:** _______

---

### Test Case 1.4: Item with Options
**Objective:** Verify option selection works correctly

**Steps:**
1. Find "Chicken Breast White Soup" in Soups
2. Click "Add to Cart"
3. Verify options modal opens
4. Check swallow options display:
   - Garri
   - Fufu
   - Semo
   - Pounded Yam
5. Select "Pounded Yam"
6. Adjust quantity to 2
7. Click "Add to Cart"

**Expected Results:**
- ✅ Modal opens correctly
- ✅ All options visible
- ✅ Required option validation works
- ✅ Quantity adjustment works
- ✅ Total price calculates correctly (₦10,000 × 2 = ₦20,000)
- ✅ Item added successfully

**Pass/Fail:** _______

---

### Test Case 1.5: Shopping Cart
**Objective:** Verify cart functionality

**Steps:**
1. After adding 2-3 items, click cart icon/button
2. Verify all items display correctly
3. Check quantity adjustment:
   - Increase quantity on one item
   - Decrease quantity on another
4. Remove one item from cart
5. Verify subtotal updates correctly
6. Click "Proceed to Checkout"

**Expected Results:**
- ✅ All cart items visible
- ✅ Item names and prices correct
- ✅ Quantity buttons work
- ✅ Remove button works
- ✅ Subtotal calculates correctly
- ✅ Empty cart shows appropriate message
- ✅ Checkout button navigates correctly

**Pass/Fail:** _______

---

### Test Case 1.6: Checkout
**Objective:** Verify order placement

**Steps:**
1. On checkout page, verify:
   - Order summary displays
   - Customer info form visible
2. Fill in optional fields:
   - Name: "Test Customer"
   - Phone: "+234 123 456 7890"
3. Add special note: "No pepper please"
4. Click "Place Order"
5. Wait for order confirmation

**Expected Results:**
- ✅ Form validation works (if fields required)
- ✅ Special note field accepts text
- ✅ "Place Order" button is clickable
- ✅ Loading state shows during submission
- ✅ No console errors
- ✅ Redirects to confirmation page

**Pass/Fail:** _______

---

### Test Case 1.7: Order Confirmation & Tracking
**Objective:** Verify order tracking works

**Steps:**
1. On confirmation page, verify:
   - Order number displays (e.g., "GD-00001")
   - Order items list correct
   - Total amount correct
   - Table number shown
2. Note the order number
3. Wait 10-15 seconds
4. Verify status updates (if admin changes it)

**Expected Results:**
- ✅ Order number format: GD-XXXXX
- ✅ All order details correct
- ✅ Status shows "New Order" initially
- ✅ Page refreshes/updates periodically
- ✅ Status changes reflect correctly

**Pass/Fail:** _______

---

### Test Case 1.8: Duplicate Order Protection
**Objective:** Verify duplicate order prevention

**Steps:**
1. Add item to cart
2. Proceed to checkout
3. Click "Place Order" button
4. **IMMEDIATELY** click "Place Order" again (within 2 seconds)
5. Check if duplicate order prevented

**Expected Results:**
- ✅ Second click prevented or shows error
- ✅ Error message: "Duplicate order detected"
- ✅ Only ONE order created in database
- ✅ 429 status code in network tab

**Pass/Fail:** _______

---

## 🔐 TEST 2: ADMIN DASHBOARD (45-60 min)

### Test Case 2.1: Admin Login
**Objective:** Verify admin authentication

**Steps:**
1. Navigate to: `http://localhost:3000/admin/login`
2. Try invalid credentials:
   - Email: `wrong@email.com`
   - Password: `wrongpass`
3. Try valid credentials:
   - Email: `admin@greatdelight.com`
   - Password: `admin123`

**Expected Results:**
- ✅ Login page loads correctly
- ✅ Invalid credentials show error
- ✅ Valid credentials redirect to dashboard
- ✅ Session persists on page refresh

**Pass/Fail:** _______

---

### Test Case 2.2: Dashboard Overview
**Objective:** Verify dashboard displays stats correctly

**Steps:**
1. After login, verify dashboard displays:
   - Total Orders (today)
   - Total Revenue (today)
   - Pending Orders count
   - Completed Orders count
2. Verify navigation menu shows:
   - Dashboard
   - Orders
   - Menu
   - Tables
   - Logout

**Expected Results:**
- ✅ Stats display correctly (even if zero)
- ✅ Currency format correct (₦)
- ✅ Navigation menu functional
- ✅ No layout issues

**Pass/Fail:** _______

---

### Test Case 2.3: Orders Management
**Objective:** Verify admin can manage orders

**Steps:**
1. Click "Orders" in navigation
2. Verify orders list displays
3. Find the test order from customer flow
4. Click on order to view details
5. Change order status through these states:
   - New → Accepted
   - Accepted → Preparing
   - Preparing → Ready
   - Ready → Completed
6. Verify status updates successfully

**Expected Results:**
- ✅ Orders list displays correctly
- ✅ Order details show all info
- ✅ Status buttons functional
- ✅ Status updates save to database
- ✅ Timestamps update correctly
- ✅ Success messages display

**Pass/Fail:** _______

---

### Test Case 2.4: Order Cancellation
**Objective:** Verify admin can cancel orders

**Steps:**
1. Create a new customer order
2. In admin, find the new order
3. Click "Cancel Order" button
4. Confirm cancellation
5. Verify order status changes to "Cancelled"
6. Check if customer tracking page reflects cancellation

**Expected Results:**
- ✅ Cancel button visible for appropriate statuses
- ✅ Confirmation dialog appears
- ✅ Order cancelled successfully
- ✅ Cannot change status after cancellation
- ✅ Customer sees cancelled status

**Pass/Fail:** _______

---

### Test Case 2.5: Menu Management - Toggle Availability
**Objective:** Verify admin can control menu item availability

**Steps:**
1. Click "Menu" in navigation
2. Find "Jollof Rice" item
3. Toggle availability OFF
4. In new browser tab (customer view):
   - Navigate to menu
   - Verify "Jollof Rice" is not visible or marked unavailable
5. Back in admin, toggle availability ON
6. Refresh customer view
7. Verify "Jollof Rice" is now available

**Expected Results:**
- ✅ Toggle switch works smoothly
- ✅ Unavailable items don't show in customer view
- ✅ Changes reflect immediately
- ✅ Database updates correctly

**Pass/Fail:** _______

---

### Test Case 2.6: Menu Management - Update Price
**Objective:** Verify admin can update prices

**Steps:**
1. In admin menu page, find "Yam & Egg Sauce"
2. Note current price (should be ₦3,500)
3. Click "Edit Price" button
4. Change price to ₦4,000
5. Save changes
6. In customer view, verify new price displays
7. Place order with updated item
8. Verify order uses NEW price (₦4,000)

**Expected Results:**
- ✅ Price edit modal works
- ✅ Price validation works (positive numbers only)
- ✅ Price saves to database
- ✅ Customer view shows new price
- ✅ Orders use current price from database

**Pass/Fail:** _______

---

### Test Case 2.7: Tables Management
**Objective:** Verify admin can manage tables

**Steps:**
1. Click "Tables" in navigation
2. Verify all 20 tables display (TABLE 01 - TABLE 20)
3. Toggle TABLE 05 inactive
4. Try to access as customer: `/menu/great-delight/main/table-05`
5. Verify access denied or appropriate message
6. Toggle TABLE 05 active again
7. Verify customer can access now

**Expected Results:**
- ✅ All tables listed correctly
- ✅ Toggle works
- ✅ Inactive tables reject customer access
- ✅ QR code generation available
- ✅ Active/Inactive status clear

**Pass/Fail:** _______

---

### Test Case 2.8: QR Code Generation
**Objective:** Verify QR codes generate correctly

**Steps:**
1. In Tables management, find TABLE 01
2. Click "View QR Code" or "Generate QR"
3. Verify QR code displays
4. Use phone camera or QR scanner app
5. Scan QR code
6. Verify redirects to correct table URL

**Expected Results:**
- ✅ QR code generates
- ✅ QR code is scannable
- ✅ Redirects to correct table menu
- ✅ Can download QR code image
- ✅ QR contains correct URL format

**Pass/Fail:** _______

---

## 📱 TEST 3: MOBILE RESPONSIVENESS (30 min)

### Test Case 3.1: Mobile - Customer Flow
**Device:** iPhone or Android phone

**Steps:**
1. On mobile browser, navigate to menu URL
2. Complete full order flow:
   - Browse menu
   - Add items (with variants)
   - View cart
   - Checkout
   - Track order
3. Test both portrait and landscape orientations

**Expected Results:**
- ✅ All text readable without zooming
- ✅ Buttons easy to tap
- ✅ No horizontal scrolling
- ✅ Images fit properly
- ✅ Forms usable on mobile keyboard
- ✅ Navigation smooth

**Pass/Fail:** _______

---

### Test Case 3.2: Mobile - Admin Dashboard
**Device:** iPhone or Android phone

**Steps:**
1. Login to admin on mobile
2. Navigate all sections:
   - Dashboard
   - Orders
   - Menu
   - Tables
3. Update an order status
4. Toggle menu availability

**Expected Results:**
- ✅ Layout responsive
- ✅ Tables/lists scrollable
- ✅ Buttons accessible
- ✅ Forms work correctly
- ✅ No overlapping elements
- ✅ Text readable

**Pass/Fail:** _______

---

## 🔒 TEST 4: SECURITY AUDIT (30 min)

### Test Case 4.1: API Authorization
**Objective:** Verify protected routes are secure

**Steps:**
1. Logout from admin
2. Try to access: `http://localhost:3000/api/admin/orders`
3. Try to access: `http://localhost:3000/api/admin/menu`
4. Open browser dev tools → Network tab
5. Login to admin
6. Capture session cookie
7. Logout
8. Try to reuse old session cookie

**Expected Results:**
- ✅ Unauthorized access returns 401/403
- ✅ No sensitive data exposed without auth
- ✅ Session expires after logout
- ✅ Old sessions cannot be reused

**Pass/Fail:** _______

---

### Test Case 4.2: Price Manipulation Attempt
**Objective:** Verify server calculates prices

**Steps:**
1. Open browser dev tools → Network tab
2. Add item to cart
3. Proceed to checkout
4. In Network tab, find the POST request to `/api/orders`
5. Right-click → Copy as cURL or Copy as Fetch
6. Modify the total price in the request
7. Resend modified request
8. Check if server accepts manipulated price

**Expected Results:**
- ✅ Server ignores client-sent price
- ✅ Server calculates price from database
- ✅ Order total matches server calculation
- ✅ Cannot submit fake prices

**Pass/Fail:** _______

---

### Test Case 4.3: Environment Variables Check
**Objective:** Ensure no secrets exposed

**Steps:**
1. Open `.env` file
2. Verify `NEXTAUTH_SECRET` exists and is not empty
3. Verify `DATABASE_URL` does not have production credentials
4. Check if any `.env` files are in git:
   ```bash
   git ls-files | grep .env
   ```
5. View page source in browser
6. Search for "NEXTAUTH_SECRET" or "DATABASE_URL"

**Expected Results:**
- ✅ `.env` file not in git
- ✅ Secrets not visible in page source
- ✅ No secrets in client-side bundle
- ✅ `.env.example` exists with dummy values

**Pass/Fail:** _______

---

## 📊 TEST RESULTS SUMMARY

### Overall Pass Rate
```
Total Tests: ___ / ___
Pass: ___
Fail: ___
Pass Rate: ____%
```

### Critical Failures
List any critical test failures here:

1. 
2. 
3. 

### Blockers for Production
List any issues that MUST be fixed before launch:

1. 
2. 
3. 

### Nice-to-Fix Issues
List issues that can be addressed post-launch:

1. 
2. 
3. 

---

## ✅ SIGN-OFF

### Tested By:
- Name: _________________
- Date: _________________
- Environment: _________________

### Approved for Production:
- [ ] All critical tests pass
- [ ] No security vulnerabilities found
- [ ] Mobile experience acceptable
- [ ] Documentation updated

**Signature:** _________________  
**Date:** _________________

---

## 📞 ISSUE REPORTING

If you find bugs during testing:

1. **Note the exact steps** to reproduce
2. **Capture screenshots** or screen recording
3. **Check browser console** for errors
4. **Document environment** (browser, device, OS)
5. **Report severity**: Critical / High / Medium / Low

### Bug Report Template:
```
Title: [Brief description]
Severity: [Critical/High/Medium/Low]
Steps to Reproduce:
1. 
2. 
3. 

Expected: [What should happen]
Actual: [What actually happened]
Environment: [Browser, device, OS]
Screenshot: [Attach if available]
Console Errors: [Copy-paste any errors]
```

---

**Happy Testing! 🧪**
