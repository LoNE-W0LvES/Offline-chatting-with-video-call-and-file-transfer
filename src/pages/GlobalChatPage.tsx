import { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, MessageSquare } from 'lucide-react';
import { Account } from '../App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface GlobalMessage {
    id: string;
    fromId: string;
    fromName: string;
    content: string;
    timestamp: number;
}

interface GlobalChatPageProps {
    account: Account;
    onBack: () => void;
}

export function GlobalChatPage({ account, onBack }: GlobalChatPageProps) {
    const [messages, setMessages] = useState<GlobalMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadMessages();
        const interval = setInterval(loadMessages, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Scroll to bottom when new messages arrive
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const loadMessages = async () => {
        try {
            const response = await fetch(`${API_URL}/api/global-chat`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (error) {
            console.error('Failed to load global chat:', error);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || sending) return;

        setSending(true);
        const messageContent = newMessage.trim();
        setNewMessage('');

        try {
            const response = await fetch(`${API_URL}/api/global-chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fromId: account.id,
                    fromName: account.fullName,
                    content: messageContent,
                }),
            });

            if (response.ok) {
                await loadMessages();
            } else {
                setNewMessage(messageContent);
                alert('Failed to send message');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            setNewMessage(messageContent);
            alert('Failed to send message');
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={onBack} 
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Back to home"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Global Chatroom</h1>
                            <p className="text-sm text-gray-500">Chat with everyone on the network</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-900">{messages.length} messages</span>
                    </div>
                </div>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
                <div 
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto p-6 space-y-3"
                >
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <MessageSquare className="w-16 h-16 mb-3 opacity-50" />
                            <p className="text-lg font-medium">No messages yet</p>
                            <p className="text-sm">Be the first to say something!</p>
                        </div>
                    ) : (
                        messages.map(msg => (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.fromId === account.id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-md ${msg.fromId === account.id ? 'order-2' : 'order-1'}`}>
                                    {msg.fromId !== account.id && (
                                        <div className="text-xs font-semibold text-gray-700 mb-1 px-2">
                                            {msg.fromName}
                                        </div>
                                    )}
                                    <div className={`px-4 py-3 rounded-lg shadow-sm ${
                                        msg.fromId === account.id
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                                            : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                                    }`}>
                                        <p className="break-words text-sm leading-relaxed">{msg.content}</p>
                                        <p className={`text-xs mt-1.5 ${
                                            msg.fromId === account.id ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={sending}
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || sending}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            {sending ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}