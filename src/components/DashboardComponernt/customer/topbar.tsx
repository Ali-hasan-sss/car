import Avatar from "@/components/avatar/avatar";
import LanguageSwitcher from "@/components/buttons/btn-switch/LanguageSwitcher";
import Logo from "../../NavBar/top-bar/logo";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
interface TopBarProps {
  isExpand: boolean;
}
export default function Topbar({ isExpand }: TopBarProps) {
  return (
    <div
      className={`flex items-center justify-between gap-[16px] ${
        !isExpand ? "" : ""
      }`}
    >
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
  );
}
