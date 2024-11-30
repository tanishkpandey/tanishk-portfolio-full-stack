'use client';

import { useEffect, useState } from "react";

import { CalendarDays } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { JobImages } from "@/components/JobImages";

import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch experiences from Firestore
    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const experienceCollection = collection(db, "Experience");
                const experienceSnapshot = await getDocs(experienceCollection);

                const fetchedExperiences = experienceSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setExperiences(fetchedExperiences);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    if (loading) {
        // Skeleton Loader
        return (
            <>
                <h2 className="text-xl font-bold text-myBlack mb-4">Work Experience</h2>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-8">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="border-b last:border-b-0 pb-8 last:pb-0">
                                    <div className="animate-pulse">
                                        {/* Role and Company */}
                                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                        {/* Duration */}
                                        <div className="h-4 bg-gray-200 rounded w-1/5 mb-4"></div>
                                        {/* Description */}
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-4/5 mb-2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </>
        );
    }

    return (
        <>
            <h2 className="text-xl text-myBlack font-bold mb-4">Work Experience</h2>
            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-8">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="border-b last:border-b-0 pb-8 last:pb-0">
                                {/* Job Details */}
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <h3 className="font-semibold text-myBlack">
                                            {exp.role}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {exp.company}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground my-2 flex items-center">
                                    <CalendarDays className="size-3 mr-2" />
                                    {exp.duration}
                                </p>
                                <ul>
                                    {exp.description && exp.description.map((item, index) => (
                                        <li className="text-sm text-gray-500" key={index}>{item}</li>
                                    ))}
                                </ul>

                                <p className="text-sm mt-2">{ }</p>
                                {/* Job Images */}
                                {exp.images && exp.images.length > 0 && (
                                    <JobImages
                                        role={exp.role}
                                        link={exp.link}
                                        images={exp.images}
                                        duration={exp.duration}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
