import React, { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail, Phone, User, X, Send, Smartphone, Inbox, BadgeCheck } from "lucide-react";

// Demo member data
const demoMembers = [
  { id: 1, name: "Alex Johnson", email: "alex.j@university.edu", phone: "(555) 123-4567" },
  { id: 2, name: "Sarah Chen", email: "sarah.c@university.edu", phone: "(555) 234-5678" },
  { id: 3, name: "Mike Rodriguez", email: "mike.r@university.edu", phone: "(555) 345-6789" },
  { id: 4, name: "Emily Davis", email: "emily.d@university.edu", phone: "(555) 456-7890" },
];

const initialMessage = (name: string) =>
  `From Duesly: Hey ${name} your dues deadline is coming up soon! Pay here: duesly.org/pay`;

export const ReminderDemoSection: React.FC = () => {
  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [selectedMember, setSelectedMember] = useState(demoMembers[0]);
  const [message, setMessage] = useState(initialMessage(demoMembers[0].name));
  const [step, setStep] = useState<"pre" | "microfeedback" | "animating">("pre");
  const [showGuidance, setShowGuidance] = useState(true);
  const [animKey, setAnimKey] = useState(0); // for resetting animation
  const microfeedbackTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle channel switch
  const handleChannelChange = useCallback((newChannel: "sms" | "email") => {
    setChannel(newChannel);
    setStep("pre");
    setShowGuidance(true);
    setAnimKey((k) => k + 1); // reset animation
  }, []);

  // Handle member change
  const handleMemberChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const member = demoMembers.find((m) => m.id === Number(e.target.value));
    if (member) {
      setSelectedMember(member);
      setMessage(initialMessage(member.name));
    }
  }, []);

  // Handle send
  const handleSend = useCallback(() => {
    setStep("microfeedback");
    setShowGuidance(false);
    if (microfeedbackTimeout.current) clearTimeout(microfeedbackTimeout.current);
    microfeedbackTimeout.current = setTimeout(() => {
      setStep("animating");
    }, 900);
  }, []);

  // Memoize member options to prevent unnecessary re-renders
  const memberOptions = useMemo(() => (
    demoMembers.map((member) => (
      <option key={member.id} value={member.id}>
        {member.name} ({channel === "sms" ? member.phone : member.email})
      </option>
    ))
  ), [channel]);

  // Reset on channel switch or unmount
  React.useEffect(() => {
    return () => {
      if (microfeedbackTimeout.current) clearTimeout(microfeedbackTimeout.current);
    };
  }, []);

  // Reset animation if channel changes
  React.useEffect(() => {
    setStep("pre");
    setShowGuidance(true);
    if (microfeedbackTimeout.current) clearTimeout(microfeedbackTimeout.current);
  }, [channel, selectedMember]);

  return (
    <section className="py-12 px-2 md:px-0 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-blue-100 p-6 md:p-8 relative overflow-hidden">
        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:flex gap-8 h-full">
          {/* Left Side - Information and Controls */}
          <div className="flex-1 max-w-md">
            {/* Info/Guidance Box */}
            <AnimatePresence>
              {showGuidance && step === "pre" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-5 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-blue-900 text-sm font-medium"
                >
                  <BadgeCheck className="w-5 h-5 text-blue-500 mr-2" />
                  <span>
                    Select a message type and preview how it's sent to a member. Messages can be customized before sending.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tabs for SMS/Email */}
            <Tabs value={channel} onValueChange={v => handleChannelChange(v as "sms" | "email") }>
              <TabsList className="mb-4 w-full flex gap-2">
                <TabsTrigger value="sms" className="flex-1 flex items-center justify-center gap-2">
                  <Smartphone className="w-4 h-4" /> Send SMS
                </TabsTrigger>
                <TabsTrigger value="email" className="flex-1 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> Send Email
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Member Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Member</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedMember.id}
                onChange={handleMemberChange}
                disabled={step !== "pre"}
              >
                {memberOptions}
              </select>
            </div>

            {/* Message Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-none"
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={step !== "pre"}
                maxLength={320}
              />
            </div>

            {/* Send Button */}
            <Button
              className="w-full bg-duesly-500 hover:bg-duesly-600 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 mb-2"
              onClick={handleSend}
              disabled={step !== "pre" || !message.trim()}
            >
              <Send className="w-5 h-5 mr-2" />
              {channel === "sms" ? "Send SMS" : "Send Email"}
            </Button>
          </div>

          {/* Right Side - Response Preview */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Channel-specific Animation */}
              <div className="min-h-[400px] flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {step === "animating" && channel === "email" && (
                    <motion.div
                      key={`email-${animKey}`}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 40, scale: 0.9 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full flex flex-col items-center"
                    >
                      {/* Envelope flying in */}
                      <motion.div
                        initial={{ y: 60, scale: 0.7, rotate: -8 }}
                        animate={{ y: 0, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                        className="mb-2"
                      >
                        <Inbox className="w-16 h-16 text-blue-400 drop-shadow-lg" />
                      </motion.div>
                      {/* Email preview */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="w-full max-w-xs bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden"
                      >
                        <div className="bg-blue-500 px-4 py-2 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-white" />
                          <span className="text-white font-semibold text-sm">Duesly Mail</span>
                        </div>
                        <div className="px-4 py-3 space-y-2">
                          <div className="text-xs text-gray-500">From: <span className="text-gray-700">Duesly &lt;no-reply@duesly.com&gt;</span></div>
                          <div className="text-xs text-gray-500">To: <span className="text-gray-700">{selectedMember.email}</span></div>
                          <div className="text-xs text-gray-500">Subject: <span className="text-gray-700">Dues Reminder</span></div>
                          <div className="mt-2 text-gray-800 text-sm whitespace-pre-line">{message}</div>
                          <div className="mt-4 flex justify-center">
                            <Button className="bg-duesly-500 hover:bg-duesly-600 text-white rounded-lg px-4 py-2 text-sm font-semibold shadow" style={{ pointerEvents: "none" }}>
                              Pay Now
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                  {step === "animating" && channel === "sms" && (
                    <motion.div
                      key={`sms-${animKey}`}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 40, scale: 0.9 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full flex flex-col items-center"
                    >
                      {/* Phone sliding in */}
                      <motion.div
                        initial={{ y: 60, scale: 0.7, rotate: 8 }}
                        animate={{ y: 0, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                        className="mb-2"
                      >
                        <Smartphone className="w-16 h-16 text-blue-400 drop-shadow-lg" />
                      </motion.div>
                      {/* SMS preview */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="w-full max-w-xs bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden"
                      >
                        <div className="bg-blue-500 px-4 py-2 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-white" />
                          <span className="text-white font-semibold text-sm">From: Duesly</span>
                          <span className="ml-auto"><User className="w-4 h-4 text-white opacity-70" /></span>
                        </div>
                        <div className="px-4 py-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-500" />
                            </span>
                            <span className="text-xs text-gray-700 font-medium">{selectedMember.name}</span>
                          </div>
                          <div className="bg-blue-50 rounded-lg px-3 py-2 text-gray-800 text-sm shadow-sm animate-fade-in">
                            {message}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked (original layout) */}
        <div className="lg:hidden">
          {/* Info/Guidance Box */}
          <AnimatePresence>
            {showGuidance && step === "pre" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mb-5 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-blue-900 text-sm font-medium"
              >
                <BadgeCheck className="w-5 h-5 text-blue-500 mr-2" />
                <span>
                  Select a message type and preview how it's sent to a member. Messages can be customized before sending.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs for SMS/Email */}
          <Tabs value={channel} onValueChange={v => handleChannelChange(v as "sms" | "email") }>
            <TabsList className="mb-4 w-full flex gap-2">
              <TabsTrigger value="sms" className="flex-1 flex items-center justify-center gap-2">
                <Smartphone className="w-4 h-4" /> Send SMS
              </TabsTrigger>
              <TabsTrigger value="email" className="flex-1 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Send Email
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Member Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Member</label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedMember.id}
              onChange={handleMemberChange}
              disabled={step !== "pre"}
            >
              {memberOptions}
            </select>
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-none"
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={step !== "pre"}
              maxLength={320}
            />
          </div>

          {/* Send Button */}
          <Button
            className="w-full bg-duesly-500 hover:bg-duesly-600 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 mb-2"
            onClick={handleSend}
            disabled={step !== "pre" || !message.trim()}
          >
            <Send className="w-5 h-5 mr-2" />
            {channel === "sms" ? "Send SMS" : "Send Email"}
          </Button>

          {/* Channel-specific Animation */}
          <div className="mt-8 min-h-[220px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {step === "animating" && channel === "email" && (
                <motion.div
                  key={`email-${animKey}`}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Envelope flying in */}
                  <motion.div
                    initial={{ y: 60, scale: 0.7, rotate: -8 }}
                    animate={{ y: 0, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    className="mb-2"
                  >
                    <Inbox className="w-16 h-16 text-blue-400 drop-shadow-lg" />
                  </motion.div>
                  {/* Email preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full max-w-xs bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="bg-blue-500 px-4 py-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-white" />
                      <span className="text-white font-semibold text-sm">Duesly Mail</span>
                    </div>
                    <div className="px-4 py-3 space-y-2">
                      <div className="text-xs text-gray-500">From: <span className="text-gray-700">Duesly &lt;no-reply@duesly.com&gt;</span></div>
                      <div className="text-xs text-gray-500">To: <span className="text-gray-700">{selectedMember.email}</span></div>
                      <div className="text-xs text-gray-500">Subject: <span className="text-gray-700">Dues Reminder</span></div>
                      <div className="mt-2 text-gray-800 text-sm whitespace-pre-line">{message}</div>
                      <div className="mt-4 flex justify-center">
                        <Button className="bg-duesly-500 hover:bg-duesly-600 text-white rounded-lg px-4 py-2 text-sm font-semibold shadow" style={{ pointerEvents: "none" }}>
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              {step === "animating" && channel === "sms" && (
                <motion.div
                  key={`sms-${animKey}`}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Phone sliding in */}
                  <motion.div
                    initial={{ y: 60, scale: 0.7, rotate: 8 }}
                    animate={{ y: 0, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    className="mb-2"
                  >
                    <Smartphone className="w-16 h-16 text-blue-400 drop-shadow-lg" />
                  </motion.div>
                  {/* SMS preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full max-w-xs bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="bg-blue-500 px-4 py-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-white" />
                      <span className="text-white font-semibold text-sm">From: Duesly</span>
                      <span className="ml-auto"><User className="w-4 h-4 text-white opacity-70" /></span>
                    </div>
                    <div className="px-4 py-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-500" />
                        </span>
                        <span className="text-xs text-gray-700 font-medium">{selectedMember.name}</span>
                      </div>
                      <div className="bg-blue-50 rounded-lg px-3 py-2 text-gray-800 text-sm shadow-sm animate-fade-in">
                        {message}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Microfeedback Toast */}
        <AnimatePresence>
          {step === "microfeedback" && (
            <motion.div
              key="toast"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 top-6 z-20 bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-base font-semibold"
              style={{ pointerEvents: "none" }}
            >
              <CheckCircle className="w-5 h-5 text-green-500" /> Message Sent ✓
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}; 