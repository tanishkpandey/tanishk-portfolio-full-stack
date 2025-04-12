"use client"

export const Footer = () => {
  return (
    <footer className="rounded-lg border bg-card text-card-foreground shadow-lg hover:shadow-md -mt-1 transition z-10 border-t bg-forground text-center py-6 text-sm text-gray-600">
      <p className="mb-1">
        &copy; {new Date().getFullYear()} Tanishk. All rights reserved.
      </p>
      <p>
        Developed by{" "}
        <span className="font-semibold">Tanishk</span> with
        <span className="text-red-500 mx-1">❤️</span> in India.
      </p>
    </footer>
  )
}
