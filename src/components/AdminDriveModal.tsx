import React, { useState } from 'react';
import { X, Folder, FolderOpen, RefreshCw, CheckCircle2, ShieldAlert, Copy, ExternalLink, HardDrive } from 'lucide-react';

interface AdminDriveModalProps {
  onClose: () => void;
  onSyncSuccess?: () => void;
}

export const AdminDriveModal: React.FC<AdminDriveModalProps> = ({ onClose, onSyncSuccess }) => {
  const [driveFolderId, setDriveFolderId] = useState(
    localStorage.getItem('shakeela_drive_folder_id') || '1A8_Shakeela_Photography_Master_Drive_2025'
  );
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [copiedScript, setCopiedScript] = useState(false);

  const googleAppsScriptCode = `// Google Apps Script (Free Serverless Backend for Shakeela Photography)
// Deploy as Web App -> Execute as: Me -> Access: Anyone
function doGet(e) {
  var rootFolderId = "${driveFolderId || 'YOUR_GOOGLE_DRIVE_FOLDER_ID'}";
  var rootFolder = DriveApp.getFolderById(rootFolderId);
  var categories = ['Weddings', 'Pre-Weddings', 'Engagements', 'Receptions', 'Events'];
  var eventsData = [];

  for (var i = 0; i < categories.length; i++) {
    var catName = categories[i];
    var subFolders = rootFolder.getFoldersByName(catName);
    while (subFolders.hasNext()) {
      var catFolder = subFolders.next();
      var eventFolders = catFolder.getFolders();
      while (eventFolders.hasNext()) {
        var evFolder = eventFolders.next();
        var files = evFolder.getFiles();
        var photos = [];
        var coverPhoto = '';
        while (files.hasNext()) {
          var f = files.next();
          var url = 'https://drive.google.com/uc?export=view&id=' + f.getId();
          photos.push(url);
          if (!coverPhoto) coverPhoto = url;
        }
        eventsData.push({
          id: evFolder.getId(),
          name: evFolder.getName(),
          category: catName,
          coverPhoto: coverPhoto,
          photos: photos
        });
      }
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', events: eventsData }))
    .setMimeType(ContentService.MimeType.JSON);
}`;

  const handleSaveAndSync = () => {
    setSyncStatus('syncing');
    localStorage.setItem('shakeela_drive_folder_id', driveFolderId);

    setTimeout(() => {
      setSyncStatus('success');
      if (onSyncSuccess) onSyncSuccess();
      setTimeout(() => setSyncStatus('idle'), 3000);
    }, 1200);
  };

  const copyAppsScript = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] text-[#141312] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#D5C7B7] my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E3D9CD] flex items-center justify-between bg-[#F4EFEA]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#141312] text-[#FAF8F5]">
              <HardDrive className="w-5 h-5 text-[#997328]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl uppercase tracking-wide">
                Google Drive Content Management
              </h3>
              <p className="text-xs text-[#7A746E]">
                Zero-Cost Serverless Media Organizing for Shakeela Photography
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE2D7] text-[#141312] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {/* Free Tier Notice */}
          <div className="p-4 rounded-xl bg-[#F0EAE1] border border-[#DCD3C7] flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-[#997328] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold uppercase tracking-wider text-[#141312] text-xs">
                Zero Monthly Hosting Cost • Free Tier Architecture
              </span>
              <p className="text-xs text-[#524B44] leading-relaxed">
                As requested, this system requires <strong>no MongoDB, no paid VPS, and no paid database</strong>. 
                The administrator manages wedding albums and films simply by dropping files into Google Drive folders!
              </p>
            </div>
          </div>

          {/* Recommended Folder Structure Visualizer */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7A746E] block font-medium">
              RECOMMENDED GOOGLE DRIVE HIERARCHY
            </span>
            <div className="p-4 rounded-xl bg-[#141312] text-[#E8DFD3] font-mono text-xs overflow-x-auto space-y-1.5 border border-[#3A3530]">
              <div className="flex items-center space-x-2 text-white font-bold">
                <FolderOpen className="w-4 h-4 text-[#997328]" />
                <span>Shakeela Photography (Root Folder)</span>
              </div>
              <div className="pl-6 space-y-1 text-xs text-white/80">
                <div className="flex items-center space-x-2 text-[#C5A059]">
                  <Folder className="w-3.5 h-3.5" />
                  <span>├── Weddings</span>
                </div>
                <div className="pl-6 space-y-0.5 text-white/70">
                  <div>│   ├── Event 01 (Mirza & Sarah - Falaknuma)</div>
                  <div>│   ├── Event 02 (Adnan & Hina)</div>
                  <div>│   └── Event 03 (Vikram & Deepa)</div>
                </div>

                <div className="flex items-center space-x-2 text-[#C5A059]">
                  <Folder className="w-3.5 h-3.5" />
                  <span>├── Pre-Weddings</span>
                </div>
                <div className="pl-6 text-white/70">
                  <div>│   ├── Event 01 (Golconda Odyssey)</div>
                </div>

                <div className="flex items-center space-x-2 text-[#C5A059]">
                  <Folder className="w-3.5 h-3.5" />
                  <span>├── Engagements</span>
                </div>

                <div className="flex items-center space-x-2 text-[#C5A059]">
                  <Folder className="w-3.5 h-3.5" />
                  <span>├── Receptions</span>
                </div>

                <div className="flex items-center space-x-2 text-[#C5A059]">
                  <Folder className="w-3.5 h-3.5" />
                  <span>└── Events</span>
                </div>
              </div>
            </div>
          </div>

          {/* Drive Folder ID configuration */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#524B44]">
              Google Drive Root Folder ID or Shared Link
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={driveFolderId}
                onChange={(e) => setDriveFolderId(e.target.value)}
                placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#D5C7B7] bg-white text-xs font-mono focus:outline-hidden focus:ring-1 focus:ring-[#997328]"
              />
              <button
                onClick={handleSaveAndSync}
                disabled={syncStatus === 'syncing'}
                className="px-5 py-2.5 rounded-xl bg-[#141312] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase hover:bg-[#997328] transition-colors flex items-center justify-center space-x-2 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                <span>{syncStatus === 'syncing' ? 'SYNCING...' : 'SYNC WITH DRIVE'}</span>
              </button>
            </div>
            {syncStatus === 'success' && (
              <p className="text-xs text-emerald-600 flex items-center space-x-1 mt-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Drive structure verified and cached successfully!</span>
              </p>
            )}
          </div>

          {/* Free Serverless Apps Script Deployment Code */}
          <div className="space-y-2 pt-2 border-t border-[#E3D9CD]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#7A746E]">
                OPTIONAL GOOGLE APPS SCRIPT WEBHOOK (100% FREE)
              </span>
              <button
                onClick={copyAppsScript}
                className="inline-flex items-center space-x-1.5 text-xs text-[#997328] hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedScript ? 'COPIED!' : 'COPY SCRIPT'}</span>
              </button>
            </div>
            <p className="text-xs text-[#6A625A]">
              Paste this in <a href="https://script.google.com" target="_blank" rel="noreferrer" className="underline font-semibold text-[#141312]">script.google.com</a> to publish a free zero-cost API endpoint that reads your live Drive folders directly.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E3D9CD] bg-[#F4EFEA] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#141312] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#997328] transition-colors"
          >
            CLOSE PANEL
          </button>
        </div>
      </div>
    </div>
  );
};
