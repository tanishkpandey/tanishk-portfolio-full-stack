"use client"

import { FiCheckCircle } from "react-icons/fi"
import { TbDownload } from "react-icons/tb"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "@/app/firebase/config"
import { doc, getDoc } from "firebase/firestore"

interface Profile {
  name?: string
  role?: string
  description?: string
  github?: string
  linkedin?: string
  resume?: string
  userImage?: string
}

export const Profile = () => {
  const [profileData, setProfileData] = useState<Profile>({})
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch profile data from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!db) {
          console.error("Firebase is not initialized.")
          return
        }
        const docRef = doc(db, "Profile", "PArB5TcvuHEVztorw4LB")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProfileData(docSnap?.data())
        } else {
          console.error("No such document!")
        }
      } catch (error) {
        console.error("Error fetching profile data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start gap-2">
            {/* Skeleton Loader for Image */}
            <div className="rounded-full bg-muted animate-pulse h-24 w-24 md:w-36 md:h-36"></div>

            <div className="flex flex-col gap-2 w-full">
              {/* Skeleton Loader for Name */}
              <div className="h-6 bg-muted animate-pulse rounded w-3/4"></div>
              {/* Skeleton Loader for Role */}
              <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
            </div>

            {/* Skeleton Loader for Description */}
            <div className="mt-4 h-16 bg-muted animate-pulse rounded w-full"></div>

            {/* Skeleton Loader for Button */}
            <div className="mt-4 h-10 bg-muted animate-pulse rounded w-full"></div>

            {/* Skeleton Loader for Social Links */}
            <div className="mt-4 space-y-2 w-full">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 bg-muted animate-pulse rounded w-1/2"
                ></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profileData) {
    return (
      <p className="text-center text-foreground">Profile data not found.</p>
    )
  }

  const socials = [
    {
      name: "Github",
      link: `https://github.com/${profileData?.github}`,
      icon: <FaGithub className="size-5 text-foreground" />,
    },
    {
      name: "LinkedIn",
      link: `https://www.linkedin.com/in/${profileData?.linkedin}`,
      icon: <FaLinkedin className="size-5 text-foreground" />,
    },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-row md:flex-col items-center md:items-start w-full gap-4">
            <Image
              width={150}
              height={150}
              quality={100}
              src="/Profile.png"
              alt="Profile Picture"
              className="rounded-full size-12 md:w-2/3 h-auto object-cover border-2 border-border"
            />
            <div className="flex flex-col items-start justify-center">
              <h1 className="font-bold text-foreground md:mt-4 text-xl md:text-2xl">
                {profileData?.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                {profileData?.role}
              </p>
            </div>
          </div>
          <p className="mt-2 text-start text-sm text-muted-foreground">
            {profileData?.description}
          </p>

          <Button
            variant="outline"
            className="w-full border mt-2 py-3 px-4 text-sm tracking-wide rounded-lg"
          >
            <Link
              target="_blank"
              href="mailto:pandeytanishk@gmail.com?subject=Hey Tanishk I saw your Resume, Let's discuss"
              className="font-semibold flex gap-2 items-center"
            >
              <FiCheckCircle />
              Hire Me
            </Link>
          </Button>

          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-lg w-full shadow-md focus:ring-2 focus:ring-ring focus:outline-none"
          >
            <Link
              target="_blank"
              href={profileData.resume || "#"}
              className="font-semibold flex gap-2 items-center justify-center"
            >
              <TbDownload />
              Download CV
            </Link>
          </Button>
          <div className="mt-4 flex flex-col space-y-2 border-t border-border pt-4 w-full">
            {socials.map((s, i) => (
              <Link
                key={i}
                href={s.link}
                target="_blank"
                aria-label={`${s.name} Logo`}
                className="cursor-pointer flex items-center gap-2 group"
              >
                {s.icon}
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-color duration-200 ease-linear">
                  {s.link.split("/").pop()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
