import { useState, useEffect, useMemo } from "react";
import sendEmail from "@/utils/sendEmail";
import { useToast } from '@/context/ToastContext';

interface ReminderComponentProps {
    isOpen: boolean;
    onClose: () => void;
    recipientEmail?: string;
    recipientName?: string;
    onSendSuccess?: () => void;
}

const ReminderComponent = ({ isOpen, onClose, recipientEmail, recipientName = '', onSendSuccess }: ReminderComponentProps) => {
    const [customMessage, setCustomMessage] = useState<string>('');
    const [selectedMessage, setSelectedMessage] = useState<string>('');
    const defaultMessage = useMemo(() =>
        `Dear ${recipientName}\n\nPlease complete your profile information, to ensure we can provide you with the best service.\n\nThank you!`,
        [recipientName]
    );
    const [messages, setMessages] = useState<string[]>([defaultMessage]);

    const { showSuccess, showError } = useToast();

    const handleAddMessage = () => {
        if (customMessage.trim()) {
            setMessages((prevMessages) => [...prevMessages, customMessage]);
            setCustomMessage('');
        }
    };

    const isMessageSelected = () => {
        return selectedMessage !== '' || customMessage.trim() !== '';
    };

    const handleSendReminder = async () => {
        if (!isMessageSelected() || !recipientEmail) {
            return;
        }

        try {
            await sendEmail({
                sendToEmail: [recipientEmail],
                subject: "Profile Completion Reminder",
                message: selectedMessage || customMessage,
            });

            onSendSuccess?.();
            showSuccess('Reminder Sent Successfully!');
            handleClose();
        } catch (error) {
            showError('Failed to Send Reminder!');
            console.error('Failed to send reminder:', error);
        }
    };

    const handleClose = () => {
        setCustomMessage('');
        setSelectedMessage('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Select or Add Custom Message</h2>

                <div className="mt-4">
                    <label htmlFor="messageSelect" className="block mb-1 text-base font-semibold text-neutral-700">
                        Select Message:
                    </label>
                    <select
                        id="messageSelect"
                        className="w-full p-2 border rounded"
                        value={selectedMessage}
                        onChange={(e) => setSelectedMessage(e.target.value)}
                    >
                        <option value="">Select a message</option>
                        {messages.map((msg, index) => (
                            <option key={index} value={msg} className="whitespace-normal" title={msg}>
                                {msg.length > 50 ? `${msg.substring(0, 50)}...` : msg}
                            </option>
                        ))}
                    </select>
                </div>

                <label htmlFor="newMessage" className="block mb-1 text-base font-semibold text-neutral-700 mt-4">
                    Add Custom Message:
                </label>
                <div className="flex flex-col">
                    <textarea
                        id="newMessage"
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        className="flex-grow p-2 border border-neutral-300 rounded-lg resize-none"
                        placeholder="Type your custom message."
                        rows={4}
                    />
                    <button
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleAddMessage}
                        aria-label="Add Message"
                    >
                        Add Message
                    </button>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold ${isMessageSelected()
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        disabled={!isMessageSelected()}
                        onClick={handleSendReminder}
                    >
                        Send
                    </button>
                    <button
                        className="ml-2 bg-gray-300 text-neutral-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReminderComponent;