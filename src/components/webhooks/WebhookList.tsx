import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CreateWebhookDialog } from './CreateWebhookDialog';
import { DeleteWebhookDialog } from './DeleteWebhookDialog';
import { WebhookTable } from './WebhookTable';
import type { WebhookInfo } from '../../types/webhook';

interface WebhookListProps {
  webhooks: WebhookInfo[];
  provider: 'stripe' | 'paypal';
  onCreateWebhook: (events: string[]) => Promise<void>;
  onDeleteWebhook: (webhookId: string) => Promise<void>;
}

export function WebhookList({
  webhooks,
  provider,
  onCreateWebhook,
  onDeleteWebhook
}: WebhookListProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteWebhookId, setDeleteWebhookId] = useState<string | null>(null);

  const handleDeleteConfirm = async () => {
    if (deleteWebhookId) {
      await onDeleteWebhook(deleteWebhookId);
      setDeleteWebhookId(null); // Clear the ID after deletion
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Webhooks</h4>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Create Webhook
        </button>
      </div>

      <WebhookTable 
        webhooks={webhooks}
        onDeleteWebhook={(id) => setDeleteWebhookId(id)}
      />

      <CreateWebhookDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onConfirm={onCreateWebhook}
        provider={provider}
      />

      <DeleteWebhookDialog
        isOpen={!!deleteWebhookId}
        onClose={() => setDeleteWebhookId(null)}
        onConfirm={handleDeleteConfirm}
        webhookId={deleteWebhookId || ''}
      />
    </div>
  );
}