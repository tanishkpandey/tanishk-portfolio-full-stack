# Full Stack Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and built using **TypeScript**, **Tailwind CSS**, and **Firebase**.

## Features

- **Frontend**: Built with Next.js and TypeScript for a seamless user experience and scalability.
  - Includes a dynamic resume section that users can view.
  - Admin users can log in to modify resume content dynamically.
  - Styled with Tailwind CSS for a modern and responsive design.

- **Backend**: Powered by Firebase.
  - Secure authentication for admin users.
  - Real-time database integration for dynamic content updates.

## Getting Started

### Prerequisites

Before running this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Local Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**:

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Database in your Firebase project.
   - Create a `.env.local` file in the root directory and add the following:

     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

   Replace the placeholders with your Firebase project credentials.

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the app locally**:

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Admin Login

To log in as an admin:

- Use Firebase Authentication to create an admin user.
- Log in using the credentials you set up in the Firebase console.
- Once logged in, you can modify the resume content dynamically.

## Technologies Used

- **Next.js**: Framework for building server-rendered React applications with TypeScript support.
- **TypeScript**: For type safety and maintainable code.
- **Tailwind CSS**: For efficient styling and responsive design.
- **Firebase**: For authentication and real-time database functionality.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)

## Deployment

The easiest way to deploy this project is using [Vercel](https://vercel.com). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. Ensure your changes align with the project's purpose and coding standards.
