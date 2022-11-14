import { FC, Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

const IconButton: FC<{ onClick: VoidFunction }> = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="group-hover:block inline hover:bg-zinc-100 rounded-md p-1 -m-1"
  >
    <EllipsisVerticalIcon className="text-black h-6 w-6" />
  </button>
);

const Menu: FC<{ children: ReactNode; onClickOutside: VoidFunction }> = ({
  children,
  onClickOutside,
}) => {
  const menuRef = useRef<HTMLElement | null>();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        e.target &&
        menuRef.current &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        !menuRef.current.contains(e.target)
      ) {
        onClickOutside();
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [menuRef, onClickOutside]);

  return (
    <div
      ref={(el) => {
        menuRef.current = el;
      }}
      className="w-64 shadow-soft rounded-lg px-2 py-2 bg-white"
    >
      {children}
    </div>
  );
};

export type MenuItemType =
  | { type: "link"; to: string }
  | { type: "button"; onClick: VoidFunction };

export type MenuItemProps = {
  icon: FC<{ className: string }>;
  children: ReactNode;
} & MenuItemType;

export const MenuItem: FC<MenuItemProps> = ({
  icon: Icon,
  children,
  ...props
}) => (
  <button
    onClick={() => {
      if (props.type === "button") {
        props.onClick();
      }
    }}
    type="button"
    className="flex gap-x-4 text-gray-800 transition-colors duration-150 hover:bg-gray-100 rounded py-2 px-2 w-full"
  >
    <span>
      <Icon className="h-6" />
    </span>
    <span>{children}</span>
  </button>
);

export const DropdownMenu: FC<{ children: ReactNode }> = ({ children }) => {
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
            <Menu onClickOutside={() => setOpened(false)}>{children}</Menu>
          </div>
        </Transition>
      </span>
    </div>
  );
};
