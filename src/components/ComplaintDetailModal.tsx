import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import { X, MapPin, Calendar, CheckCircle2, Clock, AlertCircle, Send, Star, Phone, Shield } from 'lucide-react';

interface ComplaintDetailModalProps {
  complaint: Complaint | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: ComplaintStatus) => void;
}

export const ComplaintDetailModal: React.FC<ComplaintDetailModalProps> = ({
  complaint,
  onClose,
  onUpdateStatus,
}) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; time: string }>>([
    {
      id: 'c1',
      author: 'Campus Support Team',
      text: 'Our field technician has been notified and scheduled for priority inspection.',
      time: '1 hour ago',
    },
  ]);
  const [userRating, setUserRating] = useState<number>(complaint?.rating || 0);
  const [showEscalatedBanner, setShowEscalatedBanner] = useState(false);

  if (!complaint) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        author: 'Shivanesh R (You)',
        text: commentText.trim(),
        time: 'Just now',
      },
    ]);
    setCommentText('');
  };

  const statusSteps: ComplaintStatus[] = ['Open', 'Under Review', 'In Progress', 'Resolved'];
  const currentIndex = statusSteps.indexOf(complaint.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <span className="text-xs font-bold text-blue-600 tracking-wider font-mono">
              {complaint.id}
            </span>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Registered on {complaint.date}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-800">
          {/* Title & Status */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {complaint.title}
              </h2>

              {/* Status Badge */}
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap flex items-center gap-1.5 ${
                  complaint.status === 'In Progress'
                    ? 'bg-amber-100 text-amber-700'
                    : complaint.status === 'Under Review'
                    ? 'bg-blue-100 text-blue-700'
                    : complaint.status === 'Resolved'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {complaint.status === 'Resolved' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      complaint.status === 'In Progress'
                        ? 'bg-amber-500'
                        : complaint.status === 'Under Review'
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                    }`}
                  />
                )}
                {complaint.status}
              </span>
            </div>

            {/* Location & Category Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {complaint.location}
              </span>
              <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-600">
                {complaint.category} · {complaint.subCategory}
              </span>
              <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                Priority: {complaint.priority}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Issue Description
            </h4>
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              {complaint.description}
            </p>
          </div>

          {/* Live Progress Tracker */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3.5 flex items-center justify-between">
              <span>Live Progress Tracking</span>
              <span className="text-[11px] font-normal text-slate-500">Step {currentIndex + 1} of 4</span>
            </h4>

            {/* Stepper bar */}
            <div className="relative flex justify-between items-center px-1 mb-2">
              <div className="absolute left-4 right-4 top-3.5 h-0.5 bg-slate-200 -z-0" />
              <div
                className="absolute left-4 top-3.5 h-0.5 bg-blue-600 transition-all duration-500 -z-0"
                style={{
                  width: `${(Math.max(0, currentIndex) / 3) * 90}%`,
                }}
              />

              {statusSteps.map((step, idx) => {
                const isPassed = idx <= currentIndex;
                const isCurrent = idx === currentIndex;
                return (
                  <div key={step} className="flex flex-col items-center z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : isPassed
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <span
                      className={`text-[10px] mt-1 font-medium text-center ${
                        isCurrent ? 'text-blue-600 font-bold' : isPassed ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick change status simulation for demo testing */}
            {onUpdateStatus && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Test Status Transition:</span>
                <div className="flex gap-1">
                  {statusSteps.map((s) => (
                    <button
                      key={s}
                      onClick={() => onUpdateStatus(complaint.id, s)}
                      className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                        complaint.status === s
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Assigned Officer / Department */}
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-blue-900/70 font-semibold">Assigned Authority</div>
                <div className="text-sm font-bold text-blue-950">
                  {complaint.assignedTo || 'Campus Redressal Committee'}
                </div>
              </div>
            </div>

            <a
              href="tel:+914312690500"
              className="p-2 bg-white text-blue-600 hover:bg-blue-100 rounded-full shadow-xs border border-blue-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Call Helpline"
              aria-label="Call support"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* If Resolved: Feedback rating */}
          {complaint.status === 'Resolved' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Issue Resolved - How was your experience?
              </h4>
              <p className="text-xs text-emerald-700 mb-2.5">
                Please rate the speed and effectiveness of resolution:
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-emerald-600 hover:scale-110 transition-transform"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= userRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Activity / Remarks Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
              Activity History
            </h4>
            <div className="space-y-3">
              {complaint.timeline.map((item, idx) => (
                <div key={item.id || idx} className="flex gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1" />
                    {idx !== complaint.timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                    )}
                  </div>
                  <div className="pb-1.5">
                    <div className="font-semibold text-slate-800">{item.title}</div>
                    <div className="text-[11px] text-slate-400">{item.timestamp}</div>
                    <div className="text-slate-600 mt-0.5">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion / Comments thread */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Messages & Updates
            </h4>
            <div className="space-y-2 mb-3">
              {comments.map((comm) => (
                <div key={comm.id} className="p-2.5 rounded-lg bg-slate-100/80 text-xs">
                  <div className="flex justify-between font-semibold text-slate-800 mb-0.5">
                    <span>{comm.author}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{comm.time}</span>
                  </div>
                  <p className="text-slate-600">{comm.text}</p>
                </div>
              ))}
            </div>

            {/* Comment input form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ask a question or add details..."
                className="flex-1 text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 flex items-center gap-1 min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>

          {/* Escalation banner */}
          {showEscalatedBanner ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Grievance has been escalated to Dean of Student Welfare. Escalation Ticket: #ESC-9021.</span>
            </div>
          ) : (
            complaint.status !== 'Resolved' && (
              <button
                onClick={() => setShowEscalatedBanner(true)}
                className="w-full py-2.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl font-medium transition-colors border border-dashed border-rose-200"
              >
                ⚠️ Escalate Ticket to Dean if Unresolved &gt; 48 hrs
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
