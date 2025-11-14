import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Activity, Edit2, Check } from 'lucide-react';
import { Account } from '../App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface IoTDevice {
    id: string;
    localIp: string;
    endpoint: string;
    pingInterval: number;
    data: any;
    lastUpdated: number;
    status: 'active' | 'error' | 'pending';
    error?: string;
}

interface IoTDataPageProps {
    account: Account;
    onBack: () => void;
}

export function IoTDataPage({ account, onBack }: IoTDataPageProps) {
    const [devices, setDevices] = useState<IoTDevice[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingDevices, setEditingDevices] = useState<Set<string>>(new Set());
    const [savedDeviceId, setSavedDeviceId] = useState<string | null>(null);

    useEffect(() => {
        loadDevices();
    }, []);

    useEffect(() => {
        // Update only device data every 2 seconds (not configuration)
        const interval = setInterval(updateDeviceData, 2000);
        return () => clearInterval(interval);
    }, [account.id]);

    const loadDevices = async () => {
        try {
            const response = await fetch(`${API_URL}/api/iot-devices?accountId=${account.id}`);
            if (response.ok) {
                const data = await response.json();
                setDevices(data);
            }
        } catch (error) {
            console.error('Failed to load devices:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateDeviceData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/iot-devices?accountId=${account.id}`);
            if (response.ok) {
                const serverDevices = await response.json();
                // Only update data, status, lastUpdated, and error fields
                setDevices(prevDevices =>
                    prevDevices.map(device => {
                        // Keep temp devices as-is
                        if (device.id.startsWith('temp-')) {
                            return device;
                        }
                        // Find matching server device
                        const serverDevice = serverDevices.find(d => d.id === device.id);
                        if (serverDevice) {
                            // Only update data-related fields, preserve configuration
                            return {
                                ...device,
                                data: serverDevice.data,
                                status: serverDevice.status,
                                lastUpdated: serverDevice.lastUpdated,
                                error: serverDevice.error
                            };
                        }
                        return device;
                    })
                );
            }
        } catch (error) {
            console.error('Failed to update device data:', error);
        }
    };

    const addDevice = () => {
        const newDeviceId = `temp-${Date.now()}`;
        const newDevice: IoTDevice = {
            id: newDeviceId,
            localIp: '',
            endpoint: '',
            pingInterval: 5,
            data: null,
            lastUpdated: 0,
            status: 'pending'
        };
        setDevices([...devices, newDevice]);
        // New devices start in edit mode
        setEditingDevices(prev => new Set(prev).add(newDeviceId));
    };

    const updateDevice = (id: string, field: keyof IoTDevice, value: any) => {
        setDevices(devices.map(device =>
            device.id === id ? { ...device, [field]: value } : device
        ));
    };

    const saveDevice = async (device: IoTDevice) => {
        // Validate fields
        if (!device.localIp || !device.localIp.trim()) {
            alert('Please enter a device local IP address');
            return;
        }
        if (!device.endpoint || !device.endpoint.trim()) {
            alert('Please enter an endpoint path');
            return;
        }
        if (!device.pingInterval || device.pingInterval < 1 || isNaN(device.pingInterval)) {
            alert('Please enter a valid ping interval (minimum 1 second)');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/iot-devices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: device.id.startsWith('temp-') ? undefined : device.id,
                    accountId: account.id,
                    localIp: device.localIp.trim(),
                    endpoint: device.endpoint.trim(),
                    pingInterval: device.pingInterval,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const newDevice = responseData.device;

                // Replace temp device with saved device, or update existing
                setDevices(prev => {
                    if (device.id.startsWith('temp-')) {
                        // Replace temp with newly saved device
                        return prev.map(d => d.id === device.id ? newDevice : d);
                    } else {
                        // Update existing device
                        return prev.map(d => d.id === device.id ? { ...d, ...newDevice } : d);
                    }
                });

                // Exit edit mode
                setEditingDevices(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(device.id);
                    return newSet;
                });

                // Show success message
                setSavedDeviceId(newDevice.id);
                setTimeout(() => setSavedDeviceId(null), 3000);
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert(`Failed to save device: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Failed to save device:', error);
            alert(`Failed to save device: ${error instanceof Error ? error.message : 'Network error'}`);
        }
    };

    const deleteDevice = async (id: string) => {
        if (!confirm('Are you sure you want to delete this device?')) return;

        if (id.startsWith('temp-')) {
            setDevices(devices.filter(d => d.id !== id));
            setEditingDevices(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/iot-devices/${id}?accountId=${account.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setDevices(devices.filter(d => d.id !== id));
                setEditingDevices(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
            } else {
                alert('Failed to delete device');
            }
        } catch (error) {
            console.error('Failed to delete device:', error);
            alert('Failed to delete device');
        }
    };

    const enableEdit = (id: string) => {
        setEditingDevices(prev => new Set(prev).add(id));
    };

    const cancelEdit = (id: string) => {
        if (id.startsWith('temp-')) {
            // Remove unsaved new device
            setDevices(devices.filter(d => d.id !== id));
        }
        setEditingDevices(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
        // Reload to reset changes
        loadDevices();
    };

    const isEditing = (id: string) => editingDevices.has(id);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-100';
            case 'error': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const formatTimestamp = (timestamp: number) => {
        if (!timestamp) return 'Never';
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto p-6">
                {/* Success Message */}
                {savedDeviceId && (
                    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slide-in">
                        <Check className="w-5 h-5" />
                        <div>
                            <p className="font-semibold">Device Saved Successfully!</p>
                            <p className="text-sm text-green-100">Monitoring has started</p>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6 text-gray-600" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                    <Activity className="w-8 h-8 text-blue-600" />
                                    IoT Device Monitor
                                </h1>
                                <p className="text-gray-600 mt-1">Monitor and track your IoT devices</p>
                            </div>
                        </div>
                        <button
                            onClick={addDevice}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add Device
                        </button>
                    </div>
                </div>

                {/* Devices List */}
                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading devices...</p>
                    </div>
                ) : devices.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No devices yet</h3>
                        <p className="text-gray-600 mb-6">Add your first IoT device to start monitoring</p>
                        <button
                            onClick={addDevice}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add Device
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {devices.map((device) => {
                            const editing = isEditing(device.id);
                            return (
                                <div key={device.id} className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* Left Column - Configuration */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-gray-900">Device Configuration</h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(device.status)}`}>
                                                    {device.status}
                                                </span>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Device Local IP <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={device.localIp}
                                                    onChange={(e) => updateDevice(device.id, 'localIp', e.target.value)}
                                                    placeholder="e.g., 192.168.1.100"
                                                    required
                                                    disabled={!editing}
                                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${!editing ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Endpoint <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={device.endpoint}
                                                    onChange={(e) => updateDevice(device.id, 'endpoint', e.target.value)}
                                                    placeholder="e.g., /api/data or /sensor/status"
                                                    required
                                                    disabled={!editing}
                                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${!editing ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Ping Interval (seconds) <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={device.pingInterval}
                                                    onChange={(e) => updateDevice(device.id, 'pingInterval', parseInt(e.target.value) || 0)}
                                                    required
                                                    disabled={!editing}
                                                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${!editing ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                                                />
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                {editing ? (
                                                    <>
                                                        <button
                                                            onClick={() => saveDevice(device)}
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => deleteDevice(device.id)}
                                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        {!device.id.startsWith('temp-') && (
                                                            <button
                                                                onClick={() => cancelEdit(device.id)}
                                                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => enableEdit(device.id)}
                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Column - Data Display */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Device Data</h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    Last Updated: {formatTimestamp(device.lastUpdated)}
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-auto">
                                                {device.status === 'error' ? (
                                                    <div className="text-red-600">
                                                        <p className="font-semibold mb-1">Error:</p>
                                                        <p className="text-sm">{device.error || 'Failed to fetch data'}</p>
                                                    </div>
                                                ) : device.data ? (
                                                    <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                                                        {JSON.stringify(device.data, null, 2)}
                                                    </pre>
                                                ) : (
                                                    <p className="text-gray-500 italic">No data yet. Save the device to start monitoring.</p>
                                                )}
                                            </div>

                                            {device.localIp && device.endpoint && (
                                                <p className="text-xs text-gray-500">
                                                    Polling: http://{device.localIp}{device.endpoint}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
