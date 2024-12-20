import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import type { WebhookInfo } from '../../types/webhook';

interface WebhookTableProps {
  webhooks: WebhookInfo[];
  onDeleteWebhook: (id: string) => void;
}

export function WebhookTable({ webhooks, onDeleteWebhook }: WebhookTableProps) {
  const getWebhookEvents = (webhook: WebhookInfo): string[] => {
    if ('enabled_events' in webhook) {
      return webhook.enabled_events;
    }
    if ('event_types' in webhook) {
      return webhook.event_types.map(et => et.name);
    }
    return [];
  };

  const getCreationDate = (webhook: WebhookInfo): string => {
    if ('created' in webhook) {
      return format(new Date(webhook.created * 1000), 'MMM d, yyyy HH:mm');
    }
    return format(new Date(), 'MMM d, yyyy HH:mm');
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <div style={{ maxHeight: '400px' }} className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Webhook ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Events
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {webhooks.length > 0 ? (
              webhooks.map((webhook) => (
                <tr key={webhook.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {webhook.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {webhook.url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCreationDate(webhook)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-md">
                      {getWebhookEvents(webhook).map((event, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onDeleteWebhook(webhook.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete webhook"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No webhooks configured yet. Click the button above to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}