import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuHouse,
  LuSettings,
  LuShoppingCart,
  LuUtensils,
  LuBookOpen,
} from "react-icons/lu";

export function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 shadow-lg z-10">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/") ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <LuHouse className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/meal-plan"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/meal-plan") ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <LuUtensils className="h-5 w-5" />
          <span className="text-xs mt-1">Plan</span>
        </Link>
        <Link
          href="/meals"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/meals") ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <LuBookOpen className="h-5 w-5" />
          <span className="text-xs mt-1">Meals</span>
        </Link>
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/shop") ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <LuShoppingCart className="h-5 w-5" />
          <span className="text-xs mt-1">Shop</span>
        </Link>
        <Link
          href="/settings"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/settings") ? "text-orange-500" : "text-gray-500"
          }`}
        >
          <LuSettings className="h-5 w-5" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
}
