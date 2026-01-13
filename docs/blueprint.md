# **App Name**: SAGE Explorer

## Core Features:

- Global Layout: Implements a clean, professional layout for the entire application.
- Universities Table: Dynamically generate a table of universities fetched from Firestore, displaying university details and links to individual pages.
- Dynamic Columns: Allow the table headers to dynamically adjust based on the Firestore keys in the collection documents.
- University Detail Page: Create dynamic detail pages for each university, fetching and displaying header images and rich text details from Firestore.
- Admin Dashboard: Implement an admin dashboard protected by Firebase Auth, allowing authorized users to manage university data.
- Table Editor: Render the same university table in the admin dashboard with edit capabilities (add row, add column, edit details).

## Style Guidelines:

- Primary color: Deep teal (#008080) to reflect the academic environment, ensuring a balance between approachability and formality.
- Background color: Very light grayish-teal (#F0FFFF) to maintain a professional appearance with a subtle tint of the primary color.
- Accent color: Soft amber (#CC7722) to provide visual interest and highlight important elements. This provides a complementary warmth.
- Headline font: 'Playfair', serif, for headlines and short amounts of text; body font: 'PT Sans', sans-serif, for longer text.
- Use simple, professional icons from a consistent set (e.g., FontAwesome or Material Design Icons).
- Employ a clean and structured layout with a global navigation bar, clear content sections, and a functional footer.
- Use subtle transitions and hover effects to improve user experience without distracting from the content.