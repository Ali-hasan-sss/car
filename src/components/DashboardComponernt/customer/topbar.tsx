import Avatar from "@/components/avatar/avatar";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";
import Logo from "../../NavBar/top-bar/logo";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import { useEffect, useState } from "react";

interface TopBarProps {
  isExpand: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function Topbar({ isExpand, scrollContainerRef }: TopBarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollThreshold = 40;
      setIsSticky(container.scrollTop > scrollThreshold);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  return (
    <>
      <div
        className={`${
          isSticky
            ? "sticky top-0 z-50  backdrop-blur-xl bg-secondary1 bg-opacity-90"
            : ""
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between gap-[16px] px-4 py-2">
          {!isExpand ? (
            <div className="hidden md:block">
              <Logo width="100" />
            </div>
          ) : (
            <div className="hidden md:block"></div>
          )}
          <div className="md:hidden">
            <Logo width="100" />
          </div>

          <div className="flex items-center justify-center gap-4">
            <LanguageSwitcher />
            <NotificationDropdown />
            <Avatar width="8" />
          </div>
        </div>
      </div>

      {isSticky && <div className="h-[72px]" />}
    </>
  );
}
