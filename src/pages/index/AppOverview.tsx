import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";
import { DropdownMenu, MenuItem } from "src/components/DropdownMenu";
import { Link } from "src/components/Link";
import { AuthCredentials, AuthStatus } from "src/providers/Auth";
import { pluralizeWord } from "src/utils/misc";

export type AppOverviewProps = {
  itemsLeft: number;
  auth: AuthStatus & { credentials: AuthCredentials };
};

// TODO remove
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const AppOverview: FC<AppOverviewProps> = ({ auth, itemsLeft }) => (
  <div className="mx-auto max-w-md pt-2">
    <div className="flex justify-between items-start">
      {/* Data */}
      <div>
        <h2 className="text-xl font-medium text-gray-800">
          Hello, {auth.credentials.username}
        </h2>
        <div className="h-2"></div>
        <p className="font-xs text-gray-500">
          You&apos; ve got {itemsLeft} {pluralizeWord(itemsLeft, "task")} left{" "}
        </p>
      </div>
      <div>
        <DropdownMenu>
          <MenuItem type="button" onClick={noop} icon={UserIcon}>
            Account
          </MenuItem>
          <MenuItem type="button" onClick={noop} icon={Cog6ToothIcon}>
            Settings
          </MenuItem>
          <MenuItem
            type="button"
            onClick={auth.logout}
            icon={ArrowRightOnRectangleIcon}
          >
            Log out
          </MenuItem>

          <hr className="my-2" />

          <div className="px-2">
            <p className="text-sm text-gray-400 font-light">
              Made with love by{" "}
              <Link href="#">
                <span className="font-normal">ascandone</span>
              </Link>{" "}
            </p>
          </div>
        </DropdownMenu>
      </div>
    </div>
  </div>
);
