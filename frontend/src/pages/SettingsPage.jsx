import React from 'react';
import { UserCheck, Shield, Key, Bell, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { user } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Account Settings & Security
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal profile, PAN verification status, and notification preferences
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-full bg-slate-900 text-white font-bold text-xl flex items-center justify-center">
            {user.initials}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">{user.name}</h3>
            <p className="text-xs text-slate-500">{user.email}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <CheckCircle2 size={14} /> PAN Verified & KYC Compliant
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              readOnly
              value={user.name}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              readOnly
              value={user.email}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Risk Profile</label>
            <input
              type="text"
              readOnly
              value={user.riskProfile}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Currency Standard</label>
            <input
              type="text"
              readOnly
              value="Indian Rupee (INR ₹) Primary"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Shield size={16} className="text-emerald-600" />
          Security Status & Authentication
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          In Phase 2, this section will connect to JWT authentication endpoints, bcrypt password encryption, and two-factor SMS/TOTP authentication.
        </p>
        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Session Token: Valid (Phase 1 Simulated Context)</span>
        </div>
      </div>
    </div>
  );
};
