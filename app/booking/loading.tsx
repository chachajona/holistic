import LogoFillWaveBubblesLoader from "@/components/common/Loading";

export default function BookingLoading() {
    return (
        <div className="bg-primary-background flex min-h-screen items-center justify-center">
            <LogoFillWaveBubblesLoader showText={false} size="medium" />
        </div>
    );
}
