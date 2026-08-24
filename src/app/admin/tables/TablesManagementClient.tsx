'use client';

import { useState } from 'react';
import { QrCode, Download, RefreshCw, ExternalLink, Power, PowerOff } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  slug: string;
  qrCode: string | null;
  active: boolean;
  branch: {
    slug: string;
    restaurant: {
      slug: string;
    };
  };
}

interface TablesManagementClientProps {
  initialTables: Table[];
  branchId: string;
}

export function TablesManagementClient({ initialTables, branchId }: TablesManagementClientProps) {
  const [tables, setTables] = useState(initialTables);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [generatingQR, setGeneratingQR] = useState<string | null>(null);

  const refreshTables = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/admin/tables?branchId=${branchId}`);
      if (res.ok) {
        const data = await res.json();
        setTables(data.tables || []);
      }
    } catch (error) {
      console.error('Failed to refresh tables:', error);
      alert('Failed to refresh tables');
    } finally {
      setIsRefreshing(false);
    }
  };

  const generateQRCode = async (tableId: string) => {
    setGeneratingQR(tableId);
    try {
      const res = await fetch(`/api/admin/tables/${tableId}/qr`, {
        method: 'POST',
      });

      if (res.ok) {
        await refreshTables();
        alert('QR code generated successfully!');
      } else {
        alert('Failed to generate QR code');
      }
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      alert('Failed to generate QR code');
    } finally {
      setGeneratingQR(null);
    }
  };

  const downloadQRCode = (table: Table) => {
    if (!table.qrCode) {
      alert('QR code not generated yet');
      return;
    }

    const link = document.createElement('a');
    link.href = table.qrCode;
    link.download = `${table.name.replace(/\s+/g, '-')}-QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getMenuUrl = (table: Table) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    return `${baseUrl}/menu/${table.branch.restaurant.slug}/${table.branch.slug}/${table.slug}`;
  };

  const openMenuPreview = (table: Table) => {
    window.open(getMenuUrl(table), '_blank');
  };

  const activeTables = tables.filter(t => t.active).length;

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tables & QR Codes</h1>
          <p className="text-gray-600 mt-1">
            {tables.length} tables ({activeTables} active)
          </p>
        </div>
        <button
          onClick={refreshTables}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>QR Codes:</strong> Generate unique QR codes for each table. Customers can scan these to access the menu directly.
        </p>
      </div>

      {/* Tables Grid */}
      {tables.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No tables found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Table Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{table.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Slug: {table.slug}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    table.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {table.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* QR Code Preview */}
              {table.qrCode ? (
                <div className="mb-4 bg-gray-50 rounded-lg p-4 flex justify-center">
                  <img
                    src={table.qrCode}
                    alt={`QR Code for ${table.name}`}
                    className="w-48 h-48"
                  />
                </div>
              ) : (
                <div className="mb-4 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-48">
                  <div className="text-center">
                    <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No QR code generated</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                {table.qrCode ? (
                  <>
                    <button
                      onClick={() => downloadQRCode(table)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download QR Code
                    </button>
                    <button
                      onClick={() => generateQRCode(table.id)}
                      disabled={generatingQR === table.id}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${generatingQR === table.id ? 'animate-spin' : ''}`} />
                      Regenerate QR
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => generateQRCode(table.id)}
                    disabled={generatingQR === table.id}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    <QrCode className={`w-4 h-4 ${generatingQR === table.id ? 'animate-spin' : ''}`} />
                    {generatingQR === table.id ? 'Generating...' : 'Generate QR Code'}
                  </button>
                )}

                <button
                  onClick={() => openMenuPreview(table)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview Menu
                </button>
              </div>

              {/* Menu URL */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Menu URL:</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block overflow-x-auto">
                  {getMenuUrl(table)}
                </code>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
