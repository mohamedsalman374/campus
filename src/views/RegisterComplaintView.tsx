import React, { useState } from 'react';
import { Complaint, PriorityLevel } from '../types';
import { Header } from '../components/Header';
import {
  Mic,
  MicOff,
  Crosshair,
  MapPin,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
  Image as ImageIcon,
  ShieldAlert,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

interface RegisterComplaintViewProps {
  onBack: () => void;
  onSubmitSuccess: (newComplaint: Complaint) => void;
  initialCategory?: string;
}

const CATEGORY_OPTIONS: Record<string, string[]> = {
  'Infrastructure & Facilities': [
    'Classroom Maintenance',
    'Fan & Light Fixtures',
    'Desk & Chair Repair',
    'Drinking Water & Washrooms',
    'Lift & Elevator',
  ],
  'IT / Technical': [
    'Wi-Fi & Network Connectivity',
    'Lab Computer Hardware',
    'Projector & Audio System',
    'College Portal / LMS Login',
    'Software License',
  ],
  'Academic': [
    'Faculty / Lecture Grievance',
    'Exam Timetable / Hall Ticket',
    'Grade Re-evaluation / Transcript',
    'Library Digital Resources',
    'Lab Practical Schedule',
  ],
  'Administrative': [
    'Fee Receipt / Scholarship',
    'ID Card Replacement',
    'Bonafide Certificate',
    'Hostel Allotment',
    'TC / Migration Certificate',
  ],
  'Safety & Security': [
    'Campus Safety & Vigilance',
    'Harassment / Ragging Redressal',
    'Parking & Gate Security',
    'Emergency Medical Assistance',
    'Lost & Found Items',
  ],
  'Food & Cafeteria': [
    'Mess Food Quality',
    'Cafeteria Hygiene & Cleanliness',
    'Drinking Water in Canteen',
    'Overpricing / Billing Issue',
    'Timings & Menu Adherence',
  ],
  'Transportation': [
    'College Bus Route Delay',
    'Driver / Conductor Conduct',
    'Bus Pass Verification',
    'Vehicle Maintenance',
    'New Route Request',
  ],
};

export const RegisterComplaintView: React.FC<RegisterComplaintViewProps> = ({
  onBack,
  onSubmitSuccess,
  initialCategory,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 Form state (pre-filled with values from screenshot 4 for authentic instant experience)
  const defaultCategory =
    initialCategory && CATEGORY_OPTIONS[initialCategory]
      ? initialCategory
      : 'Infrastructure & Facilities';

  const [category, setCategory] = useState<string>(defaultCategory);
  const [subCategory, setSubCategory] = useState<string>(
    CATEGORY_OPTIONS[defaultCategory]?.[0] || 'Classroom Maintenance'
  );
  const [title, setTitle] = useState<string>('Broken classroom fan');
  const [description, setDescription] = useState<string>(
    'The fan in Room 204, Block A is not working. It has not been working for the past 3 days. Kindly look into this issue.'
  );
  const [location, setLocation] = useState<string>('Block A - Room 204');

  // Step 2 Form state (Additional details)
  const [priority, setPriority] = useState<PriorityLevel>('Medium');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [contactPref, setContactPref] = useState<string>('College Email');

  // Voice recording state
  const [isListening, setIsListening] = useState(false);
  const [voiceHint, setVoiceHint] = useState<string | null>(null);

  // Success screen state
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);

  // Handle category change to update subcategories
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCategory(selected);
    const subs = CATEGORY_OPTIONS[selected] || [];
    setSubCategory(subs[0] || '');
  };

  // Simulated & Real Speech recognition for the microphone button
  const toggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      setVoiceHint(null);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);
        setVoiceHint('Listening... Speak your complaint clearly.');

        recognition.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          setDescription((prev) => (prev ? `${prev} ${spokenText}` : spokenText));
          setIsListening(false);
          setVoiceHint('Voice converted to text successfully!');
          setTimeout(() => setVoiceHint(null), 2500);
        };

        recognition.onerror = () => {
          setIsListening(false);
          // Fallback simulation
          setDescription((prev) => `${prev} Note: Ceiling fan capacitor humming without spinning.`);
          setVoiceHint('Added voice note.');
          setTimeout(() => setVoiceHint(null), 2000);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('Speech recognition not available', err);
      }
    }

    // Fallback simulation if web speech isn't allowed
    setIsListening(true);
    setVoiceHint('Simulating voice input...');
    setTimeout(() => {
      setDescription(
        (prev) =>
          `${prev} Additionally, it makes a buzzing noise when switched on.`
      );
      setIsListening(false);
      setVoiceHint('Voice note transcribed!');
      setTimeout(() => setVoiceHint(null), 2000);
    }, 1200);
  };

  // Location pin GPS autofill simulation
  const handleGetLocation = () => {
    const campusLocations = [
      'Block A - Room 204',
      'Block B - Seminar Hall 1',
      'Central Library - 2nd Floor',
      'Hostel 2 - Wing B',
      'Sports Ground Pavilion',
      'Main Cafeteria Counter 3',
    ];
    const picked = campusLocations[Math.floor(Math.random() * campusLocations.length)];
    setLocation(picked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomNum = Math.floor(1050 + Math.random() * 40);
    const newId = `CMP-2026-${randomNum}`;

    const newComplaint: Complaint = {
      id: newId,
      title: title.trim() || 'Classroom Grievance',
      category: category,
      subCategory: subCategory,
      date: '24 Sep 2026',
      createdAt: new Date().toISOString(),
      location: location.trim() || 'Campus Area',
      status: 'Open',
      description: description.trim(),
      priority: priority,
      isAnonymous: isAnonymous,
      contactPreference: contactPref,
      assignedTo: `${category} Department Grievance Cell`,
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: 'Complaint Registered',
          timestamp: 'Just now',
          description: isAnonymous
            ? 'Registered as an Anonymous Grievance ticket.'
            : 'Ticket registered by Shivanesh R (22CS1007).',
          actor: 'Student',
        },
      ],
    };

    setCreatedComplaint(newComplaint);
    onSubmitSuccess(newComplaint);
  };

  // Render Success Screen after submitting
  if (createdComplaint) {
    return (
      <div className="flex-1 flex flex-col bg-white p-6 justify-center items-center text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-md">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Complaint Registered!
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Your grievance has been safely logged with the administration.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 w-full max-w-sm text-left">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Tracking Ticket ID
          </div>
          <div className="text-base font-bold text-blue-600 font-mono">
            {createdComplaint.id}
          </div>
          <div className="text-xs text-slate-700 font-medium mt-2">
            {createdComplaint.title}
          </div>
          <div className="text-xs text-slate-500">
            {createdComplaint.category} · {createdComplaint.location}
          </div>
        </div>

        <div className="w-full max-w-sm space-y-2.5">
          <button
            onClick={onBack}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors min-h-[44px]"
          >
            Go to My Complaints
          </button>
          <button
            onClick={() => {
              setCreatedComplaint(null);
              setStep(1);
            }}
            className="w-full py-2.5 border border-slate-300 text-slate-700 rounded-xl font-semibold text-xs hover:bg-slate-50 min-h-[44px]"
          >
            Register Another Grievance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white pb-10">
      {/* Top Header */}
      <Header title="Register a New Complaint" onBack={onBack} />

      {/* Stepper Progress Bar (Matches Screenshot 4: 1 Details - 2 Additional - 3 Review) */}
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between max-w-xs mx-auto relative">
          {/* Connector Line 1-2 */}
          <div
            className={`absolute left-[16%] right-[50%] top-3.5 h-0.5 ${
              step >= 2 ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          />
          {/* Connector Line 2-3 */}
          <div
            className={`absolute left-[50%] right-[16%] top-3.5 h-0.5 ${
              step >= 3 ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          />

          {/* Step 1: Details */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 1
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : step > 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border-2 border-slate-300 text-slate-500'
              }`}
            >
              1
            </div>
            <span
              className={`text-[11px] font-medium mt-1.5 ${
                step === 1 ? 'text-blue-600 font-semibold' : 'text-slate-500'
              }`}
            >
              Details
            </span>
          </div>

          {/* Step 2: Additional */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 2
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : step > 2
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              2
            </div>
            <span
              className={`text-[11px] font-medium mt-1.5 ${
                step === 2 ? 'text-blue-600 font-semibold' : 'text-slate-400'
              }`}
            >
              Additional
            </span>
          </div>

          {/* Step 3: Review */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 3
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              3
            </div>
            <span
              className={`text-[11px] font-medium mt-1.5 ${
                step === 3 ? 'text-blue-600 font-semibold' : 'text-slate-400'
              }`}
            >
              Review
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: Details Form */}
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className="p-5 space-y-4 max-w-md mx-auto w-full flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Complaint Category * */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Complaint Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  required
                  className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-9"
                >
                  {Object.keys(CATEGORY_OPTIONS).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Sub Category * */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Sub Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                  className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-9"
                >
                  {(CATEGORY_OPTIONS[category] || []).map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Complaint Title * */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Complaint Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary of the grievance"
                required
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Description * with floating voice mic button */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information regarding the issue..."
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl p-3.5 pb-12 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />

                {/* Floating Microphone Button inside bottom-right of textarea */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`absolute right-3 bottom-3 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-90 ${
                    isListening
                      ? 'bg-rose-600 animate-pulse ring-4 ring-rose-200'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  title={isListening ? 'Stop Recording' : 'Voice Input (Speech-to-Text)'}
                  aria-label="Voice input"
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
              </div>

              {voiceHint && (
                <div className="mt-1 text-[11px] text-blue-600 font-medium animate-pulse flex items-center gap-1">
                  <span>{voiceHint}</span>
                </div>
              )}
            </div>

            {/* Location * */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-blue-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Block A - Room 204"
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-11 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="absolute right-2 p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Detect Campus Location"
                  aria-label="Pinpoint location"
                >
                  <Crosshair className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>
            </div>
          </div>

          {/* Action to Step 2 */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all min-h-[48px]"
            >
              <span>Next: Additional Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Additional Details Form */}
      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(3);
          }}
          className="p-5 space-y-4 max-w-md mx-auto w-full flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Urgency / Priority Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Urgency Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Low', 'Medium', 'High', 'Emergency'] as PriorityLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPriority(lvl)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                      priority === lvl
                        ? lvl === 'Emergency'
                          ? 'bg-red-600 text-white border-red-600 shadow-sm'
                          : lvl === 'High'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {priority === 'Emergency'
                  ? 'Urgent safety / hazard alerts are routed directly to Security Chief.'
                  : 'Standard college SLA applies based on maintenance schedule.'}
              </p>
            </div>

            {/* Photo / Media Attachment */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Attach Supporting Photo (Optional)
              </label>
              <div
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                  hasPhoto
                    ? 'border-emerald-400 bg-emerald-50/50 text-emerald-800'
                    : 'border-slate-200 hover:border-blue-300 bg-slate-50/50 text-slate-500'
                }`}
              >
                {hasPhoto ? (
                  <div className="flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 text-emerald-600 mb-1" />
                    <span className="text-xs font-bold">Photo Attached: campus_fan_fault.jpg</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Tap to remove</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-7 h-7 text-slate-400 mb-1" />
                    <span className="text-xs font-medium">Click to upload photo evidence</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG up to 5MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-start gap-2.5 pr-2">
                <ShieldAlert className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Submit as Anonymous Complaint
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Your name and roll number will be hidden from staff and committee members.
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 shrink-0"
              />
            </div>

            {/* Contact Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Preferred Contact Channel
              </label>
              <select
                value={contactPref}
                onChange={(e) => setContactPref(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="College Email">College Email (shivanesh@college.edu.in)</option>
                <option value="In-App Push Notification">In-App Notification Only</option>
                <option value="Phone Call / SMS">Phone (+91 98765 43210)</option>
              </select>
            </div>
          </div>

          {/* Stepper navigation buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1 min-h-[48px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-blue-500/20 min-h-[48px]"
            >
              <span>Next: Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Review and Submit */}
      {step === 3 && (
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 max-w-md mx-auto w-full flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                <span className="text-xs font-bold text-blue-900">Grievance Summary</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-semibold">
                  Priority: {priority}
                </span>
              </div>

              <div>
                <div className="text-[11px] text-slate-500">Category & Subcategory</div>
                <div className="text-xs font-bold text-slate-900">
                  {category} · {subCategory}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500">Title</div>
                <div className="text-sm font-bold text-slate-900">{title}</div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500">Location</div>
                <div className="text-xs font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{location}</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-500">Description</div>
                <div className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-blue-100/80 mt-0.5 whitespace-pre-line leading-relaxed">
                  {description}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Identity Mode:</span>
                <span className="font-semibold text-slate-800">
                  {isAnonymous ? '🔒 Anonymous' : '👤 Student Identified'}
                </span>
              </div>
            </div>

            {/* Declaration Check */}
            <label className="flex items-start gap-2.5 p-2 cursor-pointer">
              <input
                type="checkbox"
                required
                defaultChecked
                className="w-4 h-4 rounded text-blue-600 mt-0.5"
              />
              <span className="text-[11px] text-slate-500 leading-snug">
                I declare that the information provided is genuine and adheres to the Campus Code of Conduct.
              </span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1 min-h-[48px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-blue-500/20 min-h-[48px]"
            >
              <FileCheck className="w-4 h-4" />
              <span>Submit Complaint</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
