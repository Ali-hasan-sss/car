export default function About_section1() {
  return (
    <div className="py-[10px] flex flex-col gap-[40px]  md:py-[50px] px-[10px] md:px-[50px] bg-white ">
      <div className="flex flex-col gap-[10px]">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="text-text_des text-lg">
          Our mission is to simplify the automotive process for our customers by
          offering transparent, reliable, and high-quality services. We aim to
          be a one-stop destination for all your car-related needs, delivering
          exceptional value and exceeding expectations.
        </p>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h2 className="text-3xl font-bold">Our Vision</h2>
        <p className="text-text_des text-lg">
          To become a global leader in the automotive services industry by
          building a reputation for excellence, trust, and innovation. We strive
          to connect buyers, sellers, and shippers through cutting-edge
          technology and customer-focused solutions.
        </p>
      </div>
    </div>
  );
}
