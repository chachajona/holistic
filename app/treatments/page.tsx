import { ChevronRight } from "lucide-react";
import React from "react";

import acupuncture from "@/assets/images/acupuncture.jpg";
import exercise from "@/assets/images/Exercise.jpg";
import stretching from "@/assets/images/Stretching.jpg";
import SwiperCarousel from "@/components/SwiperCarousel";
import { Button } from "@/components/ui/button";

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
    <div className="bg-primary-background relative w-full py-16 sm:px-16">
      <div className="text-primary-text relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <span className="bg-primary-text/10 font-robotoMono mb-4 inline-block rounded-lg px-3 py-1 text-base font-light">
          Khám phá
        </span>
        <h2 className="font-robotoSerif mb-6 max-w-2xl p-1 text-3xl font-bold capitalize">
          Các phương pháp điều trị toàn diện cho sự phục hồi tối ưu
        </h2>
        <p className="font-robotoSlab text-primary-text/50 mb-8 max-w-xl p-1 font-normal">
          Các phương pháp điều trị vật lý trị trị liệu của chúng tôi bao gồm một
          lọa các giải pháp để đáp ứng nhu cầu riêng của bạn. Từ liệu pháp thủ
          công đến điện châm, chúng tôi sẽ giúp bạn tạo ra một phương pháp điều
          trị cá nhân hóa để giúp bạn đạt được sự phục hồi tối ưu.
        </p>
      </div>
      <div className="font-robotoSerif text-primary-text relative z-10 mt-12 flex flex-row items-center justify-center text-center font-normal">
        <Button
          variant={"outline"}
          className="border-primary-text text-primary-text hover:bg-primary-text bg-transparent hover:text-white"
        >
          Tìm hiểu thêm
        </Button>
        <Button
          variant={"link"}
          className="text-primary-text group flex flex-row"
        >
          Đặt lịch hẹn
          <ChevronRight className="animate-shake ml-2 size-4" />
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
