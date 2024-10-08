import SwiperCarousel from "@/components/SwiperCarousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

import stretching from "@/assets/images/Stretching.jpg";
import exercise from "@/assets/images/Exercise.jpg";
import acupuncture from "@/assets/images/acupuncture.jpg";

const treatments = [
  {
    title: "Công cụ giải quyết công việc",
    description:
      "Các phương pháp tuyển tập giúp bạn có thể nhanh chóng giải quyết công việc một cách hiệu quả. Đồng thời giúp bạn tiết kiệm thời gian, công sức và chi phí đáng kể.",
    image: stretching,
  },
  {
    title: "Tập luyện",
    description:
      "Các phương pháp tuyển tập giúp bạn có thể nhanh chóng tập luyện một cách hiệu quả. Đồng thời giúp bạn tiết kiệm thời gian, công sức và chi phí đáng kể.",
    image: exercise,
  },
  {
    title: "Điện châm",
    description:
      "Các phương pháp tuyển tập giúp bạn có thể nhanh chóng xử lý dữ liệu điện tử một cách hiệu quả. Đồng thời giúp bạn tiết kiệm thời gian, công sức và chi phí đáng kể.",
    image: acupuncture,
  },
];

export default function TreatmentsPage() {
  return (
    <div className="relative w-full bg-primary-background py-16 sm:px-16">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center text-primary-text">
        <span className="mb-4 inline-block rounded-lg bg-primary-text/10 px-3 py-1 font-robotoMono text-base font-light">
          Khám phá
        </span>
        <h2 className="mb-6 max-w-2xl font-robotoSerif text-3xl font-bold capitalize p-1">
          Các phương pháp điều trị toàn diện cho sự phục hồi tối ưu
        </h2>
        <p className="mb-8 max-w-xl p-1 font-robotoSlab font-normal text-primary-text/50">
          Các phương pháp điều trị vật lý trị trị liệu của chúng tôi bao gồm một
          lọa các giải pháp để đáp ứng nhu cầu riêng của bạn. Từ liệu pháp thủ
          công đến điện châm, chúng tôi sẽ giúp bạn tạo ra một phương pháp điều
          trị cá nhân hóa để giúp bạn đạt được sự phục hồi tối ưu.
        </p>
      </div>
      <div className="relative z-10 mt-12 flex flex-row items-center justify-center text-center font-robotoSerif font-normal text-primary-text">
        <Button
          variant={"outline"}
          className="border-primary-text bg-transparent text-primary-text hover:bg-primary-text hover:text-white"
        >
          Tìm hiểu thêm
        </Button>
        <Button
          variant={"link"}
          className="group flex flex-row text-primary-text"
        >
          Đặt lịch hẹn
          <ChevronRight className="ml-2 h-4 w-4 animate-shake" />
        </Button>
      </div>
      <div className="mt-12">
        <SwiperCarousel
          items={treatments.map((treatment) => ({
            ...treatment,
            image: treatment.image.src,
          }))}
        />
      </div>
    </div>
  );
}
