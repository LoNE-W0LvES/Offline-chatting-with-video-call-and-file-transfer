import { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, User } from 'lucide-react';
import { Account } from '../App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface MessagesListPageProps {
    account: Account;
    onBack: () => void;
    onSelectConversation: (user: Account) => void;
}

interface Message {
    id: string;
    fromId: string;
    toId: string;
    fromName: string;
    toName: string;
    content: string;
    timestamp: number;
}

interface Conversation {
    user: Account;
    lastMessage: string;
    timestamp: number;
    unreadCount: number;
}

export function MessagesListPage({ account, onBack, onSelectConversation }: MessagesListPageProps) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [allAccounts, setAllAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccounts();
        loadConversations();
        const interval = setInterval(loadConversations, 2000); // Refresh every 2 seconds
        return () => clearInterval(interval);
    }, [account.id]);

    const loadAccounts = async () => {
        try {
            const response = await fetch(`${API_URL}/api/accounts`);
            if (response.ok) {
                const data = await response.json();
                setAllAccounts(data.filter((acc: Account) => acc.id !== account.id));
            }
        } catch (error) {
            console.error('Failed to load accounts:', error);
        }
    };

    const loadConversations = async () => {
        try {
            const response = await fetch(`${API_URL}/api/messages?userId=${account.id}`);
            if (response.ok) {
                const allMessages: Message[] = await response.json();

                // Group messages by conversation
                const conversationMap = new Map<string, Conversation>();

                allMessages.forEach((message) => {
                    const otherUserId = message.fromId === account.id ? message.toId : message.fromId;
                    const otherUserName = message.fromId === account.id ? message.toName : message.fromName;

                    const existing = conversationMap.get(otherUserId);

                    if (!existing || message.timestamp > existing.timestamp) {
                        conversationMap.set(otherUserId, {
                            user: {
                                id: otherUserId,
                                username: otherUserName.toLowerCase().replace(/\s+/g, ''),
                                fullName: otherUserName,
                            },
                            lastMessage: message.content,
                            timestamp: message.timestamp,
                            unreadCount: 0, // TODO: Implement unread count tracking
                        });
                    }
                });

                // Sort by timestamp (most recent first)
                const sortedConversations = Array.from(conversationMap.values()).sort(
                    (a, b) => b.timestamp - a.timestamp
                );

                setConversations(sortedConversations);
                setLoading(false);
            }
        } catch (error) {
            console.error('Failed to load conversations:', error);
            setLoading(false);
        }
    };

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors mb-4"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Home</span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">My Messages</h1>
                                <p className="text-blue-100">Your direct message conversations</p>
                            </div>
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                                <p className="mt-4 text-gray-600">Loading conversations...</p>
                            </div>
                        ) : conversations.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-xl font-semibold text-gray-900 mb-2">
                                    No conversations yet
                                </p>
                                <p className="text-gray-600 mb-6">
                                    Start messaging by going to the Users page and clicking "Message" on a user
                                </p>
                                <button
                                    onClick={onBack}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Go to Users
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {conversations.map((conversation) => (
                                    <button
                                        key={conversation.user.id}
                                        onClick={() => onSelectConversation(conversation.user)}
                                        className="w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-blue-300 group"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    {conversation.user.fullName.charAt(0).toUpperCase()}
                                                </div>
                                            </div>

                                            {/* Conversation Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline justify-between mb-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                                        {conversation.user.fullName}
                                                    </h3>
                                                    <span className="text-sm text-gray-500 ml-2 flex-shrink-0">
                                                        {formatTimestamp(conversation.timestamp)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 truncate">
                                                    {conversation.lastMessage}
                                                </p>
                                            </div>

                                            {/* Unread indicator (placeholder) */}
                                            {conversation.unreadCount > 0 && (
                                                <div className="flex-shrink-0">
                                                    <div className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                                        {conversation.unreadCount}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Start New Conversation Section */}
                    {allAccounts.length > 0 && (
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Start a new conversation</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                                {allAccounts
                                    .filter(acc => !conversations.find(c => c.user.id === acc.id))
                                    .map((acc) => (
                                        <button
                                            key={acc.id}
                                            onClick={() => onSelectConversation(acc)}
                                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-white transition-colors text-left"
                                        >
                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                                                {acc.fullName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{acc.fullName}</p>
                                                <p className="text-xs text-gray-500 truncate">@{acc.username}</p>
                                            </div>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
