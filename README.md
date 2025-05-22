# 💬 Real-Time Chat Application

This is a real-time chat application built as part of an assignment for Periskope.

![Chat Screenshot](https://github.com/VenomDev07/supabasr-chatapp/blob/main/public/images/image.png)

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth, Realtime Database)
- **Icons:** [lucide-react](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react)

## ✅ Features Implemented

- 🔐 **Authentication:**
  - Login screen styled to match the given UI.
  - Supabase auth used for secure login.
  - Logout functionality accessible via the icon located in the top-right sidebar.

- 💬 **Chat Functionality:**
  - Real-time chat using Supabase Realtime.
  - Sending a message updates the UI instantly.
  - Messages are saved to the database.
  - Clicking a user/chat opens that conversation.

- 📸 **Media Attachment (Bonus):**
  - Image attachment support added to chats (bonus point task implemented).

- 🎨 **Pixel-perfect UI:**
  - Carefully matched to the provided screenshot.
  - All icons and buttons are implemented as shown (some peripheral buttons are non-functional, per instructions).


## 🔑 Demo Credentials

You can use the following credentials to test the app:

- **Email:** devendra.salokhe07@gmail.com 
- **Password:** 1234567

## 🔮 Future Enhancements (Planned)

While the core chat functionality is fully implemented, the following features are on the roadmap to elevate the user experience further:

- 🔍 **Chat Filters & Search** – Quickly find conversations or messages using advanced filtering and search options.
- 🏷️ **Chat Labels** – Organize conversations using custom labels and tags.
- 👥 **Member Assignment** – Assign team members to specific chats for better collaboration.
- 💬 **Group Chat Support** – Enable real-time conversations between multiple users.
- 🧠 **IndexedDB Caching** – Improve performance and offline support by storing data locally in the browser.
- 📎 **Rich Media Support** – Expand attachments to include videos, documents, and other file types.
- 🔧 **Semantic HTML** – Refactor UI using semantic elements for accessibility and SEO.

## 📂 Folder Structure (Brief)

```
/src
 ├── /components    → Reusable UI components (ChatWindow, Header, Sidebar, etc.)
 ├── /lib           → Supabase auth helpers
 ├── /types         → TypeScript types
 ├── /app           → Next.js App Router structure
```

## 🧠 How to Run Locally

```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
npm install
npx supabase start # if using local Supabase (optional)
npm run dev
```

> Set up your `.env.local` file with your Supabase URL and anon/public key.

## 🔗 Links

- **Live App:** [https://supabasr-chatapp-es84.vercel.app/](https://supabasr-chatapp-es84.vercel.app/)
- **GitHub Repo:** [https://github.com/VenomDev07/supabasr-chatapp](https://github.com/VenomDev07/supabasr-chatapp)

## 🤖 AI Usage

I used AI (Claude) to:
- Resolve TypeScript issues and typing errors
- Fix ESLint and build-time errors

---

> Built with ❤️ and Tailwind by Dev
