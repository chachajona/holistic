# Zalo Chat Integration Guide

## Overview

The website now includes both **Zalo** and **Messenger** chat widgets displayed globally across all pages. The buttons are stacked vertically (Zalo above Messenger) and are responsive, scaling up on desktop screens.

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Facebook Messenger
NEXT_PUBLIC_FACEBOOK_PAGE_ID=your_facebook_page_id

# Zalo
NEXT_PUBLIC_ZALO_ID=4411042584729737012
```

### 2. Getting Your Zalo ID

1. Open Zalo and go to your profile
2. Copy your Zalo ID (numeric string)
3. Or visit your Zalo page at `zalo.me/{YOUR_ZALO_ID}`
4. The ID is a long numeric string (e.g., `4411042584729737012`)

### 3. Getting Your Facebook Page ID

1. Visit your Facebook page
2. Copy the numeric ID from the URL: `facebook.com/{NUMERIC_ID}`
3. Or use [findmyfacebookid.com](https://findmyfacebookid.com)

## Features

### Responsive Button Sizing

- **Mobile**: 40px (size-10)
- **Tablet** (md breakpoint): 56px (size-14)
- **Desktop** (lg breakpoint): 64px (size-16)
- Icons also scale proportionally

### Global Display

Both chat widgets are integrated in the root layout and appear on:
- Home page
- Services page
- Treatments page
- Blog pages
- All other pages

### Accessibility

- Proper ARIA labels in both English and Vietnamese
- Tooltips with localized messages on hover
- Keyboard accessible (Tab to navigate, Enter to open)
- Responsive tooltip positioning

### Analytics

Both components support optional analytics tracking:

```tsx
<ZaloChat onZaloClick={() => {
  // Track custom event
}} />

<MessengerChat onMessengerClick={() => {
  // Track custom event
}} />
```

## Component Structure

```
components/
├── common/
│   ├── ChatWidgets/
│   │   └── index.tsx (Wrapper component)
│   ├── ZaloChat/
│   │   └── index.tsx
│   └── MessengerChat/
│       └── index.tsx
```

## Customization

### Colors

You can customize button colors by passing `themeColor` prop:

```tsx
<ZaloChat themeColor="#826B63" />
<MessengerChat themeColor="#9a7f74" />
```

Default colors:
- Zalo: `#826B63` (brown-600 - matches brand palette)
- Messenger: `#9a7f74` (navbar-background - matches navbar)

### Position

Modify the positioning in `ChatWidgets` component:

```tsx
<ZaloChat className="bottom-24" />      {/* Above Messenger */}
<MessengerChat />                        {/* Default: bottom-4 end-4 */}
```

## Localization

Translations are available in both English and Vietnamese:

**English** (`lib/i18n/translations/en.json`):
```json
"zalo": {
  "openChat": "Open Zalo Chat",
  "chatWithUs": "Chat with us on Zalo"
},
"messenger": {
  "openChat": "Open Messenger Chat",
  "chatWithUs": "Chat with us on Messenger"
}
```

**Vietnamese** (`lib/i18n/translations/vi.json`):
```json
"zalo": {
  "openChat": "Mở chat Zalo",
  "chatWithUs": "Trò chuyện với chúng tôi trên Zalo"
},
"messenger": {
  "openChat": "Mở chat Messenger",
  "chatWithUs": "Trò chuyện với chúng tôi trên Messenger"
}
```

## Validation

Both components include ID validation:

### Zalo Validation
- Accepts: Numeric Zalo IDs (e.g., `4411042584729737012`)
- Pattern: Long numeric strings
- Missing or invalid ID will return `null` with console warning

### Messenger Validation
- Accepts: 15-17 digit numeric IDs
- Missing or invalid ID will return `null` with console warning

## Testing

To test locally:

1. Add these to `.env.local`:
   ```env
   NEXT_PUBLIC_ZALO_ID=4411042584729737012
   NEXT_PUBLIC_FACEBOOK_PAGE_ID=your_facebook_page_id
   ```
2. Run `npm run dev`
3. Navigate to any page
4. Buttons appear in bottom-right corner
5. Hover to see tooltips
6. Click to open Zalo/Messenger in new tab

## Mobile Experience

On mobile devices:
- Buttons are slightly smaller (40px)
- Full-screen experience when opened
- Stacked layout maintains readability
- Hover animations disabled on touch devices

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Troubleshooting

### Buttons not showing
- Check `.env.local` has both `NEXT_PUBLIC_FACEBOOK_PAGE_ID` and `NEXT_PUBLIC_ZALO_ID`
- Check console for validation warnings
- Ensure variables are loaded (restart dev server)

### Links not working
- Verify Zalo ID is numeric (e.g., 4411042584729737012)
- Verify Facebook Page ID is correct (15-17 digits)
- Test links manually: `https://zalo.me/4411042584729737012` and `https://m.me/{FACEBOOK_PAGE_ID}`

### Styling issues
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind configuration includes responsive breakpoints

## Future Enhancements

Possible improvements:
- Custom positioning per page
- Analytics dashboard integration
- A/B testing for button placement
- Notification badge support
- Chat pre-population with context
