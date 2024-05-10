import Alert from "@/ui/alert";
import ExternalLink from "@/ui/external-link";
import { SproutIcon } from "lucide-react";

const BetaWarning = () => {
  return (
    <Alert
      variant="info"
      icon={<SproutIcon size={20} />}
      className="rounded-none border-y bg-white p-4 text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/85 dark:text-white"
      containerClassName="container"
      iconSize={12}
    >
      <p>Welcome to the link shortener beta.</p>
    </Alert>
  );
};

export default BetaWarning;
