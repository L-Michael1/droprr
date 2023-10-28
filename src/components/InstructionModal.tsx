import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import localFont from "next/font/local";

const walsheim = localFont({
  src: "../../public/fonts/GTWalsheimProRegular.woff2",
  variable: "--font-walsheim",
});

const InstructionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenInstruction = localStorage.getItem("hasSeenInstruction");
    if (!hasSeenInstruction) {
      setIsOpen(true);
    }
  }, []);

  function closeModal() {
    localStorage.setItem("hasSeenInstruction", "true");
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`${walsheim.variable} w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle font-sans shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="mb-2 mt-2 text-2xl font-medium leading-6 text-gray-900"
                  >
                    Time to track your first product! 🎉
                  </Dialog.Title>
                  <hr />
                  <div className="mt-2">
                    <p className="text-lg text-gray-500">
                      1. 🛒 Find an amazon product you want to track.
                      <br />
                      2. 📋 Copy the link of the product.
                      <br />
                      3. 🚀 Paste it in the input bar above.
                      <br />
                      4. 🎉 You&apos;re done! We&apos;ll notify you when the
                      price drops!
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="cta-button"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default InstructionModal;
