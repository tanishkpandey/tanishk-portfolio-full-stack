'use client';

import { useEffect, useState } from "react";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent
} from "@/components/ui/card";

import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const AboutMe = () => {
    const [aboutContent, setAboutContent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the "About Me" content from Firestore
    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                if (!db) {
                    console.error("Firebase has not been initialized.");
                    return;
                }
                const docRef = doc(db, "About", "zj68ikIqsTCVdIBhIHuG"); 
                const docSnap = await getDoc(docRef);

                console.log(docSnap)

                if (docSnap.exists()) {
                    setAboutContent(docSnap.data().content); 
                } else {
                    console.error("No such document in About collection!");
                }
            } catch (error) {
                console.error("Error fetching About Me content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutContent();
    }, []);

    return (
        <>
            {loading ? (
                <Card className="mb-6 hover:shadow">
                    <CardHeader>
                        <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="animate-pulse space-y-4">
                            <div className="h-6 bg-muted rounded"></div>
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                        </div>
                    </CardContent>
                </Card>
            ) : aboutContent ? (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-[14px]">
                            {aboutContent}
                        </p>
                    </CardContent>
                </Card>

            ) : (
                <p className="text-muted-foreground text-red-500">
                    About Me content not available.
                </p>
            )}
        </>
    );
};
