# 💬 Real-Time Chat Application

This is a real-time chat application built as part of an assignment for Periskope.

![Chat Screenshot](./2b9bbb90-f21d-423a-ad0d-2180ef8bbb26.png)

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth, Realtime Database)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons)

## ✅ Features Implemented

- 🔐 **Authentication:**
  - Login screen styled to match the given UI.
  - Supabase auth used for secure login.

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

## ❌ Features Not Implemented

- Optional Tasks:
  - Filters and search for chats
  - Labels for chats
  - Assigning members to chats

- Bonus Points Not Implemented:
  - Group chat
  - IndexedDB storage
  - Video/file attachments
  - Semantic HTML throughout

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

- **Live App:** [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)
- **GitHub Repo:** [https://github.com/yourusername/chat-app](https://github.com/yourusername/chat-app)

## 🤖 AI Usage

I used AI (ChatGPT) to:
- Resolve TypeScript issues and typing errors
- Fix ESLint and build-time errors
- Optimize useEffect logic
- Implement Supabase Realtime integration
- Structure and polish this README

---

> Built with ❤️ and Tailwind by [Your Name]
