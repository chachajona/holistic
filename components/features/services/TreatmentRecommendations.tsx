"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";
import { customIcons, isCustomIcon } from "@/assets/icons/custom";
import { useLocale } from "@/providers/LocaleProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Calendar, ChevronRight, X } from "lucide-react";
import * as Icons from "lucide-react";

import { Service } from "@/types/services";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TreatmentRecommendationsProps {
    services: Service[];
    selectedCategoryIds: string[];
    onQuickBook?: (treatmentId: string, treatmentName: string) => void;
}

// Helper function to ensure translation result is a string
const ensureString = (value: string | string[]): string => {
    return Array.isArray(value) ? (value[0] ?? "") : value;
};

export const TreatmentRecommendations = memo(
    ({
        services,
        selectedCategoryIds,
        onQuickBook,
    }: TreatmentRecommendationsProps) => {
        const { t } = useLocale();
        const { toast } = useToast();
        const [expandedTreatmentId, setExpandedTreatmentId] = useState<
            string | null
        >(null);
        const [bookingForm, setBookingForm] = useState({
            name: "",
            phone: "",
            note: "",
        });
        const [errors, setErrors] = useState({
            name: "",
            phone: "",
            note: "",
        });
        const [isSubmitting, setIsSubmitting] = useState(false);

        // Get icon component from string name
        const getIcon = useCallback(
            (
                iconName: string | null,
                className = "text-primary-text/70 size-6",
                ariaHidden = true,
            ) => {
                if (!iconName) {
                    return (
                        <AlertCircle
                            className={className}
                            aria-hidden={ariaHidden}
                        />
                    );
                }

                if (isCustomIcon(iconName)) {
                    const CustomIcon = customIcons[iconName];
                    return (
                        <CustomIcon
                            className={className}
                            aria-hidden={ariaHidden}
                        />
                    );
                }

                try {
                    const Icon = Icons[
                        iconName as keyof typeof Icons
                    ] as React.ElementType;

                    if (Icon) {
                        return (
                            <Icon
                                className={className}
                                aria-hidden={ariaHidden}
                            />
                        );
                    } else {
                        return (
                            <AlertCircle
                                className={className}
                                aria-hidden={ariaHidden}
                            />
                        );
                    }
                    // eslint-disable-next-line unused-imports/no-unused-vars
                } catch (error) {
                    return (
                        <AlertCircle
                            className={className}
                            aria-hidden={ariaHidden}
                        />
                    );
                }
            },
            [],
        );

        // Handle inline booking form toggle
        const handleToggleBookingForm = useCallback(
            (treatmentUniqueId: string) => {
                setExpandedTreatmentId(prev =>
                    prev === treatmentUniqueId ? null : treatmentUniqueId,
                );
                // Reset form when opening
                if (expandedTreatmentId !== treatmentUniqueId) {
                    setBookingForm({ name: "", phone: "", note: "" });
                    setErrors({ name: "", phone: "", note: "" });
                }
            },
            [expandedTreatmentId],
        );

        // Validate form fields
        const validateField = useCallback(
            (field: string, value: string): string => {
                if (field === "name") {
                    if (!value.trim()) {
                        return ensureString(
                            t(
                                "servicesPage.booking.validation.nameRequired",
                                "Please enter your full name",
                            ),
                        );
                    }
                    if (value.length < 2 || value.length > 100) {
                        return ensureString(
                            t(
                                "servicesPage.booking.validation.nameLength",
                                "Full name must be 2-100 characters",
                            ),
                        );
                    }
                    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value)) {
                        return ensureString(
                            t(
                                "servicesPage.booking.validation.nameFormat",
                                "Full name can only contain letters",
                            ),
                        );
                    }
                }
                if (field === "phone") {
                    if (!value.trim()) {
                        return ensureString(
                            t(
                                "servicesPage.booking.validation.phoneRequired",
                                "Please enter phone number",
                            ),
                        );
                    }
                    if (!/^0\d{9}$/.test(value)) {
                        return ensureString(
                            t(
                                "servicesPage.booking.validation.phoneInvalid",
                                "Invalid phone number",
                            ),
                        );
                    }
                }
                if (field === "note") {
                    if (value.length > 500) {
                        return ensureString(
                            t(
                                "servicesPage.booking.validation.noteLength",
                                "Note must not exceed 500 characters",
                            ),
                        );
                    }
                }
                return "";
            },
            [t],
        );

        // Handle form field changes
        const handleFieldChange = useCallback(
            (field: "name" | "phone" | "note", value: string) => {
                setBookingForm(prev => ({ ...prev, [field]: value }));
                const error = validateField(field, value);
                setErrors(prev => ({ ...prev, [field]: error }));
            },
            [validateField],
        );

        // Handle form submission
        const handleSubmit = useCallback(
            async (treatmentId: string, treatmentName: string) => {
                // Validate all fields
                const nameError = validateField("name", bookingForm.name);
                const phoneError = validateField("phone", bookingForm.phone);
                const noteError = validateField("note", bookingForm.note);

                setErrors({
                    name: nameError,
                    phone: phoneError,
                    note: noteError,
                });

                if (nameError || phoneError || noteError) {
                    return;
                }

                setIsSubmitting(true);

                try {
                    const response = await fetch("/api/booking-request", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: bookingForm.name,
                            phone: bookingForm.phone,
                            note: bookingForm.note,
                            treatmentId,
                            treatmentName,
                        }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(
                            data.message ||
                                t(
                                    "servicesPage.booking.toast.errorMessage",
                                    "Unable to save booking request",
                                ),
                        );
                    }

                    toast({
                        title: ensureString(
                            t(
                                "servicesPage.booking.toast.successTitle",
                                "✓ Success",
                            ),
                        ),
                        description: ensureString(
                            t(
                                "servicesPage.booking.toast.successMessage",
                                "Your booking request has been sent. We will contact you soon!",
                            ),
                        ),
                    });

                    // Reset form and close inline form
                    setExpandedTreatmentId(null);
                    setBookingForm({ name: "", phone: "", note: "" });
                    setErrors({ name: "", phone: "", note: "" });

                    // Call legacy callback if provided
                    if (onQuickBook) {
                        onQuickBook(treatmentId, treatmentName);
                    }
                } catch (error) {
                    console.error("Booking submission error:", error);
                    toast({
                        variant: "destructive",
                        title: ensureString(
                            t(
                                "servicesPage.booking.toast.errorTitle",
                                "✗ An error occurred",
                            ),
                        ),
                        description:
                            error instanceof Error
                                ? error.message
                                : ensureString(
                                      t(
                                          "servicesPage.booking.toast.errorMessage",
                                          "Unable to save booking request",
                                      ),
                                  ),
                    });
                } finally {
                    setIsSubmitting(false);
                }
            },
            [bookingForm, validateField, toast, onQuickBook],
        );

        // Get all treatments from filtered services based on problem categories
        const allTreatments = services
            .filter(service => {
                // If no categories are selected, show all services
                if (selectedCategoryIds.length === 0) {
                    return true;
                }

                // If this service has any of the selected problem categories, include it
                return (
                    service.problemCategories?.some(category =>
                        selectedCategoryIds.includes(category._id),
                    ) || false
                );
            })
            .flatMap(service => {
                // Get the problem categories for this service
                const problemCategoryNames = service.problemCategories
                    ? service.problemCategories
                          .map(category => category.title)
                          .join(", ")
                    : "";

                // If no treatments, return empty array to avoid mapping errors
                if (
                    !service.details?.treatments ||
                    service.details.treatments.length === 0
                ) {
                    return [];
                }

                return service.details.treatments
                    .filter(treatment => treatment && treatment.id) // Ensure treatment exists and has ID
                    .map(treatment => {
                        // Generate a standardized description if missing
                        let standardDescription = treatment.description;
                        if (
                            !standardDescription ||
                            typeof standardDescription !== "string" ||
                            standardDescription.trim() === ""
                        ) {
                            standardDescription = `${treatment.name}: ${t("servicesPage.problemSelection.descriptionFallback", "Specialized Treatment")} ${problemCategoryNames || ""}`;
                        }

                        // Create unique ID by combining service ID and treatment ID
                        const uniqueId = `${service.id}-${treatment.id}`;

                        return {
                            ...treatment,
                            id: treatment.id, // Keep original ID for data purposes
                            uniqueId, // Use this for UI state management
                            description: standardDescription,
                            sourceServiceId: service.id,
                            sourceServiceTitle: service.title,
                            problemCategories: service.problemCategories || [],
                            problemCategoryNames,
                        };
                    });
            })
            // Remove duplicates by uniqueId (service + treatment combination)
            .filter(
                (treatment, index, self) =>
                    index ===
                    self.findIndex(t => t.uniqueId === treatment.uniqueId),
            );

        if (allTreatments.length === 0) {
            // Fallback UI if no services have treatments
            if (
                services.length > 0 &&
                services.every(
                    service =>
                        !service.details?.treatments ||
                        service.details.treatments.length === 0,
                )
            ) {
                return (
                    <div className="text-primary-text/80 py-10 text-center">
                        <h3 className="font-robotoSerif mb-3 text-xl">
                            {t(
                                "servicesPage.recommendations.emptyState.noTreatments",
                                "No treatment protocols found",
                            )}
                        </h3>
                        <p>
                            {t(
                                "servicesPage.recommendations.emptyState.noTreatmentsDesc",
                                "Services do not have specific treatment protocols yet. Please contact us for consultation.",
                            )}
                        </p>
                    </div>
                );
            }

            // Standard "no matching treatments" message
            return (
                <div className="text-primary-text/80 py-10 text-center">
                    <h3 className="font-robotoSerif mb-3 text-xl">
                        {t(
                            "servicesPage.recommendations.emptyState.noMatches",
                            "No matching treatment methods found",
                        )}
                    </h3>
                    <p>
                        {t(
                            "servicesPage.recommendations.emptyState.noMatchesDesc",
                            "Please select a different problem or contact us for more consultation",
                        )}
                    </p>
                </div>
            );
        }

        return (
            <>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="font-robotoSerif text-primary-text mb-5 text-2xl font-bold">
                        <span className="bg-primary-text mr-2 inline-flex size-8 items-center justify-center rounded-full text-lg text-white">
                            2
                        </span>
                        {t(
                            "servicesPage.recommendations.stepTitle",
                            "Suitable Treatment Methods",
                        )}
                    </h2>
                    <AnimatePresence mode="wait">
                        <motion.div
                            className="grid auto-rows-auto gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
                            key={selectedCategoryIds.join(",")}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {allTreatments.map((treatment, index) =>
                                treatment && treatment.uniqueId ? (
                                    <motion.div
                                        key={treatment.uniqueId}
                                        className="border-primary-text grid grid-rows-subgrid overflow-hidden rounded-lg border"
                                        style={{ gridRow: "span 2" }}
                                        role="article"
                                        aria-labelledby={`treatment-${treatment.uniqueId}-title`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.4,
                                        }}
                                    >
                                        <div className="bg-primary-text/5 flex flex-col">
                                            <div className="p-3 sm:p-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <h3
                                                        id={`treatment-${treatment.uniqueId}-title`}
                                                        className="text-primary-text font-robotoSerif text-base font-medium sm:text-lg"
                                                    >
                                                        {treatment.name ||
                                                            t(
                                                                "servicesPage.recommendations.noName",
                                                                "No name",
                                                            )}
                                                    </h3>
                                                    {treatment.icon ? (
                                                        getIcon(
                                                            typeof treatment.icon ===
                                                                "string"
                                                                ? treatment.icon
                                                                : (treatment
                                                                      .icon
                                                                      ?.title ??
                                                                      null),
                                                        )
                                                    ) : (
                                                        <AlertCircle
                                                            className="text-primary-text/70 size-5 sm:size-6"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </div>
                                                <p className="font-robotoSlab text-primary-text/80 mb-2 line-clamp-2 text-xs sm:text-sm">
                                                    {treatment.description ||
                                                        t(
                                                            "servicesPage.recommendations.noDescription",
                                                            "No description",
                                                        )}
                                                </p>
                                                <div className="flex flex-col">
                                                    {treatment.problemCategoryNames &&
                                                        treatment.problemCategoryNames.trim() !==
                                                            "" && (
                                                            <div className="text-primary-text/60 text-xs italic">
                                                                <span className="font-medium">
                                                                    {t(
                                                                        "servicesPage.recommendations.recommendedFor",
                                                                        "Recommended for:",
                                                                    )}
                                                                    :
                                                                </span>{" "}
                                                                {
                                                                    treatment.problemCategoryNames
                                                                }
                                                            </div>
                                                        )}
                                                </div>
                                            </div>

                                            {/* Inline Booking Form */}
                                            <AnimatePresence>
                                                {expandedTreatmentId ===
                                                    treatment.uniqueId && (
                                                    <motion.div
                                                        className="border-primary-text/20 bg-primary-background border-t p-3 sm:p-4"
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                    >
                                                        <div className="mb-3 flex items-center justify-between">
                                                            <h4 className="text-primary-text font-robotoSerif text-sm font-medium sm:text-base">
                                                                {t(
                                                                    "servicesPage.booking.title",
                                                                    "Book Consultation",
                                                                )}
                                                            </h4>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleToggleBookingForm(
                                                                        treatment.uniqueId,
                                                                    )
                                                                }
                                                                className="hover:bg-primary-text/10 size-7"
                                                                aria-label={ensureString(
                                                                    t(
                                                                        "servicesPage.booking.closeFormAriaLabel",
                                                                        "Close form",
                                                                    ),
                                                                )}
                                                            >
                                                                <X className="size-4" />
                                                            </Button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div>
                                                                <Label
                                                                    htmlFor={`name-${treatment.uniqueId}`}
                                                                    className="text-primary-text/70 font-robotoSlab text-xs"
                                                                >
                                                                    {t(
                                                                        "servicesPage.booking.nameRequired",
                                                                        "Full name *",
                                                                    )}
                                                                </Label>
                                                                <Input
                                                                    id={`name-${treatment.uniqueId}`}
                                                                    value={
                                                                        bookingForm.name
                                                                    }
                                                                    onChange={e =>
                                                                        handleFieldChange(
                                                                            "name",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder={ensureString(
                                                                        t(
                                                                            "servicesPage.booking.namePlaceholder",
                                                                            "John Doe",
                                                                        ),
                                                                    )}
                                                                    className="mt-1 h-9 text-sm"
                                                                    disabled={
                                                                        isSubmitting
                                                                    }
                                                                />
                                                                {errors.name && (
                                                                    <p className="mt-1 text-xs text-red-600">
                                                                        {
                                                                            errors.name
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <Label
                                                                    htmlFor={`phone-${treatment.uniqueId}`}
                                                                    className="text-primary-text/70 font-robotoSlab text-xs"
                                                                >
                                                                    {t(
                                                                        "servicesPage.booking.phoneRequired",
                                                                        "Phone number *",
                                                                    )}
                                                                </Label>
                                                                <Input
                                                                    id={`phone-${treatment.uniqueId}`}
                                                                    value={
                                                                        bookingForm.phone
                                                                    }
                                                                    onChange={e =>
                                                                        handleFieldChange(
                                                                            "phone",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder={ensureString(
                                                                        t(
                                                                            "servicesPage.booking.phonePlaceholder",
                                                                            "0901234567",
                                                                        ),
                                                                    )}
                                                                    className="mt-1 h-9 text-sm"
                                                                    disabled={
                                                                        isSubmitting
                                                                    }
                                                                />
                                                                {errors.phone && (
                                                                    <p className="mt-1 text-xs text-red-600">
                                                                        {
                                                                            errors.phone
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <Label
                                                                    htmlFor={`note-${treatment.uniqueId}`}
                                                                    className="text-primary-text/70 font-robotoSlab text-xs"
                                                                >
                                                                    {t(
                                                                        "servicesPage.booking.noteOptional",
                                                                        "Note (optional)",
                                                                    )}
                                                                </Label>
                                                                <Textarea
                                                                    id={`note-${treatment.uniqueId}`}
                                                                    value={
                                                                        bookingForm.note
                                                                    }
                                                                    onChange={e =>
                                                                        handleFieldChange(
                                                                            "note",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder={ensureString(
                                                                        t(
                                                                            "servicesPage.booking.notePlaceholder",
                                                                            "Example: I would like to book in the morning...",
                                                                        ),
                                                                    )}
                                                                    className="mt-1 min-h-[60px] text-sm"
                                                                    disabled={
                                                                        isSubmitting
                                                                    }
                                                                />
                                                                {errors.note && (
                                                                    <p className="mt-1 text-xs text-red-600">
                                                                        {
                                                                            errors.note
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="flex gap-2 pt-1">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleToggleBookingForm(
                                                                            treatment.uniqueId,
                                                                        )
                                                                    }
                                                                    className="flex-1 text-xs"
                                                                    disabled={
                                                                        isSubmitting
                                                                    }
                                                                >
                                                                    {t(
                                                                        "servicesPage.booking.cancelButton",
                                                                        "Cancel",
                                                                    )}
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleSubmit(
                                                                            treatment.id, // Use original ID for API
                                                                            treatment.name,
                                                                        )
                                                                    }
                                                                    className="bg-primary-text hover:bg-primary-text/90 flex-1 text-xs text-white"
                                                                    disabled={
                                                                        isSubmitting
                                                                    }
                                                                >
                                                                    {isSubmitting
                                                                        ? t(
                                                                              "servicesPage.booking.submitting",
                                                                              "Submitting...",
                                                                          )
                                                                        : t(
                                                                              "servicesPage.booking.submitButton",
                                                                              "Submit request",
                                                                          )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="bg-primary-background p-3 sm:p-4">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                                                {treatment.href &&
                                                treatment.href.trim() !== "" ? (
                                                    <Link
                                                        href={`/treatments/${treatment.href}`}
                                                        passHref
                                                    >
                                                        <Button
                                                            variant="link"
                                                            className="text-primary-text group flex w-full items-center justify-center gap-1 px-0 py-2 text-sm transition-all duration-200 hover:underline sm:w-auto sm:justify-start"
                                                            aria-label={`${t("servicesPage.recommendations.viewDetailsAriaLabel", "View details about")} ${treatment.name || t("servicesPage.recommendations.noName", "treatment")}`}
                                                        >
                                                            {t(
                                                                "servicesPage.recommendations.viewDetails",
                                                                "Details",
                                                            )}
                                                            <ChevronRight
                                                                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                                                                aria-hidden="true"
                                                            />
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <div className="w-full sm:w-auto" />
                                                )}
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        handleToggleBookingForm(
                                                            treatment.uniqueId,
                                                        );
                                                    }}
                                                    className="bg-primary-text hover:bg-primary-text/90 flex w-full items-center justify-center rounded-md px-4 py-2 text-sm text-white shadow-md transition-all duration-300 sm:w-auto"
                                                    aria-label={`${t("servicesPage.booking.bookAriaLabel", "Book appointment for")} ${treatment.name || t("servicesPage.recommendations.noName", "treatment")}`}
                                                >
                                                    <Calendar
                                                        className="mr-1 size-4"
                                                        aria-hidden="true"
                                                    />
                                                    {t(
                                                        "servicesPage.booking.bookButton",
                                                        "Book now",
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : null,
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </>
        );
    },
);

TreatmentRecommendations.displayName = "TreatmentRecommendations";
