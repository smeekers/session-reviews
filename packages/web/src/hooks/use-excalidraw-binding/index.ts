import { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { UndoManager } from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { ExcalidrawBinding } from 'y-excalidraw';
import { UNDO_MANAGER_CAPTURE_TIMEOUT_MS } from '../../constants/timing';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Excalidraw types are not fully exported, but these work at runtime
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';

const userColors = [
  { color: '#30bced', light: '#30bced33' },
  { color: '#6eeb83', light: '#6eeb8333' },
  { color: '#ffbc42', light: '#ffbc4233' },
  { color: '#ecd444', light: '#ecd44433' },
  { color: '#ee6352', light: '#ee635233' },
  { color: '#9ac2c9', light: '#9ac2c933' },
  { color: '#8acb88', light: '#8acb8833' },
  { color: '#1be7ff', light: '#1be7ff33' },
];

interface UseExcalidrawBindingOptions {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
  yDoc: Y.Doc;
  provider: LiveblocksYjsProvider | null;
  excalidrawDom: HTMLDivElement | null;
  isLoading: boolean;
}

function useExcalidrawBinding({
  excalidrawAPI,
  yDoc,
  provider,
  excalidrawDom,
  isLoading,
}: UseExcalidrawBindingOptions): void {
  const bindingRef = useRef<ExcalidrawBinding | null>(null);

  useEffect(() => {
    if (!excalidrawAPI || !yDoc || !provider || isLoading || !excalidrawDom) {
      return;
    }

    const yElements = yDoc.getArray<Y.Map<unknown>>('elements');
    const yAssets = yDoc.getMap('assets');
    const awareness = provider.awareness;

    if (!awareness) {
      return;
    }

    const userColor = userColors[Math.floor(Math.random() * userColors.length)];

    awareness.setLocalStateField('user', {
      name: 'User',
      color: userColor.color,
      colorLight: userColor.light,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (awareness as any).clientID = (awareness as any).doc.clientID;

    const undoManager = new UndoManager(yElements, {
      trackedOrigins: new Set([]),
      captureTimeout: UNDO_MANAGER_CAPTURE_TIMEOUT_MS,
      doc: yDoc,
      ignoreRemoteMapChanges: false,
    });

    const binding = new ExcalidrawBinding(
      yElements,
      yAssets,
      excalidrawAPI,
      awareness,
      {
        excalidrawDom,
        undoManager,
      }
    );

    bindingRef.current = binding;

    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
      undoManager.destroy();
    };
  }, [isLoading, excalidrawAPI, yDoc, provider, excalidrawDom]);
}

export default useExcalidrawBinding;

