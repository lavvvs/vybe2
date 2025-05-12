import Link from "next/link";
import { Button } from "../ui/button";
import { GiShoppingBag } from "react-icons/gi";

function Logo() {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <GiShoppingBag className="w-6 h-6" />
      </Link>
    </Button>
  );
}
export default Logo;
