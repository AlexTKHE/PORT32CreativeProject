import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  CreditCard, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Banknote,
  Upload,
  MessageSquare,
  Edit,
  Trash,
  Eye,
  Download,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReminderDemoSection } from "./ReminderDemoSection";

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'text-green-600 bg-green-100';
    case 'Inactive': return 'text-red-600 bg-red-100';
    case 'Pending': return 'text-yellow-600 bg-yellow-100';
    case 'Paid': return 'text-green-600 bg-green-100';
    case 'Overdue': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getDuesStatusColor = (outstandingDues: number) => {
  if (outstandingDues === 0) return 'bg-green-100 text-green-800';
  if (outstandingDues > 300) return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
};

const getTimingStatusColor = (timing: string) => {
  switch (timing) {
    case 'early': return 'text-green-600 bg-green-100';
    case 'on_time': return 'text-blue-600 bg-blue-100';
    case 'late': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  class: string;
  status: string;
  outstandingDues: number;
  paidDues: number;
  paymentHistory: Array<{
    date: string;
    amount: number;
    method: string;
    status: string;
    timingStatus: string;
    transactionId: string;
    recordedByName: string;
    paymentDescription: string;
  }>;
}

interface Invoice {
  id: number;
  memberName: string;
  amount: number;
  dueDate: string;
  status: string;
  invoiceNumber: string;
}

interface Payment {
  id: number;
  memberName: string;
  amount: number;
  date: string;
  method: string;
  status: string;
  timingStatus: string;
}

export const DueslyDemoShowcase = () => {
  const [activeSection, setActiveSection] = useState('reminder');
  const [toasts, setToasts] = useState<Array<{id: number; message: string; type: string; visible: boolean}>>([]);

  // Mobile stepper state
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  // Swipe gesture state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Swipe gesture handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextFeature();
    }
    if (isRightSwipe) {
      prevFeature();
    }
  };

  // Simple toast system
  const showToast = (message: string, type: string = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, visible: true }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.map(toast => 
        toast.id === id ? { ...toast, visible: false } : toast
      ));
    }, 3000);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter(toast => toast.id !== id));
    }, 3300);
  };

  const handleFeatureNotAvailable = (featureName: string) => {
    showToast(`${featureName} feature is not available in this demo version.`, 'error');
  };

  // Mobile stepper navigation functions
  const nextFeature = () => {
    setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    setActiveSection(features[(currentFeatureIndex + 1) % features.length].id);
  };

  const prevFeature = () => {
    setCurrentFeatureIndex((prev) => (prev - 1 + features.length) % features.length);
    setActiveSection(features[(currentFeatureIndex - 1 + features.length) % features.length].id);
  };

  const goToFeature = (index: number) => {
    setCurrentFeatureIndex(index);
    setActiveSection(features[index].id);
  };

  const [demoData, setDemoData] = useState({
    members: [
      { 
        id: 1, 
        name: 'Alex Johnson', 
        email: 'alex.j@university.edu', 
        phone: '(555) 123-4567', 
        class: 'Spring 2024', 
        status: 'Active', 
        outstandingDues: 0, 
        paidDues: 600,
        paymentHistory: [
          {
            date: '2024-01-10T10:30:00Z',
            amount: 600,
            method: 'Stripe',
            status: 'completed',
            timingStatus: 'early',
            transactionId: 'txn_123456789',
            recordedByName: 'System (Stripe)',
            paymentDescription: 'Payment with early timing'
          }
        ]
      },
      { 
        id: 2, 
        name: 'Sarah Chen', 
        email: 'sarah.c@university.edu', 
        phone: '(555) 234-5678', 
        class: 'Spring 2024', 
        status: 'Active', 
        outstandingDues: 150, 
        paidDues: 450,
        paymentHistory: [
          {
            date: '2024-02-01T14:20:00Z',
            amount: 450,
            method: 'Stripe',
            status: 'completed',
            timingStatus: 'on_time',
            transactionId: 'txn_987654321',
            recordedByName: 'System (Stripe)',
            paymentDescription: 'Payment with on-time timing'
          },
          {
            date: '2024-01-15T09:15:00Z',
            amount: 100,
            method: 'Manual',
            status: 'completed',
            timingStatus: 'early',
            transactionId: 'manual-123456',
            recordedByName: 'John Treasurer',
            paymentDescription: 'Partial payment'
          }
        ]
      },
      { 
        id: 3, 
        name: 'Mike Rodriguez', 
        email: 'mike.r@university.edu', 
        phone: '(555) 345-6789', 
        class: 'Fall 2023', 
        status: 'Active', 
        outstandingDues: 300, 
        paidDues: 300,
        paymentHistory: [
          {
            date: '2024-02-15T16:45:00Z',
            amount: 300,
            method: 'Manual',
            status: 'completed',
            timingStatus: 'late',
            transactionId: 'manual-789012',
            recordedByName: 'John Treasurer',
            paymentDescription: 'Payment with late timing'
          }
        ]
      },
      { 
        id: 4, 
        name: 'Emily Davis', 
        email: 'emily.d@university.edu', 
        phone: '(555) 456-7890', 
        class: 'Spring 2024', 
        status: 'Inactive', 
        outstandingDues: 600, 
        paidDues: 0,
        paymentHistory: []
      }
    ] as Member[],
    invoices: [
      { id: 1, memberName: 'Sarah Chen', amount: 150, dueDate: '2024-03-15', status: 'Pending', invoiceNumber: 'INV-1A2B3C4D' },
      { id: 2, memberName: 'Mike Rodriguez', amount: 300, dueDate: '2024-03-01', status: 'Overdue', invoiceNumber: 'INV-2B3C4D5E' },
      { id: 3, memberName: 'Emily Davis', amount: 600, dueDate: '2024-02-15', status: 'Overdue', invoiceNumber: 'INV-3C4D5E6F' },
      { id: 4, memberName: 'Alex Johnson', amount: 600, dueDate: '2024-01-15', status: 'Paid', invoiceNumber: 'INV-4D5E6F7G' }
    ] as Invoice[],
    payments: [
      { id: 1, memberName: 'Alex Johnson', amount: 600, date: '2024-01-10', method: 'Stripe', status: 'completed', timingStatus: 'early' },
      { id: 2, memberName: 'Sarah Chen', amount: 450, date: '2024-02-01', method: 'Stripe', status: 'completed', timingStatus: 'on_time' },
      { id: 3, memberName: 'Mike Rodriguez', amount: 300, date: '2024-02-15', method: 'Manual', status: 'completed', timingStatus: 'late' }
    ] as Payment[]
  });

  const features = [
    {
      id: 'reminder',
      title: 'Send Reminder',
      description: 'Simulate sending SMS and email reminders to members',
      icon: MessageSquare,
      color: 'sky',
      stats: {}
    },
    {
      id: 'members',
      title: 'Member Management',
      description: 'Comprehensive member tracking with dues management',
      icon: Users,
      color: 'blue',
      stats: {
        total: demoData.members.length,
        active: demoData.members.filter(m => m.status === 'Active').length,
        outstanding: demoData.members.reduce((sum, m) => sum + m.outstandingDues, 0)
      }
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      description: 'Real-time insights and collection analytics',
      icon: BarChart3,
      color: 'orange',
      stats: {
        collectionRate: '75%',
        avgPaymentTime: '2.3 days',
        totalRevenue: '$1,350'
      }
    },
    {
      id: 'invoices',
      title: 'Invoice Tracking',
      description: 'Professional invoice generation and payment tracking',
      icon: FileText,
      color: 'green',
      stats: {
        total: demoData.invoices.length,
        pending: demoData.invoices.filter(i => i.status === 'Pending').length,
        overdue: demoData.invoices.filter(i => i.status === 'Overdue').length
      }
    },
    {
      id: 'payments',
      title: 'Payment Processing',
      description: 'Secure Stripe integration with automated receipts',
      icon: CreditCard,
      color: 'purple',
      stats: {
        total: demoData.payments.length,
        collected: demoData.payments.reduce((sum, p) => sum + p.amount, 0),
        successRate: '98.5%'
      }
    }
  ];

  // Tooltip state for info icon
  const [showTooltip, setShowTooltip] = useState(false);
  const handleTooltipToggle = () => setShowTooltip((v) => !v);
  const handleTooltipBlur = () => setShowTooltip(false);

  const [showDemoNotice, setShowDemoNotice] = useState(true);

  return (
    <div className="w-full">
      {/* Demo Notice */}
      {showDemoNotice && (
        <div className="bg-yellow-50 border-b border-yellow-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Demo Version - Best user expierence will be on desktop. This is a demonstration of Duesly's interface. Not all features, validations, or security measures are present.
                </span>
              </div>
            </div>
            <button
              className="block md:hidden mx-auto mt-2 text-yellow-700 hover:text-yellow-900 p-1 rounded focus:outline-none"
              onClick={() => setShowDemoNotice(false)}
              aria-label="Dismiss demo notice"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              className="hidden md:block absolute right-2 top-2 text-yellow-700 hover:text-yellow-900 p-1 rounded focus:outline-none"
              onClick={() => setShowDemoNotice(false)}
              aria-label="Dismiss demo notice"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile-specific spacing to separate from hero section */}
      <div className="h-6 md:h-0 bg-white"></div>

      {/* Header - now mobile-stacked, visually distinct, and semi-sticky */}
      <div className="sticky top-0 z-30 bg-white shadow-md border-b animate-fade-in transition-all duration-300" style={{ WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)' }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
          <div className="flex items-center justify-center md:justify-start space-x-2 md:space-x-3 w-full md:w-auto">
            <span
              className="w-10 h-10 bg-duesly-500 rounded-full flex items-center justify-center transition-shadow duration-300 group hover:shadow-duesly-glow"
              style={{ boxShadow: '0 0 0 0 #3B82F6' }}
            >
              <Rocket className="w-6 h-6 text-white animate-pulse-slow group-hover:shadow-lg" />
            </span>
            <span className="text-base md:text-lg font-semibold text-gray-900">
              You're viewing the <span className="text-duesly-500 font-bold">Demo Dashboard</span>
            </span>
            <button
              className="relative ml-1 focus:outline-none"
              onClick={handleTooltipToggle}
              onBlur={handleTooltipBlur}
              tabIndex={0}
              aria-label="Demo info"
              type="button"
            >
              <Info className="w-4 h-4 text-duesly-500 hover:text-duesly-700" />
              {showTooltip && (
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-50 whitespace-nowrap">
                  This is a demo version. Some features are for preview only.
                </div>
              )}
            </button>
          </div>
          <div className="text-xs text-gray-500 font-medium mt-2 md:mt-0 text-center md:text-right w-full md:w-auto flex items-center justify-center md:justify-end">
            Click on each tab below to explore how Duesly works in action.
          </div>
        </div>
        {/* Divider/Background shift for visual flow */}
        <div className="w-full h-2 bg-gradient-to-b from-white to-blue-50" />
      </div>

      {/* Feature Navigation */}
      <div className="bg-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 md:py-6">
          {/* Desktop Layout - Grid */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => goToFeature(index)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  activeSection === feature.id
                    ? 'border-duesly-500 bg-duesly-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeSection === feature.id ? 'bg-duesly-500' : 'bg-gray-100'
                  }`}>
                    <feature.icon className={`w-5 h-5 ${
                      activeSection === feature.id ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold text-sm ${
                      activeSection === feature.id ? 'text-duesly-900' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Layout - Stepper Style */}
          <div 
            className="lg:hidden swipe-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevFeature}
                className="stepper-button w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-200 active:scale-95"
                aria-label="Previous feature"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToFeature(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 !min-h-0 !min-w-0 ${
                      index === currentFeatureIndex 
                        ? 'bg-duesly-500 w-6' 
                        : 'bg-gray-300 w-1.5'
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextFeature}
                className="stepper-button w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-200 active:scale-95"
                aria-label="Next feature"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Current Feature Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeatureIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-xl border-2 border-duesly-500 p-4 shadow-md swipe-feedback"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-duesly-500 rounded-lg flex items-center justify-center">
                    {(() => {
                      const FeatureIcon = features[currentFeatureIndex].icon;
                      return <FeatureIcon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-duesly-900">
                      {features[currentFeatureIndex].title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {features[currentFeatureIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Feature Counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                {currentFeatureIndex + 1} of {features.length}
              </span>
              <div className="text-xs text-blue-500 mt-1 animate-fade-in">
                Swipe to interact or tap a tab to preview
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'members' && (
          <MembersSection 
            data={demoData.members} 
            onFeatureNotAvailable={handleFeatureNotAvailable}
            onDataChange={(newMembers) => {
              setDemoData(prev => ({ ...prev, members: newMembers }));
              showToast('Member data updated successfully', 'success');
            }}
            showToast={showToast}
          />
        )}
        {activeSection === 'reminder' && (
          <ReminderDemoSection />
        )}
        {activeSection === 'invoices' && (
          <InvoicesSection data={demoData.invoices} onFeatureNotAvailable={handleFeatureNotAvailable} />
        )}
        {activeSection === 'payments' && (
          <PaymentsSection data={demoData.payments} onFeatureNotAvailable={handleFeatureNotAvailable} />
        )}
        {activeSection === 'analytics' && (
          <AnalyticsSection data={demoData} />
        )}
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
              toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            } ${toast.visible ? 'opacity-100' : 'opacity-0'}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

// Member Management Section
const MembersSection = ({ 
  data, 
  onFeatureNotAvailable, 
  onDataChange, 
  showToast 
}: { 
  data: Member[], 
  onFeatureNotAvailable: (feature: string) => void,
  onDataChange: (newMembers: Member[]) => void,
  showToast: (message: string, type: string) => void
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    class: 'Spring 2024',
    status: 'Active',
    outstandingDues: 0,
    paidDues: 0
  });
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleAddMember = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newMember: Member = {
      id: Math.max(...data.map(m => m.id)) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      class: formData.class,
      status: formData.status,
      outstandingDues: formData.outstandingDues,
      paidDues: formData.paidDues,
      paymentHistory: []
    };

    onDataChange([...data, newMember]);
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      class: 'Spring 2024',
      status: 'Active',
      outstandingDues: 0,
      paidDues: 0
    });
    showToast('Member added successfully', 'success');
  };

  const handleEditMember = () => {
    if (!selectedMember || !formData.name || !formData.email || !formData.phone) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const updatedMembers = data.map(member => 
      member.id === selectedMember.id 
        ? { ...member, ...formData }
        : member
    );

    onDataChange(updatedMembers);
    setShowEditModal(false);
    setSelectedMember(null);
    showToast('Member updated successfully', 'success');
  };

  const handleDeleteMember = () => {
    if (!selectedMember) return;

    const updatedMembers = data.filter(member => member.id !== selectedMember.id);
    onDataChange(updatedMembers);
    setShowDeleteModal(false);
    setSelectedMember(null);
    showToast('Member deleted successfully', 'success');
  };

  const openEditModal = (member: Member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      class: member.class,
      status: member.status,
      outstandingDues: member.outstandingDues,
      paidDues: member.paidDues
    });
    setShowEditModal(true);
  };

  const openViewModal = (member: Member) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  const openDeleteModal = (member: Member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const handleImportMembers = () => {
    onFeatureNotAvailable('Import Members');
  };

  const closeImportModal = () => {
    setShowImportModal(false);
    setImportData('');
    setIsImporting(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section - Centered on mobile, horizontal on desktop */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">Member Management</h2>
        <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-end">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Import Members</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-duesly-500 hover:bg-duesly-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dues Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {member.outstandingDues === 0 ? (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      ) : (
                        <>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            member.outstandingDues > 300 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            ${member.outstandingDues.toFixed(2)} owed
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Paid: ${member.paidDues.toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openViewModal(member)}
                        className="text-duesly-600 hover:text-duesly-900 p-1 rounded hover:bg-gray-100"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(member)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100"
                        title="Edit Member"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onFeatureNotAvailable('Message Member')}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-gray-100"
                        title="Message Member"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(member)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-gray-100"
                        title="Delete Member"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                      {member.outstandingDues > 0 && (
                        <button
                          onClick={() => onFeatureNotAvailable('Record Payment')}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-gray-100"
                          title="Record Payment"
                        >
                          <Banknote className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                  placeholder="email@university.edu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                >
                  <option>Spring 2024</option>
                  <option>Fall 2023</option>
                  <option>Spring 2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Dues</label>
                  <input
                    type="number"
                    value={formData.outstandingDues}
                    onChange={(e) => setFormData({...formData, outstandingDues: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paid Dues</label>
                  <input
                    type="number"
                    value={formData.paidDues}
                    onChange={(e) => setFormData({...formData, paidDues: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-duesly-500 text-white rounded-lg hover:bg-duesly-600"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Member</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                >
                  <option>Spring 2024</option>
                  <option>Fall 2023</option>
                  <option>Spring 2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Dues</label>
                  <input
                    type="number"
                    value={formData.outstandingDues}
                    onChange={(e) => setFormData({...formData, outstandingDues: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paid Dues</label>
                  <input
                    type="number"
                    value={formData.paidDues}
                    onChange={(e) => setFormData({...formData, paidDues: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleEditMember}
                className="px-4 py-2 bg-duesly-500 text-white rounded-lg hover:bg-duesly-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Member Modal */}
      {showViewModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Member Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="text-sm text-gray-900">{selectedMember.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm text-gray-900">{selectedMember.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm text-gray-900">{selectedMember.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Class</label>
                    <p className="text-sm text-gray-900">{selectedMember.class}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMember.status)}`}>
                      {selectedMember.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Financial Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Outstanding Dues</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDuesStatusColor(selectedMember.outstandingDues)}`}>
                      ${selectedMember.outstandingDues}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Paid Dues</label>
                    <p className="text-sm text-gray-900">${selectedMember.paidDues}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Total Dues</label>
                    <p className="text-sm text-gray-900">${selectedMember.outstandingDues + selectedMember.paidDues}</p>
                  </div>
                </div>
              </div>
            </div>
            {selectedMember.paymentHistory.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Payment History</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {selectedMember.paymentHistory.map((payment, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium">${payment.amount}</span>
                          <span className="text-gray-500 ml-2">via {payment.method}</span>
                        </div>
                        <div className="text-gray-500">
                          {new Date(payment.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Delete Member</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedMember.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMember}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Members Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Import Members</h3>
              <button onClick={closeImportModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">How to Import Members</h4>
                <p className="text-sm text-blue-800 mb-3">
                  You can import member data from Excel or Google Sheets by exporting as CSV format. 
                  The sheet should have columns for: <strong>Name, Email, Phone, Class, Status</strong>
                </p>
                <div className="text-xs text-blue-700">
                  <strong>Note:</strong> This feature is not available in demo mode. In the full version, you can upload CSV files directly.
                </div>
              </div>

              {/* Sheet-like Interface */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
                  <h5 className="font-medium text-gray-700">Member Import Sheet</h5>
                </div>
                
                {/* Column Headers */}
                <div className="grid grid-cols-5 gap-1 bg-gray-200 border-b border-gray-300 px-4 py-2">
                  <div className="font-medium text-sm text-gray-700">Name *</div>
                  <div className="font-medium text-sm text-gray-700">Email *</div>
                  <div className="font-medium text-sm text-gray-700">Phone *</div>
                  <div className="font-medium text-sm text-gray-700">Class</div>
                  <div className="font-medium text-sm text-gray-700">Status</div>
                </div>

                {/* Sample Rows */}
                <div className="space-y-1 p-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-5 gap-1">
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="tel" 
                      placeholder="(555) 123-4567" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="text" 
                      placeholder="Spring 2024" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded bg-white" disabled>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-5 gap-1">
                    <input 
                      type="text" 
                      placeholder="Jane Smith" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="email" 
                      placeholder="jane@example.com" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="tel" 
                      placeholder="(555) 234-5678" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="text" 
                      placeholder="Spring 2024" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded bg-white" disabled>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-5 gap-1">
                    <input 
                      type="text" 
                      placeholder="Mike Johnson" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="email" 
                      placeholder="mike@example.com" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="tel" 
                      placeholder="(555) 345-6789" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <input 
                      type="text" 
                      placeholder="Spring 2024" 
                      className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      disabled
                    />
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded bg-white" disabled>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  {/* Add More Rows Button */}
                  <div className="pt-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      disabled
                    >
                      + Add more rows
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={closeImportModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportMembers}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Import Members
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Invoice Tracking Section
const InvoicesSection = ({ 
  data, 
  onFeatureNotAvailable 
}: { 
  data: Invoice[], 
  onFeatureNotAvailable: (feature: string) => void 
}) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const openViewModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Section - Centered on mobile, horizontal on desktop */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">Invoice Tracking</h2>
        <div className="flex justify-center md:justify-end">
        <button
          onClick={() => onFeatureNotAvailable('Create Invoice')}
          className="bg-duesly-500 hover:bg-duesly-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <FileText className="w-4 h-4" />
          <span>Create Invoice</span>
        </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.memberName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openViewModal(invoice)}
                        className="text-duesly-600 hover:text-duesly-900 p-1 rounded hover:bg-gray-100"
                        title="View Invoice"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onFeatureNotAvailable('Download Invoice')}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onFeatureNotAvailable('Pay Invoice')}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-gray-100"
                        title="Pay Invoice"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Invoice Modal */}
      {showViewModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Invoice Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Invoice Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Invoice Number</label>
                    <p className="text-sm text-gray-900">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Member</label>
                    <p className="text-sm text-gray-900">{selectedInvoice.memberName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Amount</label>
                    <p className="text-sm text-gray-900">${selectedInvoice.amount}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Due Date</label>
                    <p className="text-sm text-gray-900">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedInvoice.status)}`}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Days Remaining</label>
                    <p className="text-sm text-gray-900">
                      {Math.ceil((new Date(selectedInvoice.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => onFeatureNotAvailable('Download Invoice')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => onFeatureNotAvailable('Pay Invoice')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Now</span>
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Payment Processing Section
const PaymentsSection = ({ 
  data, 
  onFeatureNotAvailable 
}: { 
  data: Payment[], 
  onFeatureNotAvailable: (feature: string) => void 
}) => {
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState({
    memberName: '',
    amount: 0,
    method: 'Stripe',
    timingStatus: 'on_time'
  });

  const handleRecordPayment = () => {
    if (!formData.memberName || !formData.amount) {
      return;
    }

    const newPayment: Payment = {
      id: Math.max(...data.map(p => p.id)) + 1,
      memberName: formData.memberName,
      amount: formData.amount,
      date: new Date().toISOString().split('T')[0],
      method: formData.method,
      status: 'completed',
      timingStatus: formData.timingStatus
    };

    // In a real app, this would update the global state
    // For demo purposes, we'll just show a success message
    setShowRecordModal(false);
    setFormData({
      memberName: '',
      amount: 0,
      method: 'Stripe',
      timingStatus: 'on_time'
    });
    onFeatureNotAvailable('Payment recorded successfully (demo mode)');
  };

  const openViewModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Section - Centered on mobile, horizontal on desktop */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">Payment Processing</h2>
        <div className="flex justify-center md:justify-end">
        <button
          onClick={() => setShowRecordModal(true)}
          className="bg-duesly-500 hover:bg-duesly-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>Record Payment</span>
        </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.memberName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTimingStatusColor(payment.timingStatus)}`}>
                      {payment.timingStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openViewModal(payment)}
                        className="text-duesly-600 hover:text-duesly-900 p-1 rounded hover:bg-gray-100"
                        title="View Payment"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onFeatureNotAvailable('Download Receipt')}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100"
                        title="Download Receipt"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onFeatureNotAvailable('Send Receipt')}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-gray-100"
                        title="Send Receipt"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Record Payment</h3>
              <button onClick={() => setShowRecordModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Name *</label>
                <input
                  type="text"
                  value={formData.memberName}
                  onChange={(e) => setFormData({...formData, memberName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                  placeholder="Member Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData({...formData, method: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                >
                  <option>Stripe</option>
                  <option>Manual</option>
                  <option>Check</option>
                  <option>Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Timing</label>
                <select
                  value={formData.timingStatus}
                  onChange={(e) => setFormData({...formData, timingStatus: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                >
                  <option value="early">Early</option>
                  <option value="on_time">On Time</option>
                  <option value="late">Late</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowRecordModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleRecordPayment}
                className="px-4 py-2 bg-duesly-500 text-white rounded-lg hover:bg-duesly-600"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Payment Modal */}
      {showViewModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Payment Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Member</label>
                    <p className="text-sm text-gray-900">{selectedPayment.memberName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Amount</label>
                    <p className="text-sm text-gray-900">${selectedPayment.amount}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Date</label>
                    <p className="text-sm text-gray-900">{new Date(selectedPayment.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Method</label>
                    <p className="text-sm text-gray-900">{selectedPayment.method}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {selectedPayment.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Timing</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTimingStatusColor(selectedPayment.timingStatus)}`}>
                      {selectedPayment.timingStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => onFeatureNotAvailable('Download Receipt')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Receipt</span>
              </button>
              <button
                onClick={() => onFeatureNotAvailable('Send Receipt')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Receipt</span>
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Analytics Section
const AnalyticsSection = ({ data }: { data: { members: Member[]; payments: Payment[] } }) => {
  const totalMembers = data.members.length;
  const activeMembers = data.members.filter((m: Member) => m.status === 'Active').length;
  const totalOutstanding = data.members.reduce((sum: number, m: Member) => sum + m.outstandingDues, 0);
  const totalCollected = data.payments.reduce((sum: number, p: Payment) => sum + p.amount, 0);
  const collectionRate = totalCollected / (totalCollected + totalOutstanding) * 100;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">{activeMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">${totalOutstanding}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Collection Rate</p>
              <p className="text-2xl font-bold text-gray-900">{collectionRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data.payments.slice(0, 5).map((payment: Payment, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {payment.memberName} paid ${payment.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(payment.date).toLocaleDateString()} via {payment.method}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 