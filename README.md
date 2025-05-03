# Full Stack Portfolio

This is a **Next.js** project built with **TypeScript**, **Tailwind CSS**, and **Firebase**, designed for a dynamic and scalable portfolio.

## 🚀 Features

### **Frontend**
- Built with **Next.js** and **TypeScript** for performance and scalability.
- Dynamic **resume section** for visitors.
- **Admin authentication** to modify content.
- Styled with **Tailwind CSS** for a responsive UI.

### **Backend**
- **Firebase Authentication** for secure admin login.
- **Firestore Database** for real-time content updates.

---

## 📌 Getting Started

### **🔧 Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### **📂 Local Setup**

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2️⃣ **Install dependencies**
```bash
npm install
# or
yarn install
```

3️⃣ **Set up environment variables**
- Create a **Firebase project** in the [Firebase Console](https://console.firebase.google.com/).
- Enable **Authentication** & **Firestore Database**.
- **Create a `.env.local` file** and add the necessary credentials.
  
```env
# Firebase Credentials
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""

# Dialogflow Credentials
GOOGLE_PROJECT_ID=""
GOOGLE_PRIVATE_KEY_ID=""
GOOGLE_PRIVATE_KEY=""
GOOGLE_CLIENT_EMAIL=""
GOOGLE_CLIENT_X509_CERT_URL=""

# Google OAuth Credentials
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REFRESH_TOKEN=""
```

4️⃣ **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5️⃣ **Access the app locally**
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👨‍💻 Admin Access

To log in as an **admin**, set up an account via **Firebase Authentication** and configure admin privileges in Firestore.

---

## 💡 Technologies Used

- 🚀 **Next.js** → Optimized React framework  
- 🛠️ **TypeScript** → Type safety & scalability  
- 🎨 **Tailwind CSS** → Modern styling & responsiveness  
- 🔥 **Firebase** → Authentication & real-time database  
- 💬 **Dialogflow** → AI-powered chatbot integration  

---

## 🚀 Deployment

Deploy the app seamlessly with **Vercel**:  
📌 Follow [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).  

---

## 🛠️ Contributing

Contributions are welcome! To contribute:
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit changes** (`git commit -m "Added new feature"`)
4. **Push to GitHub** (`git push origin feature-name`)
5. **Open a pull request** 🚀

---

## 📖 Learn More

📚 [Next.js Docs](https://nextjs.org/docs)  
🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)  
💬 [Dialogflow Docs](https://cloud.google.com/dialogflow/docs)  
🔥 [Firebase Docs](https://firebase.google.com/docs)  

---

🔥 **Pro Tip:** Never expose `.env.local` credentials in public repositories. Use **GitHub Secrets** or `.gitignore` to keep them secure.  
