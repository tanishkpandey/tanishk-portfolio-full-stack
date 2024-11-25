import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "SaaS", "Material-UI", "React", "Next.js", "Redux", "Charts.js", "Node.js", "Express.js", "REST APIs", "GraphQL APIs", "Nest.js", "MongoDB", "MySQL", "Redis", "Git", "GitHub", "Docker", "GitLab"
];

export const Skills = () => {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                        <Badge key={i} variant="secondary">
                            {s}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}