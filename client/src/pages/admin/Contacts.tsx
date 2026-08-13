import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Calendar,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  RefreshCw,
  Send,
  X,
} from "lucide-react";
import { contactService } from "../../services/contactService";
import { emailService } from "../../services/emailService";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactService.getAll();
      setContacts(
        data.sort(
          (a: Contact, b: Contact) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await contactService.markAsRead(id);
      setContacts(
        contacts.map((c) => (c._id === id ? { ...c, read: true } : c))
      );
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, read: true });
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    try {
      await contactService.markAsUnread(id);
      setContacts(
        contacts.map((c) => (c._id === id ? { ...c, read: false } : c))
      );
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, read: false });
      }
    } catch (error) {
      console.error("Error marking as unread:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await contactService.delete(id);
      setContacts(contacts.filter((c) => c._id !== id));
      setDeleteConfirm(null);
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await Promise.all(
        filteredContacts.map((c) => contactService.delete(c._id))
      );
      setContacts(contacts.filter((c) => !filteredContacts.find((f) => f._id === c._id)));
      setSelectedContact(null);
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting contacts:", error);
    }
  };

  const openReplyModal = () => {
    if (selectedContact) {
      setReplyContent(`Hi ${selectedContact.name},\n\n`);
      setShowReplyModal(true);
    }
  };

  const handleSendReply = async () => {
    if (!selectedContact || !replyContent.trim()) return;

    setSending(true);
    try {
      const result = await emailService.sendReply(
        selectedContact.email,
        "Re: Portfolio Contact",
        replyContent
      );

      if (result.success) {
        setShowReplyModal(false);
        setReplyContent("");
        showToast("Reply sent successfully!", "success");
      } else {
        showToast("Failed to send email. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      showToast("Failed to send email. Please try again.", "error");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !contact.read) ||
      (filter === "read" && contact.read);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Contacts</h1>
          <p className="text-gray-400 text-sm mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "All messages have been read"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchContacts}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          {filteredContacts.length > 0 && (
            <button
              onClick={() => setDeleteConfirm("all")}
              className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete All ({filteredContacts.length})
            </button>
          )}
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a1a] border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-primary text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 relative rounded-xl p-[1px] bg-gradient-to-br from-white/10 to-white/5"
        >
          <div className="bg-[#0a0a1a] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/5">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Messages ({filteredContacts.length})
              </h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto" />
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">
                  {searchTerm || filter !== "all"
                    ? "No messages match your search"
                    : "No messages yet"}
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <button
                    key={contact._id}
                    onClick={() => {
                      setSelectedContact(contact);
                      if (!contact.read) handleMarkAsRead(contact._id);
                    }}
                    className={`w-full p-4 text-left border-b border-white/5 hover:bg-white/5 transition-colors ${
                      selectedContact?._id === contact._id
                        ? "bg-primary/10 border-l-2 border-l-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            contact.read ? "bg-gray-600" : "bg-primary"
                          }`}
                        />
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-medium truncate ${
                              contact.read ? "text-gray-400" : "text-white"
                            }`}
                          >
                            {contact.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 flex-shrink-0 ml-2">
                        {formatDate(contact.createdAt).split(",")[0]}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Contact Detail */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 relative rounded-xl p-[1px] bg-gradient-to-br from-white/10 to-white/5 h-fit"
        >
          <div className="bg-[#0a0a1a] rounded-xl p-6">
            {selectedContact ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedContact.name}
                    </h3>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-primary text-sm hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    {!selectedContact.read ? (
                      <button
                        onClick={() => handleMarkAsRead(selectedContact._id)}
                        className="p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkAsUnread(selectedContact._id)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        title="Mark as unread"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteConfirm(selectedContact._id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedContact.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedContact.read ? (
                      <>
                        <Eye className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Read</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400">Unread</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="bg-dark-300/50 rounded-lg p-4 border border-white/5">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={openReplyModal}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <Mail className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a1a] rounded-xl p-6 max-w-sm w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {deleteConfirm === "all" ? "Delete All Messages" : "Delete Message"}
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                {deleteConfirm === "all"
                  ? `Are you sure you want to delete all ${filteredContacts.length} messages? This action cannot be undone.`
                  : "Are you sure you want to delete this message? This action cannot be undone."}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    deleteConfirm === "all"
                      ? handleDeleteAll()
                      : handleDelete(deleteConfirm)
                  }
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply Modal */}
      <AnimatePresence>
        {showReplyModal && selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            onClick={() => setShowReplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a1a] rounded-xl w-full max-w-lg border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div>
                  <h2 className="text-xl font-bold text-white">Reply to</h2>
                  <p className="text-primary text-sm">{selectedContact.email}</p>
                </div>
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Original Message */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                    Original Message
                  </label>
                  <div className="bg-dark-300/50 rounded-lg p-3 border border-white/5">
                    <p className="text-gray-400 text-sm">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Reply Content */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                    Your Reply
                  </label>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all resize-none"
                    placeholder="Type your reply..."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 justify-end p-6 border-t border-white/5">
                <button
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={!replyContent.trim() || sending}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg ${
              toast.type === "success"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
