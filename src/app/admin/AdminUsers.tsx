'use client';

import { useEffect, useState } from 'react';
import { Users, RefreshCw, Mail, Calendar } from 'lucide-react';

interface AuthUser {
    id: string;
    email: string;
    full_name: string | null;
    provider: string;
    created_at: string;
    last_sign_in_at: string | null;
    email_confirmed_at: string | null;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<AuthUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                setError('Failed to fetch users');
            }
        } catch {
            setError('Network error');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white h-16 animate-pulse rounded border border-gray-200" />
                ))}
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-sm py-4">{error}</div>;

    if (users.length === 0) {
        return (
            <div className="text-center py-24 border border-dashed border-gray-300 rounded">
                <Users size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No registered users yet.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500 font-medium">{users.length} registered accounts</p>
                <button onClick={fetchUsers} className="text-xs font-bold uppercase tracking-widest border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition flex items-center gap-1.5">
                    <RefreshCw size={11} /> Refresh
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">User</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Auth Method</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Joined Date</th>
                            <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Login</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-5 py-3">
                                    <p className="font-bold text-gray-900">{user.full_name || 'No Name'}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Mail size={10} /> {user.email}</p>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${
                                        user.provider === 'google' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                                    }`}>
                                        {user.provider}
                                    </span>
                                    {user.email_confirmed_at && (
                                        <span className="block text-[10px] text-green-600 mt-1 uppercase tracking-widest font-bold">Verified ✓</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col text-gray-600 text-sm">
                                        <span>{new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span className="text-xs text-gray-400 font-mono">{new Date(user.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-gray-600">
                                    {user.last_sign_in_at ? (
                                        <div className="flex flex-col text-gray-600 text-sm">
                                            <span>{new Date(user.last_sign_in_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-xs italic">Never logged in</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
