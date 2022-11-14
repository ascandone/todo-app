import { FC, Fragment, ReactNode, useState } from "react";
import {
  EllipsisVerticalIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { Link } from "./Link";

const IconButton: FC<{ onClick: VoidFunction }> = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="group-hover:block inline hover:bg-zinc-100 rounded-md p-1 -m-1"
  >
    <EllipsisVerticalIcon className="text-black h-6 w-6" />
  </button>
);

export const Menu: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="w-64 shadow-soft rounded-lg px-2 py-2 bg-white">
    {children}
  </div>
);

const MenuItem: FC<{
  icon: FC<{ className: string }>;
  children: ReactNode;
}> = ({ icon: Icon, children }) => (
  <button
    type="button"
    className="flex gap-x-4 text-gray-800 transition-colors duration-150 hover:bg-gray-100 rounded py-2 px-2 w-full"
  >
    <span>
      <Icon className="h-6" />
    </span>
    <span>{children}</span>
  </button>
);

export const DropdownMenu: FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <span className="relative">
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <IconButton
          onClick={() => {
            setOpened(!opened);
          }}
        />
        <Transition
          show={opened}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute right-0 z-40">
            <Menu>
              <MenuItem icon={UserIcon}>Account</MenuItem>
              <MenuItem icon={Cog6ToothIcon}>Settings</MenuItem>
              <MenuItem icon={ArrowRightOnRectangleIcon}>Log out</MenuItem>

              <hr className="my-2" />

              <div className="px-2">
                <p className="text-sm text-gray-400 font-light">
                  Made with love by{" "}
                  <Link href="#">
                    <span className="font-normal">ascandone</span>
                  </Link>{" "}
                </p>
              </div>
            </Menu>
          </div>
        </Transition>
      </span>
    </div>
  );
};
