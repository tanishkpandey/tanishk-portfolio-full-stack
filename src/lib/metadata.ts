import { Metadata } from "next"

// TODO: Update metadata

export function constructMetadata({
  title = "Tanishk Pandey", // TODO: Add a custom title
  description = "I am a software engineer with a passion for building scalable and efficient web applications.", // TODO: Add a custom description
  image = "/Thumbnail.jpg", // TODO: Add a custom image
  icons = "/icon.png",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL("https://tanishkpandey.vercel.app/"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
