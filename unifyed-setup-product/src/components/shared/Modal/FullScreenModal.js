import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

/**
 *
 * @returns a full scree modal
 */
export default function FullScreenModal({ isOpen, onClose, title, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[99999] inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full h-full flex flex-col relative overflow-y-auto bg-white  transform  transition-all">
            <header className="relative top-0 right-0 left-auto w-full flex flex-row bg-green-700 z-[1100] h-16 justify-between p-6 items-center">
              <Dialog.Title as="h6" className="text-white text-lg">
                {title}
              </Dialog.Title>
              <div
                id={`${module}=closebtn`}
                onClick={onClose}
                aria-label="close"
              >
                <XMarkIcon
                  width="28px"
                  height="28px"
                  id={`${module}-closeIcon`}
                  className="fill-white text-white"
                />
              </div>
            </header>
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
