"use client";

import { Link } from "@mui/joy";
import { Carousel } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = (props: Props) => {
  const router = useRouter();

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  const onClickSkip = () => {
    router.push("/login");
  };

  return (
    <div>
      <Carousel autoplay afterChange={onChange}>
        <div>
          <Image
            alt="logo_bmw"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
            src="/images/bg/bg_carousel_1.jpeg"
          />
        </div>
        <div>
          <Image
            alt="logo_bmw"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
            src="/images/bg/bg_carousel_2.png"
          />
        </div>
        <div>
          <Image
            alt="logo_bmw"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
            src="/images/bg/bg_carousel_3.png"
          />
        </div>
        <div>
          <Image
            alt="logo_bmw"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
            src="/images/bg/bg_carousel_4.webp"
          />
        </div>
      </Carousel>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          bottom: 24,
          right: 34,
          color: "white",
        }}
      >
        <Link onClick={onClickSkip} sx={{ color: "#ffffff" }}>
          Skip
        </Link>
      </div>
    </div>
  );
};

export default Home;
