// src/components/layout/MobileDock.tsx
"use client";
import CTAButton from "@/components/cta/CTAButton";
import { CONTACT } from "@/lib/site";

export default function MobileDock() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="mx-auto max-w-6xl grid grid-cols-3">
        <a
          href={CONTACT.telLink}
          onClick={() => {}}
          className="py-3 text-center font-medium text-gray-900 hover:bg-gray-50"
        >
          電話
        </a>
        <a
          href={CONTACT.lineUrl}
          onClick={() => {}}
          className="py-3 text-center font-medium text-gray-900 hover:bg-gray-50"
        >
          LINE
        </a>
        <CTAButton
          href={CONTACT.formPath}
          label="フォーム"
          variant="ghost"
          size="md"
        />
      </div>
    </div>
  );
}
