import LogoFillWaveBubblesLoader from "@/components/common/Loading";

export default function BlogLoading() {
    return (
        <div className="bg-primary-background flex min-h-screen items-center justify-center">
            <LogoFillWaveBubblesLoader showText={false} size="medium" />
        </div>
    );
}
