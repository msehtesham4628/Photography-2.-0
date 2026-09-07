import React from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Calendar,
  User,
  Users,
  CheckCircle2,
  ExternalLink,
  MapPin,
  FileText
} from 'lucide-react';
import { OFFICIAL_REGISTRATION } from '../data/instagramData';

interface RegistrationCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationCertificateModal: React.FC<RegistrationCertificateModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0F0E0C] border border-[#C5A059]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header Emblem & Title */}
        <div className="text-center space-y-2 border-b border-white/10 pb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#107c41]/20 border border-[#107c41]/60 text-[#34A853] text-[11px] font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OFFICIAL GOVERNMENT REGISTERED ESTABLISHMENT</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF8F5] pt-1 uppercase">
            Government of Telangana
          </h3>
          <p className="text-xs font-mono uppercase text-[#C5A059] tracking-widest">
            Labour Department · {OFFICIAL_REGISTRATION.form}
          </p>
          <div className="text-sm font-serif italic text-white/80">
            Certificate Of Registration
          </div>
          <div className="inline-block mt-2 px-4 py-1.5 rounded-lg bg-black/70 border border-[#C5A059]/50 font-mono text-xs text-[#E6B85C] font-semibold">
            Reg. No. {OFFICIAL_REGISTRATION.regNo}
          </div>
        </div>

        {/* Certificate Preamble */}
        <p className="text-xs sm:text-sm text-white/80 font-sans text-center py-4 leading-relaxed">
          Registered as a Commercial Establishment / Shop under the{' '}
          <strong className="text-white">Telangana Shops &amp; Establishments Act, 1988</strong> on{' '}
          <strong className="text-[#C5A059]">{OFFICIAL_REGISTRATION.registrationDate}</strong>.
        </p>

        {/* Official Particulars Table */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/15 divide-y divide-white/10 text-xs font-mono">
          <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
            <span className="sm:col-span-5 text-white/50 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Name of Establishment:</span>
            </span>
            <span className="sm:col-span-7 font-bold text-white uppercase">
              {OFFICIAL_REGISTRATION.establishmentName}
            </span>
          </div>

          <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
            <span className="sm:col-span-5 text-white/50 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Name of the Employer:</span>
            </span>
            <span className="sm:col-span-7 font-bold text-[#FAF8F5]">
              {OFFICIAL_REGISTRATION.employerName}{' '}
              <span className="text-[11px] text-white/50 font-normal">
                (Age: {OFFICIAL_REGISTRATION.employerAge})
              </span>
            </span>
          </div>

          <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
            <span className="sm:col-span-5 text-white/50">Father / Husband's Name:</span>
            <span className="sm:col-span-7 text-white/90">
              {OFFICIAL_REGISTRATION.fatherHusbandName}
            </span>
          </div>

          <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-start">
            <span className="sm:col-span-5 text-white/50 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Establishment Address:</span>
            </span>
            <span className="sm:col-span-7 text-white/90 font-sans text-xs leading-relaxed">
              {OFFICIAL_REGISTRATION.address}
            </span>
          </div>

          <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
            <span className="sm:col-span-5 text-white/50 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Nature of Business:</span>
            </span>
            <span className="sm:col-span-7 text-[#E6B85C] font-semibold">
              {OFFICIAL_REGISTRATION.natureOfBusiness}
            </span>
          </div>

          <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
            <span className="sm:col-span-5 text-white/50 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Registered Employees:</span>
            </span>
            <span className="sm:col-span-7 text-white/90">
              {OFFICIAL_REGISTRATION.employeesCount} Certified Team Members
            </span>
          </div>

          <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
            <span className="sm:col-span-5 text-white/50 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Date of Commencement:</span>
            </span>
            <span className="sm:col-span-7 text-white/90">
              {OFFICIAL_REGISTRATION.commencementDate}
            </span>
          </div>

          <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-center">
            <span className="sm:col-span-5 text-white/50">Registering Authority:</span>
            <span className="sm:col-span-7 text-white/90">
              {OFFICIAL_REGISTRATION.authorityName} ({OFFICIAL_REGISTRATION.authorityDesignation}) ·{' '}
              {OFFICIAL_REGISTRATION.place}
            </span>
          </div>
        </div>

        {/* Verification Link & Compliance Note */}
        <div className="mt-5 p-4 rounded-2xl bg-[#107c41]/10 border border-[#107c41]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#34A853]">
            <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0" />
            <span>SYSTEM GENERATED GOVERNMENT CERTIFICATE</span>
          </div>
          <p className="text-[11px] font-sans text-white/75 leading-relaxed">
            This certificate can be verified on the official Telangana Labour Department portal by
            furnishing registration certificate number{' '}
            <strong className="text-white font-mono">{OFFICIAL_REGISTRATION.regNo}</strong>.
          </p>
          <div className="pt-1">
            <a
              href={OFFICIAL_REGISTRATION.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E6B85C] hover:underline"
            >
              <span>Verify on labour.telangana.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Close action */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
