import React, { useState } from 'react';
import { 
  UsersIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  CalendarIcon,
  BanknotesIcon,
  DocumentArrowUpIcon,
  ChatBubbleLeftRightIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case 'Active': return 'text-green-600 bg-green-100';
    case 'Inactive': return 'text-red-600 bg-red-100';
    case 'Pending': return 'text-yellow-600 bg-yellow-100';
    case 'Paid': return 'text-green-600 bg-green-100';
    case 'Overdue': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getDuesStatusColor = (outstandingDues) => {
  const amount = parseFloat(outstandingDues || 0);
  if (amount === 0) return 'bg-green-100 text-green-800';
  if (amount > 300) return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
};

const getTimingStatusColor = (timing) => {
  switch (timing) {
    case 'early': return 'text-green-600 bg-green-100';
    case 'on_time': return 'text-blue-600 bg-blue-100';
    case 'late': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const DueslyDemoShowcase = () => {
  const [activeSection, setActiveSection] = useState('members');
  const [toasts, setToasts] = useState([]);

  // Mobile stepper state
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  // Swipe gesture state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Swipe gesture handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
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
  const showToast = (message, type = 'error') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, visible: true }]);
    // Start fade out after 2.5s, remove after 3s
    setTimeout(() => {
      setToasts((prev) => prev.map(t => t.id === id ? { ...t, visible: false } : t));
    }, 2500);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Toast handlers for non-functional buttons
  const handleFeatureNotAvailable = (featureName) => {
    showToast(`${featureName} feature not available in demo`, 'error');
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

  const goToFeature = (index) => {
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
    ],
    invoices: [
      { id: 1, memberName: 'Sarah Chen', amount: 150, dueDate: '2024-03-15', status: 'Pending', invoiceNumber: 'INV-1A2B3C4D' },
      { id: 2, memberName: 'Mike Rodriguez', amount: 300, dueDate: '2024-03-01', status: 'Overdue', invoiceNumber: 'INV-2B3C4D5E' },
      { id: 3, memberName: 'Emily Davis', amount: 600, dueDate: '2024-02-15', status: 'Overdue', invoiceNumber: 'INV-3C4D5E6F' },
      { id: 4, memberName: 'Alex Johnson', amount: 600, dueDate: '2024-01-15', status: 'Paid', invoiceNumber: 'INV-4D5E6F7G' }
    ],
    payments: [
      { id: 1, memberName: 'Alex Johnson', amount: 600, date: '2024-01-10', method: 'Stripe', status: 'completed', timingStatus: 'early' },
      { id: 2, memberName: 'Sarah Chen', amount: 450, date: '2024-02-01', method: 'Stripe', status: 'completed', timingStatus: 'on_time' },
      { id: 3, memberName: 'Mike Rodriguez', amount: 300, date: '2024-02-15', method: 'Manual', status: 'completed', timingStatus: 'late' }
    ]
  });

  const features = [
    {
      id: 'members',
      title: 'Member Management',
      description: 'Comprehensive member tracking with dues management',
      icon: UsersIcon,
      color: 'blue',
      stats: {
        total: demoData.members.length,
        active: demoData.members.filter(m => m.status === 'Active').length,
        outstanding: demoData.members.reduce((sum, m) => sum + m.outstandingDues, 0)
      }
    },
    {
      id: 'invoices',
      title: 'Invoice Tracking',
      description: 'Professional invoice generation and payment tracking',
      icon: DocumentTextIcon,
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
      icon: CreditCardIcon,
      color: 'purple',
      stats: {
        total: demoData.payments.length,
        collected: demoData.payments.reduce((sum, p) => sum + p.amount, 0),
        successRate: '98.5%'
      }
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      description: 'Real-time insights and collection analytics',
      icon: ChartBarIcon,
      color: 'orange',
      stats: {
        collectionRate: '75%',
        avgPaymentTime: '2.3 days',
        totalRevenue: '$1,350'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Demo Notice */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-yellow-800">
                Demo Version - This is a demonstration of Duesly's interface. Not all features, validations, or security measures are present.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img src="/dueslyLogo.svg" alt="Duesly Logo" className="w-10 h-10" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">Duesly</h1>
                <p className="text-sm text-gray-500">Dues Management Platform</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Interactive Demo</p>
              <p className="text-xs text-gray-400">Click sections to explore features</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation */}
      <div className="bg-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 md:py-6">
          {/* Desktop Layout - Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeSection === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => goToFeature(index)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isActive 
                      ? `border-${feature.color}-500 bg-${feature.color}-50 shadow-md` 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? `bg-${feature.color}-500` : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className={`font-semibold text-sm ${
                        isActive ? 'text-duesly-900' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
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
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToFeature(index)}
                    className={`stepper-progress-dot w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentFeatureIndex 
                        ? 'bg-duesly-500 w-6 active' 
                        : 'bg-gray-300 hover:bg-gray-400'
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
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Current Feature Display */}
            <div className="bg-white rounded-xl border-2 border-duesly-500 p-4 shadow-md swipe-feedback">
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
            </div>

            {/* Feature Counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                {currentFeatureIndex + 1} of {features.length}
              </span>
              <div className="text-xs text-blue-500 mt-1">
                Swipe to interact or tap a tab to preview
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Interactive Content Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {(() => {
                  const feature = features.find(f => f.id === activeSection);
                  const Icon = feature?.icon;
                  return (
                    <>
                      <div className={`p-2 rounded-lg bg-${feature?.color}-100 mr-3`}>
                        <Icon className={`w-5 h-5 text-${feature?.color}-600`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{feature?.title}</h2>
                        <p className="text-sm text-gray-600">{feature?.description}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Interactive Demo</p>
                <p className="text-sm font-medium text-gray-700">Click elements to explore</p>
              </div>
            </div>
          </div>

          {/* Section Content */}
          <div className="p-6">
            {activeSection === 'members' && <MembersSection data={demoData.members} onFeatureNotAvailable={handleFeatureNotAvailable} />}
                    {activeSection === 'invoices' && <InvoicesSection data={demoData.invoices} onFeatureNotAvailable={handleFeatureNotAvailable} />}
        {activeSection === 'payments' && <PaymentsSection data={demoData.payments} onFeatureNotAvailable={handleFeatureNotAvailable} />}
            {activeSection === 'analytics' && <AnalyticsSection data={demoData} />}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center px-4 py-3 rounded shadow-lg min-w-[220px] max-w-xs text-sm font-medium transition-all duration-500
              ${toast.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : ''}
              ${toast.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' : ''}
              ${toast.type === 'info' ? 'bg-blue-50 border border-blue-200 text-blue-800' : ''}
              ${toast.visible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {toast.type === 'success' && (
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Member Management Section
const MembersSection = ({ data, onFeatureNotAvailable }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPaymentHistoryModalOpen, setIsPaymentHistoryModalOpen] = useState(false);
  const [memberForHistory, setMemberForHistory] = useState(null);
  const [isMemberDetailsModalOpen, setIsMemberDetailsModalOpen] = useState(false);
  const [selectedMemberForDetails, setSelectedMemberForDetails] = useState(null);
  
  // New state for interactive modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedMemberForPayment, setSelectedMemberForPayment] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedMemberForInvoice, setSelectedMemberForInvoice] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  
  // Local state for members (to simulate database changes)
  const [localMembers, setLocalMembers] = useState(data);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    class: 'Spring 2024',
    status: 'Active',
    outstandingDues: 0,
    paidDues: 0,
    paymentHistory: []
  });
  const [editMember, setEditMember] = useState({});
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleOpenPaymentHistory = (member) => {
    setMemberForHistory(member);
    setIsPaymentHistoryModalOpen(true);
  };

  const handleClosePaymentHistory = () => {
    setMemberForHistory(null);
    setIsPaymentHistoryModalOpen(false);
  };

  const handleOpenMemberDetails = (member) => {
    setSelectedMemberForDetails(member);
    setIsMemberDetailsModalOpen(true);
  };

  const handleCloseMemberDetails = () => {
    setSelectedMemberForDetails(null);
    setIsMemberDetailsModalOpen(false);
  };

  // Edit member handlers
  const handleOpenEditModal = (member) => {
    setMemberToEdit(member);
    setEditMember({ ...member });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setMemberToEdit(null);
    setEditMember({});
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = () => {
    setLocalMembers(prev => prev.map(member => 
      member.id === memberToEdit.id ? { ...member, ...editMember } : member
    ));
    handleCloseEditModal();
  };

  // Delete member handlers
  const handleOpenDeleteModal = (member) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setMemberToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteMember = () => {
    setLocalMembers(prev => prev.filter(member => member.id !== memberToDelete.id));
    handleCloseDeleteModal();
  };

  // Payment handlers
  const handleOpenPaymentModal = (member) => {
    setSelectedMemberForPayment(member);
    setPaymentAmount(member.outstandingDues.toString());
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setSelectedMemberForPayment(null);
    setPaymentAmount('');
    setPaymentMethod('Cash');
    setIsPaymentModalOpen(false);
  };

  const handleRecordPayment = () => {
    const amount = parseFloat(paymentAmount);
    if (amount > 0) {
      const newPayment = {
        date: new Date().toISOString(),
        amount: amount,
        method: paymentMethod,
        status: 'completed',
        transactionId: `demo-${Date.now()}`,
        recordedByName: 'Demo User',
        paymentDescription: 'Demo payment'
      };

      setLocalMembers(prev => prev.map(member => {
        if (member.id === selectedMemberForPayment.id) {
          return {
            ...member,
            outstandingDues: Math.max(0, member.outstandingDues - amount),
            paidDues: member.paidDues + amount,
            paymentHistory: [...(member.paymentHistory || []), newPayment]
          };
        }
        return member;
      }));
    }
    handleClosePaymentModal();
  };

  // Invoice handlers
  const handleOpenInvoiceModal = (member) => {
    setSelectedMemberForInvoice(member);
    setInvoiceAmount('');
    setInvoiceDescription('Spring Dues');
    setIsInvoiceModalOpen(true);
  };

  const handleCloseInvoiceModal = () => {
    setSelectedMemberForInvoice(null);
    setInvoiceAmount('');
    setInvoiceDescription('');
    setIsInvoiceModalOpen(false);
  };

  const handleCreateInvoice = () => {
    const amount = parseFloat(invoiceAmount);
    if (amount > 0) {
      setLocalMembers(prev => prev.map(member => {
        if (member.id === selectedMemberForInvoice.id) {
          return {
            ...member,
            outstandingDues: member.outstandingDues + amount
          };
        }
        return member;
      }));
    }
    handleCloseInvoiceModal();
  };

  // Add member handlers
  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const memberToAdd = {
        ...newMember,
        id: Date.now(),
        paymentHistory: []
      };
      setLocalMembers(prev => [...prev, memberToAdd]);
      setNewMember({
        name: '',
        email: '',
        phone: '',
        class: 'Spring 2024',
        status: 'Active',
        outstandingDues: 0,
        paidDues: 0,
        paymentHistory: []
      });
      setShowAddModal(false);
    }
  };

  // Import members handlers
  const handleImportMembers = () => {
    onFeatureNotAvailable('Import Members');
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
    setImportData('');
    setIsImporting(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => setShowAddModal(true)}
          >
            <UsersIcon className="w-4 h-4 mr-2" />
            Add Member
          </button>
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            onClick={() => setIsImportModalOpen(true)}
          >
            <DocumentArrowUpIcon className="w-4 h-4 mr-2" />
            Import Members
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {localMembers.length} members • {localMembers.filter(m => m.status === 'Active').length} active
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dues</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {localMembers.map((member) => (
                <tr 
                  key={member.id} 
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => handleOpenMemberDetails(member)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <PhoneIcon className="w-4 h-4 mr-1 text-gray-400" />
                      {member.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <AcademicCapIcon className="w-4 h-4 mr-1 text-gray-400" />
                      {member.class}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDuesStatusColor(member.outstandingDues)}`}>
                        {member.outstandingDues === 0 ? 'Paid' : `$${(member.outstandingDues || 0).toFixed(2)} owed`}
                      </span>
                      {member.outstandingDues > 0 && (
                        <span className="text-xs text-gray-500 mt-1">
                          Paid: ${(member.paidDues || 0).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditModal(member);
                        }}
                        title="Edit member"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFeatureNotAvailable('Send Reminder');
                        }}
                        title="Send reminder"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDeleteModal(member);
                        }}
                        title="Delete member"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenPaymentModal(member);
                        }}
                        title="Record payment"
                      >
                        <BanknotesIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Details Modal */}
      {isMemberDetailsModalOpen && selectedMemberForDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Member Details</h2>
                <button 
                  onClick={handleCloseMemberDetails}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Basic Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedMemberForDetails.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedMemberForDetails.status)}`}>
                      {selectedMemberForDetails.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {selectedMemberForDetails.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {selectedMemberForDetails.phone || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8" />
                      </svg>
                      {selectedMemberForDetails.class}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dues Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Dues Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Outstanding Dues</label>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getDuesStatusColor(selectedMemberForDetails.outstandingDues)}`}>
                        {selectedMemberForDetails.outstandingDues === 0 ? 'Paid in Full' : `$${(selectedMemberForDetails.outstandingDues || 0).toFixed(2)} Outstanding`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Paid</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      ${(selectedMemberForDetails.paidDues || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment History Summary */}
              {selectedMemberForDetails.paymentHistory && selectedMemberForDetails.paymentHistory.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payment History</h3>
                  <div className="space-y-2">
                    {selectedMemberForDetails.paymentHistory
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 3)
                      .map((payment, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              ${payment.amount.toFixed(2)} - {payment.method}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(payment.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            payment.status === 'failed' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>


          </div>
        </div>
      )}

      {/* Payment History Modal */}
      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 ${isPaymentHistoryModalOpen ? 'block' : 'hidden'}`}>
        <div className="relative p-8 border w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Payment History - {memberForHistory?.name}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={handleClosePaymentHistory}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="p-6">
              {memberForHistory?.paymentHistory && memberForHistory.paymentHistory.length > 0 ? (
                <div className="space-y-4">
                  {memberForHistory.paymentHistory
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((payment, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${payment.status === 'completed' ? 'bg-green-500' : payment.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                            <span className="font-medium text-gray-900">
                              ${payment.amount.toFixed(2)}
                            </span>
                            {payment.timingStatus && (
                              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                                payment.timingStatus === 'early' ? 'bg-blue-100 text-blue-800' :
                                payment.timingStatus === 'on_time' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {payment.timingStatus === 'on_time' ? 'On Time' : 
                                 payment.timingStatus.charAt(0).toUpperCase() + payment.timingStatus.slice(1)}
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {new Date(payment.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(payment.date).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Payment Details */}
                        <div className="text-xs text-gray-600 space-y-1 mt-2">
                          {payment.transactionId && (
                            <div className="flex justify-between">
                              <span className="font-medium">Transaction ID:</span>
                              <span className="text-gray-500">{payment.transactionId}</span>
                            </div>
                          )}
                          {payment.method && (
                            <div className="flex justify-between">
                              <span className="font-medium">Method:</span>
                              <span className="text-gray-500">{payment.method}</span>
                            </div>
                          )}
                          {payment.recordedByName && (
                            <div className="flex justify-between">
                              <span className="font-medium">Recorded by:</span>
                              <span className="text-gray-500">{payment.recordedByName}</span>
                            </div>
                          )}
                        </div>

                        {payment.paymentDescription && (
                          <div className="text-xs text-gray-500 mt-2">
                            {payment.paymentDescription}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No payment history</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This member has no recorded payments yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Member</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter member name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  value={newMember.class}
                  onChange={(e) => setNewMember({...newMember, class: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Spring 2024">Spring 2024</option>
                  <option value="Fall 2023">Fall 2023</option>
                  <option value="Spring 2023">Spring 2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newMember.status}
                  onChange={(e) => setNewMember({...newMember, status: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {isEditModalOpen && memberToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Member</h2>
                <button 
                  onClick={handleCloseEditModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editMember.name || ''}
                  onChange={(e) => setEditMember({...editMember, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editMember.email || ''}
                  onChange={(e) => setEditMember({...editMember, email: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editMember.phone || ''}
                  onChange={(e) => setEditMember({...editMember, phone: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  value={editMember.class || ''}
                  onChange={(e) => setEditMember({...editMember, class: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Spring 2024">Spring 2024</option>
                  <option value="Fall 2023">Fall 2023</option>
                  <option value="Spring 2023">Spring 2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editMember.status || ''}
                  onChange={(e) => setEditMember({...editMember, status: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCloseEditModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && memberToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Delete Member</h2>
                <button 
                  onClick={handleCloseDeleteModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <strong>{memberToDelete.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCloseDeleteModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMember}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedMemberForPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Record Payment</h2>
                <button 
                  onClick={handleClosePaymentModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedMemberForPayment.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount ($)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter payment amount"
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Cash">Cash</option>
                  <option value="Stripe">Stripe</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleClosePaymentModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRecordPayment}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {isInvoiceModalOpen && selectedMemberForInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create Invoice</h2>
                <button 
                  onClick={handleCloseInvoiceModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedMemberForInvoice.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Amount ($)</label>
                <input
                  type="number"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter invoice amount"
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={invoiceDescription}
                  onChange={(e) => setInvoiceDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter invoice description"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCloseInvoiceModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Members Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Import Members</h3>
              <button 
                onClick={closeImportModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
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
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportMembers}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
const InvoicesSection = ({ data, onFeatureNotAvailable }) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoiceForAction, setSelectedInvoiceForAction] = useState(null);
  const [localInvoices, setLocalInvoices] = useState(data);
  const [editInvoice, setEditInvoice] = useState({});
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Stripe');


  // Handler functions
  const handleViewInvoice = (invoice) => {
    setSelectedInvoiceForAction(invoice);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedInvoiceForAction(null);
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoiceForAction(invoice);
    setEditInvoice({ ...invoice });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedInvoiceForAction(null);
    setEditInvoice({});
  };

  const handleSaveEdit = () => {
    setLocalInvoices(prev => prev.map(invoice => 
      invoice.id === selectedInvoiceForAction.id ? { ...invoice, ...editInvoice } : invoice
    ));
    handleCloseEditModal();
  };

  const handlePayInvoice = (invoice) => {
    setSelectedInvoiceForAction(invoice);
    setPaymentAmount(invoice.amount.toString());
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedInvoiceForAction(null);
    setPaymentAmount('');
    setPaymentMethod('Stripe');
  };

  const handleProcessPayment = () => {
    const amount = parseFloat(paymentAmount);
    if (amount > 0) {
      setLocalInvoices(prev => prev.map(invoice => {
        if (invoice.id === selectedInvoiceForAction.id) {
          return {
            ...invoice,
            status: 'Paid',
            amount: amount
          };
        }
        return invoice;
      }));
    }
    handleClosePaymentModal();
  };

  const handleDownloadInvoice = (invoice) => {
    // Demo download functionality - show alert
    // TODO: Replace with proper download functionality for production
    alert(`Downloading invoice ${invoice.invoiceNumber} for ${invoice.memberName}`);
  };



  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            onClick={() => onFeatureNotAvailable('Create Invoice')}
          >
            <DocumentTextIcon className="w-4 h-4 mr-2" />
            Create Invoice
          </button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => onFeatureNotAvailable('Bulk Create')}
          >
            <DocumentArrowUpIcon className="w-4 h-4 mr-2" />
            Bulk Create
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {localInvoices.length} invoices • {localInvoices.filter(i => i.status === 'Pending').length} pending
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
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
              {localInvoices.map((invoice) => (
                <tr 
                  key={invoice.id} 
                  className="hover:bg-green-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">Spring Dues</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.memberName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${invoice.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewInvoice(invoice);
                        }}
                        title="View invoice"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditInvoice(invoice);
                        }}
                        title="Edit invoice"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      {invoice.status !== 'Paid' && (
                        <button 
                          className="text-green-600 hover:text-green-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePayInvoice(invoice);
                          }}
                          title="Pay invoice"
                        >
                          <CreditCardIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        className="text-green-600 hover:text-green-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadInvoice(invoice);
                        }}
                        title="Download invoice"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Invoice Details</h3>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
                <p className="mt-1 text-sm text-gray-900">{selectedInvoice.invoiceNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Member</label>
                <p className="mt-1 text-sm text-gray-900">{selectedInvoice.memberName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <p className="mt-1 text-sm font-medium text-gray-900">${selectedInvoice.amount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <p className="mt-1 text-sm text-gray-900">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedInvoice.status)}`}>
                  {selectedInvoice.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                onClick={() => onFeatureNotAvailable('Send Reminder')}
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {isViewModalOpen && selectedInvoiceForAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
                <button 
                  onClick={handleCloseViewModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedInvoiceForAction.invoiceNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedInvoiceForAction.memberName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-lg">${selectedInvoiceForAction.amount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{new Date(selectedInvoiceForAction.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedInvoiceForAction.status)}`}>
                  {selectedInvoiceForAction.status}
                </span>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCloseViewModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Invoice Modal */}
      {isEditModalOpen && selectedInvoiceForAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Invoice</h2>
                <button 
                  onClick={handleCloseEditModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={editInvoice.invoiceNumber || ''}
                  onChange={(e) => setEditInvoice({...editInvoice, invoiceNumber: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                <input
                  type="text"
                  value={editInvoice.memberName || ''}
                  onChange={(e) => setEditInvoice({...editInvoice, memberName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  value={editInvoice.amount || ''}
                  onChange={(e) => setEditInvoice({...editInvoice, amount: parseFloat(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={editInvoice.dueDate ? new Date(editInvoice.dueDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setEditInvoice({...editInvoice, dueDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editInvoice.status || ''}
                  onChange={(e) => setEditInvoice({...editInvoice, status: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCloseEditModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedInvoiceForAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Process Payment</h2>
                <button 
                  onClick={handleClosePaymentModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedInvoiceForAction.invoiceNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedInvoiceForAction.memberName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount ($)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter payment amount"
                  min="0.01"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Stripe">Stripe</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleClosePaymentModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessPayment}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Process Payment
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

// Payment Processing Section
const PaymentsSection = ({ data, onFeatureNotAvailable }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            onClick={() => onFeatureNotAvailable('Process Payment')}
          >
            <CreditCardIcon className="w-4 h-4 mr-2" />
            Process Payment
          </button>
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            onClick={() => onFeatureNotAvailable('Generate Receipt')}
          >
            <DocumentTextIcon className="w-4 h-4 mr-2" />
            Generate Receipt
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {data.length} payments • ${data.reduce((sum, p) => sum + p.amount, 0)} collected
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
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
                <tr 
                  key={payment.id} 
                  className="hover:bg-purple-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedPayment(payment)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{payment.id}</div>
                    <div className="text-sm text-gray-500">{payment.status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.memberName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${payment.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(payment.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CreditCardIcon className="w-4 h-4 mr-1 text-gray-400" />
                      {payment.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTimingStatusColor(payment.timingStatus)}`}>
                      {payment.timingStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={() => onFeatureNotAvailable('Payment Receipt')}
                      >
                        <DocumentTextIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900 bg-white border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 relative group"
                        onClick={() => onFeatureNotAvailable('Payment Details')}
                      >
                        <InformationCircleIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment ID</label>
                <p className="mt-1 text-sm text-gray-900">#{selectedPayment.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Member</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPayment.memberName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <p className="mt-1 text-sm font-medium text-gray-900">${selectedPayment.amount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPayment.method}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Timing</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTimingStatusColor(selectedPayment.timingStatus)}`}>
                  {selectedPayment.timingStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                onClick={() => onFeatureNotAvailable('Download Receipt')}
              >
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Analytics Section
const AnalyticsSection = ({ data }) => {
  const totalMembers = data.members.length;
  const activeMembers = data.members.filter(m => m.status === 'Active').length;
  const totalOutstanding = data.members.reduce((sum, m) => sum + m.outstandingDues, 0);
  const totalCollected = data.payments.reduce((sum, p) => sum + p.amount, 0);
  const collectionRate = totalMembers > 0 ? ((totalCollected / (totalMembers * 600)) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <UsersIcon className="w-8 h-8 mr-3" />
            <div>
              <p className="text-sm opacity-90">Total Members</p>
              <p className="text-2xl font-bold">{totalMembers}</p>
              <p className="text-sm opacity-90">{activeMembers} active</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-8 h-8 mr-3" />
            <div>
              <p className="text-sm opacity-90">Collection Rate</p>
              <p className="text-2xl font-bold">{collectionRate}%</p>
              <p className="text-sm opacity-90">This semester</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-8 h-8 mr-3" />
            <div>
              <p className="text-sm opacity-90">Outstanding</p>
              <p className="text-2xl font-bold">${totalOutstanding}</p>
              <p className="text-sm opacity-90">To collect</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center">
            <BanknotesIcon className="w-8 h-8 mr-3" />
            <div>
              <p className="text-sm opacity-90">Collected</p>
              <p className="text-2xl font-bold">${totalCollected}</p>
              <p className="text-sm opacity-90">This semester</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Timeline */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Timeline</h3>
          <div className="space-y-3">
            {data.payments.map((payment, index) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{payment.memberName}</p>
                    <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${payment.amount}</p>
                  <p className="text-xs text-gray-500">{payment.method}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Active Members</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{activeMembers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Inactive Members</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{totalMembers - activeMembers}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(activeMembers / totalMembers) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <p className="text-sm text-gray-700">Payment received from Sarah Chen - $450</p>
            <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <p className="text-sm text-gray-700">Invoice sent to Mike Rodriguez</p>
            <span className="ml-auto text-xs text-gray-500">1 day ago</span>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <p className="text-sm text-gray-700">Payment reminder sent to Emily Davis</p>
            <span className="ml-auto text-xs text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueslyDemoShowcase; 