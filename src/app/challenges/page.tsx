import ChallengeList from '@/app/challenges/ChallengeList'

export default function ChallengePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Cyber Cat Challenges - 3C CTF</h1>
                <ChallengeList />
            </div>
        </div>
    )
}