'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
      {
        "title": "Seguros para Empresas",
        "label": "Obtener Información",
        "action": "https://www.sofiasalud.com/sofiabusiness"
      },
      {
        "title": "Seguros para Individuos",
        "label": "Obtener Información",
        "action": "https://www.sofiasalud.com/individual"
      },
      {
        "title": "Comparar Sofia con Otros Seguros",
        "label": "Descubre la Diferencia",
        "action": "https://www.sofiasalud.com/sofia-vs-otros-seguros"
      },
      {
        "title": "Beneficios para tu Equipo",
        "label": "Obtener Información",
        "action": "https://www.sofiasalud.com/#w-tabs-0-data-w-pane-1"
      }
    ];

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={`flex-grow min-w-[50%] ${(index > 1 ? 'hidden sm:block' : 'block')}`}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 flex-col w-full h-auto justify-start items-start overflow-hidden"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
