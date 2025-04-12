import LogoFillWaveBubblesLoader from "@/components/Loading";

export default function TreatmentsLoading() {
    return (
        <div className="bg-primary-background flex min-h-screen items-center justify-center">
            <LogoFillWaveBubblesLoader showText={false} size="medium" />
        </div>
    );
}
