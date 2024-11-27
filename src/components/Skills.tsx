'use client';

import { useEffect, useState } from "react";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { doc, getDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge"; // Ensure Badge is imported
import { db } from "@/app/firebase/config"; // Ensure Firebase is initialized

export const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the "Skills" content from Firestore
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const docRef = doc(db, "Skills", "W3xwilcBbb6XvU5al2it");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setSkills(Array.isArray(data.Skills) ? data.Skills : []);
                } else {
                    console.error("No such document in Skills collection!");
                }
            } catch (error) {
                console.error("Error fetching Skills content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    // Skeleton Loader
                    <div className="space-y-4">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="h-6 w-20 bg-gray-200 rounded animate-pulse"
                            ></div>
                        ))}
                    </div>
                ) : skills.length > 0 ? (
                    // Render Skills as Badges
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    // Fallback for no skills
                    <p>No skills found.</p>
                )}
            </CardContent>
        </Card>
    );
};
