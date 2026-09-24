export type ComplaintStatus = 'Open' | 'Under Review' | 'In Progress' | 'Resolved';

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Emergency';

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  actor?: string;
}

export interface Complaint {
  id: string; // e.g. "CMP-2026-1045"
  title: string; // e.g. "Wi-Fi not working in library"
  category: string; // e.g. "IT / Technical"
  subCategory: string; // e.g. "Network Connectivity"
  date: string; // e.g. "08 Sep 2026"
  createdAt: string; // ISO date or time
  location: string; // e.g. "Main Library"
  status: ComplaintStatus;
  description: string;
  priority: PriorityLevel;
  assignedTo?: string;
  contactPreference?: string;
  isAnonymous?: boolean;
  timeline: TimelineEvent[];
  attachmentUrl?: string;
  departmentFeedback?: string;
  rating?: number;
}

export interface NotificationItem {
  id: string;
  type: 'update' | 'resolved' | 'message' | 'announcement';
  title: string; // "Complaint Updated", "Complaint Resolved", "New Message"
  message: string;
  time: string; // "10:30 AM"
  dateGroup: 'Today' | 'Yesterday' | 'Earlier';
  complaintId?: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  rollNumber: string;
  department: string;
  email: string;
  phone: string;
  semester: string;
  avatarUrl?: string;
}

export interface ComplaintCategory {
  id: string;
  name: string;
  iconName: string;
  color: string;
  bgColor: string;
  subcategories: string[];
}
